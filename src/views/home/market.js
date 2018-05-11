    var marketData = [];
    var compareTopall = function(a,b) {
        //一点点容错处理，没数据默认为0
        var aNum = a.riseRate ? Number(a.riseRate) : 0;
        var bNum = b.riseRate ? Number(b.riseRate) : 0;
        if (aNum < bNum)
            return -1;
        if (aNum > bNum)
            return 1;
        return 0;
    };
    var compareLastPrice = function(a,b) {
        var aNum = a.lastPrice ? Number(a.lastPrice) : 0;
        var bNum = b.lastPrice ? Number(b.lastPrice) : 0;
        return aNum - bNum;
    };
    var compareVol = function(a,b) {
        var aNum = a.vol ? Number(a.vol) : 0;
        var bNum = b.vol ? Number(b.vol) : 0;
        return aNum - bNum;
    };

    function getCookie(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) return unescape(arr[2]);
        return null;
    }

    var vueMarketData = new Vue({
        el: "#marketData",
        data: function() {
            return {
                sortType: 'up',
                orderField: '',
                moneyType: 'optional',
                coinFilter: '',
                isMore: false,
                userMarkets: [],
                topall: []
            }
        },
        computed: {
            isLogined: function() {
                var loginStatus = getCookie(ZNAME + 'uname');
                return loginStatus && loginStatus !== '' ? true : false;
            },
            arrowClass: function() {
                return 'r-' + this.sortType;
            },
            //对自选市场过滤
            partitionTopall: function() {
                var topall = JSON.parse(JSON.stringify(this.topall));
                if (this.moneyType == 'optional' && ajaxRun) {
                    topall = this.topall.filter(function(item){
                        var marketName = item.market.replace('/', '_');
                        return this.userMarkets.includes(marketName);
                    }.bind(this))
                }
                // 涨跌幅排序
                if (this.orderField == 'change') {
                    topall = this.sortType === 'up' ? topall.sort(compareTopall) : topall.sort(compareTopall).reverse();
                }
                if (this.orderField == 'lastPrice') {
                    topall = this.sortType === 'up' ? topall.sort(compareLastPrice) : topall.sort(compareLastPrice).reverse();
                }
                if (this.orderField == 'vol') {
                    topall = this.sortType === 'up' ? topall.sort(compareVol) : topall.sort(compareVol).reverse();
                }
                // 搜索过滤
                if (this.coinFilter !== '') {
                    topall = topall.filter(function(item){
                        return item.market.split('/')[0].toUpperCase().indexOf(this.coinFilter.toUpperCase()) !== -1;
                    }.bind(this))

                }
                return topall;
            },
            orderTopall: function() {
                var topall = JSON.parse(JSON.stringify(this.topall));
                // 涨、跌过滤排序
                if (this.orderType == 'up') {
                    topall = topall.filter(function(item){
                        return item.riseRate >= 0;
                    });
                    topall = topall.sort(compareTopall).reverse();
                } else if (this.orderType == 'down') {
                    topall = topall.filter(function(item){
                        return item.riseRate < 0;
                    });
                    topall = topall.sort(compareTopall);
                }
                //console.log(topall);
                // 更多时返回全部，否则只返回前十
                return this.isMore ? topall : topall.slice(0, 10);
            }
        },
        filters: {
            number: function(value) {
                return !value || value == '' ? '--' : value;
            },
            fixNumber: function(value, unit) {
                var unit = typeof unit == 'undefined' ? 2 : unit;
                return !value || value == '' ? '--' : method.fixNumber(value, unit);
            },
            // 两位数补全
            supplement: function(value) {
                return ('0' + value).slice(-2);
            }
        },
        methods: {
            changeOrderType: function(type) {
                this.orderType = type;
            },
            isOptional: function(marketName) {
                return marketName ? this.userMarkets.includes(marketName.replace('/', '_')) : false;
            },
            changeMoneyType: function(type) {
                if (!this.isLogined && type == 'optional') {
                    return JuaBox.showWrong('请登录后再查看自选的市场');
                }
                this.moneyType = type;
                this.topall = [];

                var channel = "top_all_" + type;
                if (type == 'optional') {
                    channel = 'push_user_market'
                }
                if (webSocket && channel != window.oldTopallChannel) {
                    if (window.oldTopallChannel) {
                        webSocket.sendMessage("{'event':'removeChannel','channel':'" + window.oldTopallChannel + "'}");
                    }
                    if (type == 'optional') {
                        var userId = $.cookie(UID);
                        webSocket.sendMessage('{"event":"addChannel","channel":"push_user_market","userId":"'+userId+'","isZip":"'+isZipData()+'", "binary":"true"}');
                    } else {
                        webSocket.sendMessage("{'event':'addChannel','channel':'" + channel + "','isZip':'" + isZipData() + "','binary':'true'}");
                    }
                }
                window.oldTopallChannel = channel;
            },
            orderData: function(field) {
                this.orderField = field;
                this.sortType = this.sortType == 'up' ? 'down' : 'up';
            },
            gotoUrl: function(url) {
                window.location.href = url;
            },
            getUserMarkets: function() {
                $.ajax({
                    type: "GET",
                    url: "https://vip.zb.com/user/marketList",
                    // contentType: "application/json",
                    dataType: "jsonp",
                    success: function(res) {
                        if (res.datas.length) {
                            var userMarkets = res.datas.map(function(item){
                                return item.marketName;
                            });
                            this.userMarkets = userMarkets;
                        }
                    }.bind(this)
                })
            },
            editUserMarket: function(name) {
                var status = this.userMarkets.includes(name.replace('/', '_')) ? '2' : '1';
                var data = {
                    marketName: name,
                    status: status
                }
                $.ajax({
                    type: "POST",
                    url: "https://vip.zb.com/user/doEditUserMarket",
                    dataType: "jsonp",
                    data: data,
                    success: function(res) {
                        if(res.isSuc) {
                            JuaBox.showRight('操作成功');
                            this.getUserMarkets();
                        }
                    }.bind(this)
                })
            }
        },
        created: function() {
            if(this.isLogined) {
                this.changeMoneyType('optional');
                this.getUserMarkets();
            } else {
                this.changeMoneyType('qc');
            }
        },
        mounted: function() {

        }

    });
    // 10分钟不操作页面自动刷新一次，防止页面变卡
    var interval = 60 * 10;
    ifvisible.setIdleDuration(interval);
    ifvisible.idle(function(){
        window.location.reload();
    });


    
    

    