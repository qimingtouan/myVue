var market = {};
    var $title = window.top.document.title;
    var oMarket;
    var usdtcny = 6.5;

    market.getMarket = function(area, callback) {
        var area = (typeof area == "undefined" || typeof area == "function") ? "" : area;
        try {
            if (true) {
                var $this = this;
                $.getJSON(DOMAIN_TRANS + "/line/topall?area=" + area + "&jsoncallback=?", function(json) {
                    $this.setTopAll(json, callback)
                })
            }
        } catch (e) {}
    }
    ;
    market.getLineData = function(array) {
        var arr = array || [];
        if (arr.length > 0) {
            var min = arr[0];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] < min) {
                    min = arr[i]
                }
            }
            var arr2 = arr.map(function(item) {
                return item - min
            });
            return arr2
        } else {
            return ""
        }
    }
    ;
    market.setTopAll = function(ojson, callback) {
        var btcusdt = 0;
        var $this = this;
        var channel = ojson.channel;
        var json = ojson.datas;
        if ($("#marketData").length) {
            var moneyType = vueMarketData.moneyType;
            var fJson;
            if (channel && moneyType == "optional") {
                fJson = ojson.datas
            } else {
                fJson = ojson.datas.filter(function(item) {
                    return item.market.split("/")[1] == moneyType.toUpperCase()
                })
            }
            vueMarketData.topall = fJson
        }
        if (ojson.usdtcny) {
            usdtcny = ojson.usdtcny ? ojson.usdtcny : 6.5;
            window.usdttocny = usdtcny
        }
        outer: for (var item in json) {
            for (var item2 in json[item]) {
                if (json[item][item2] == "BTC/USDT") {
                    btcusdt = json[item].lastPrice;
                    break outer
                }
            }
        }
        if (typeof btccny == "undefined") {
            window.btccny = parseFloat(btcusdt) * parseFloat(usdtcny)
        }
        method.setLocalStorage("usdttocny", usdtcny);
        method.setLocalStorage("btccny", btccny);
        var totalAsset = 0;
        for (var i = 0, ilength = json.length; i < ilength; i++) {
            var key = json[i].market.replace("/", "").toLowerCase();
            if (key == "btcqc") {
                window.btccny = json[i].lastPrice;
                method.setLocalStorage("btccny", btccny)
            }
            var mName = key + "Market";
            market[mName] = [];
            market[mName][0] = json[i].lastPrice;
            market[mName][1] = json[i].buy1Price;
            market[mName][2] = json[i].sell1Price;
            market[mName][3] = json[i].hightPrice;
            market[mName][4] = json[i].lowPrice;
            market[mName][5] = json[i].vol;
            market[mName][6] = parseFloat(json[i].riseRate) < 0 ? "down" : "up";
            market[mName][7] = parseFloat(json[i].riseRate);
            var topId = ".T_" + key + "LastPrice";
            var homeId = ".H_" + key + "Market";
            var rateClass = parseFloat(json[i].riseRate) < 0 ? "up" : "down";
            var rateNum = parseFloat(json[i].riseRate) > 0 ? "+" + json[i].riseRate + "%" : json[i].riseRate + "%";
            var topIdClass, arrowHtml;
            var arrowClass, arrowHtml2;
            var price = json[i].lastPrice == undefined || json[i].lastPrice == 0 ? "--" : json[i].lastPrice;
            var theMarket = json[i].market.split("/")[1];
            var usdttocny = isNaN(price) ? "--" : method.fixNumber(price * usdtcny, 2);
            var hightPircecny = "￥" + method.fixNumber(json[i].hightPrice * usdtcny, 2);
            var lowPircecny = "￥" + method.fixNumber(json[i].lowPrice * usdtcny, 2);
            var btctocny = isNaN(price) && btccny ? "--" : method.fixNumber(price * btccny, 2);
            var hightPircebtctocny = "￥" + method.fixNumber(json[i].hightPrice * btccny, 2);
            var lowPircebtctocny = "￥" + method.fixNumber(json[i].lowPrice * btccny, 2);
            if (price == "--") {
                usdtprice = price;
                usdttocny = usdttocny;
                btctocny = btctocny
            } else {
                usdtprice = "$" + price;
                usdttocny = "￥" + usdttocny;
                btctocny = "￥" + btctocny
            }
            if (oMarket && oMarket[i]) {
                topIdClass = parseFloat(json[i].riseRate) < 0 ? "text-second" : "text-primary";
                arrowHtml = parseFloat(json[i].riseRate) < 0 ? '<i class="fa fa-arrow-down fa-fw"></i>' : '<i class="fa fa-arrow-up fa-fw"></i>';
                arrowClass = parseFloat(json[i].riseRate) < 0 ? "text-second" : "text-primary";
                arrowHtml2 = parseFloat(json[i].riseRate) < 0 ? '<i class="iconfont icon-arrowdown"></i>' : '<i class="iconfont icon-arrowup"></i>';
                if (parseFloat(oMarket[i].lastPrice) != parseFloat(json[i].lastPrice)) {
                    $(topId).removeClass("text-second text-primary").addClass(topIdClass);
                    $(topId).html(price + arrowHtml);
                    $(homeId).find(".price").removeClass("text-second text-primary").addClass(arrowClass).html(price + arrowHtml2);
                    if (theMarket == "USDT") {
                        $(homeId).find(".cnyprice").html(usdttocny + arrowHtml2);
                        $(homeId).find(".cnyprice-high").html(hightPircecny);
                        $(homeId).find(".cnyprice-low").html(lowPircecny)
                    } else {
                        if (theMarket == "BTC") {
                            $(homeId).find(".cnyprice").html(btctocny + arrowHtml2);
                            $(homeId).find(".cnyprice-high").html(hightPircebtctocny);
                            $(homeId).find(".cnyprice-low").html(lowPircebtctocny)
                        } else {
                            $(homeId).find(".cnyprice").html(price + arrowHtml2);
                            $(homeId).find(".cnyprice-high").html(json[i].hightPrice);
                            $(homeId).find(".cnyprice-low").html(json[i].lowPrice)
                        }
                    }
                    $(homeId).find(".rise").removeClass("up down").addClass(rateClass).html(rateNum)
                }
            } else {
                topIdClass = parseFloat(json[i].riseRate) < 0 ? "text-second" : "text-primary";
                arrowHtml = parseFloat(json[i].riseRate) < 0 ? '<i class="fa fa-arrow-down fa-fw"></i>' : '<i class="fa fa-arrow-up fa-fw"></i>';
                arrowClass = parseFloat(json[i].riseRate) < 0 ? "text-second" : "text-primary";
                arrowHtml2 = parseFloat(json[i].riseRate) < 0 ? '<i class="iconfont icon-arrowdown"></i>' : '<i class="iconfont icon-arrowup"></i>';
                $(topId).removeClass("text-second text-primary").addClass(topIdClass);
                $(topId).html(price + arrowHtml);
                $(homeId).find(".price").removeClass("text-second text-primary").addClass(arrowClass).html((price || "--") + arrowHtml2);
                if (theMarket == "USDT") {
                    $(homeId).find(".cnyprice").html(usdttocny + arrowHtml2)
                } else {
                    if (theMarket == "BTC") {
                        $(homeId).find(".cnyprice").html(btctocny + arrowHtml2)
                    } else {
                        $(homeId).find(".cnyprice").html(price + arrowHtml2);
                        $(homeId).find(".cnyprice-high").html(json[i].hightPrice);
                        $(homeId).find(".cnyprice-low").html(json[i].lowPrice)
                    }
                }
                $(homeId).find(".rise").removeClass("up down").addClass(rateClass).html(rateNum)
            }
            $(homeId).find(".hightPrice").html(json[i].hightPrice);
            $(homeId).find(".lowPrice").html(json[i].lowPrice);
            if (theMarket == "USDT") {
                $(homeId).find(".cnyprice-high").html(hightPircecny);
                $(homeId).find(".cnyprice-low").html(lowPircecny)
            } else {
                if (theMarket == "BTC") {
                    $(homeId).find(".cnyprice-high").html(hightPircebtctocny);
                    $(homeId).find(".cnyprice-low").html(lowPircebtctocny)
                } else {
                    $(homeId).find(".cnyprice-high").html(json[i].hightPrice);
                    $(homeId).find(".cnyprice-low").html(json[i].lowPrice)
                }
            }
            var riseRate = json[i].riseRate;
            if (riseRate == undefined) {
                riseRate = "--"
            } else {
                if (riseRate >= 0) {
                    if (riseRate > 0) {
                        riseRate = "+" + riseRate
                    }
                    $(homeId).removeClass("down").addClass("up")
                } else {
                    $(homeId).removeClass("up").addClass("down")
                }
                riseRate = riseRate + " %"
            }
            $(homeId).find(".riseRate").html(riseRate);
            var dayVolume = parseFloat(json[i].vol);
            var dayVolumeStr = parseFloat(json[i].vol);
            if (isNaN(dayVolume)) {
                dayVolumeStr = "--"
            } else {
                if (dayVolume > 10000) {
                    dayVolumeStr = (dayVolume / 10000).toFixed(2) + "万"
                }
                if (dayVolume > 100000000) {
                    dayVolumeStr = (dayVolume / 100000000).toFixed(4) + "亿"
                }
            }
            $(homeId).find(".volume span").html(dayVolumeStr);
            var pathArry = top.location.pathname.split("/");
            if (pathArry[pathArry.length - 1].indexOf(json[i].market.replace("/", "").toLowerCase()) != -1) {
                top.document.title = json[i].lastPrice + " - " + $title
            }
            try {
                if (USER.isLogin()) {
                    var coins = json[i].market.split("/");
                    var coin = coins[0].toLowerCase();
                    if (market[mName] && "QC" == coins[1] && ASSET[coin]) {
                        var price = market[mName][0];
                        if (coin == "usdt") {
                            price = 6.5
                        }
                        totalAsset += parseFloat(ASSET[coin].total * price)
                    }
                }
            } catch (err) {
                console.log("waiting for asset、user initing...", err)
            }
        }
        try {
            if (USER.isLogin() && ASSET.qc) {
                var btcUsdtPrice;
                if (ASSET.qc.total > 0) {
                    totalAsset += ASSET.qc.total
                }
                var btcUsdtPrice;
                if (ASSET.zbbtc && ASSET.zbbtc.total > 0 && (btcUsdtPrice = market.btcusdtMarket[0]) > 0) {
                    totalAsset += ASSET.zbbtc.total * btcUsdtPrice
                }
                var assistCoin = localStorage.assistCoin;
                if (!assistCoin || assistCoin == undefined || assistCoin == "BTC") {
                    assistCoin = "CNY"
                }
                $("#Munit, #MunitTop").html(assistCoin);
                if (totalAsset != "" && totalAsset > 0) {
                    var precision = 2;
                    if ("USDT" == assistCoin) {
                        totalAsset = totalAsset * usdtcny;
                        totalAsset += ASSET.bitcny ? (ASSET.usdt.total + ASSET.bitcny.total) : ASSET.usdt.total
                    } else {
                        totalAsset += ASSET.bitcny ? (ASSET.qc.total + ASSET.bitcny.total) : ASSET.qc.total
                    }
                    formatNum()
                }
            } else {}
        } catch (err) {
            console.log("waiting for asset initing...", err)
        }
        oMarket = ojson.datas;
        if (typeof callback == "function") {
            callback()
        }
        var jsonStr = JSON.stringify(json);
        if (window.localStorage) {
            localStorage.topAll = jsonStr
        }
    }
    ;