<template>
  <div id="app">
    <div class="roof"> 
      <div class="container">
        <div class="notice_text">
          <div v-for="item in currencyData" :key="item.index">
            <span class="b_white">{{item.currency+" :"}}</span>
            <span class=""><i class="fa" :class="item.positive?'fa-long-arrow-up':'fa-long-arrow-down'" aria-hidden="true"></i>{{item.value}}</span>
          </div>
        </div>
      </div> 
    </div>
    <div class="banner">
        <ul class="home_nav">
          <li class="active"><a href="#">首页</a></li>
          <li><a href="#">交易中心</a></li>
          <li><a href="#">用户中心</a></li>
          <li><a href="views/login/login.html">登录</a></li>
        </ul>
      <div class="home_title">
        XXXBTC 上线
      </div>
      <div class="home_info">
        6月15日10：00开放充提 | 6月15日10：00开放充提
      </div>
      <ol class="carousel-indicators" id="banner_indicators"><li data-target="#carousel-example-generic" data-slide-to="0" class=""></li><li data-target="#carousel-example-generic" data-slide-to="1" class=""></li><li data-target="#carousel-example-generic" data-slide-to="2" class=""></li><li data-target="#carousel-example-generic" data-slide-to="3" class=""></li><li data-target="#carousel-example-generic" data-slide-to="4" class="active"></li><li data-target="#carousel-example-generic" data-slide-to="5" class=""></li></ol>
    </div>
    <div class="trade_info container">
      <div>
        <span>
          <img src="./../../assets/img/money.png" alt="">
        </span>
          <span class="b_ccc">
            累计收益额:
          </span>
          <span class="b_blue">
              88888.88
          </span>
      </div>
      <div>
        <span>
          <img src="./../../assets/img/money.png" alt="">
        </span>
          <span class="b_333">
            累计收益额:
          </span>
          <span class="b_blue">
              88888.88
          </span>
        </div>
      </div>

    <div class="advantage container">
      <div class="feature" v-for="item in resource.advantage" :key="item.index">
        <div>
          <img :src="item.img" alt="">
        </div>
        <span>{{item.title}}</span>
        <p>
          {{item.content}}
        </p>
      </div>
    </div>

    <div class="notice">
      
    </div>

    <div class="data_section">
        <div class="line"></div>
        <div class="container">
          <div class="title">
            <p class="w_en">THE DATA SECTION</p>
            <p class="w_zh">数据专区</p>
            <div class="short_line"></div>
          </div>  
        </div>
        
    </div>
    <div class="data_info">
      <div id="globalMarket">
        <div id="marketData" v-cloak class="market-data market_tab_bd">
            <div class="container">
                <div class="tabs">
                    <div class="tab" :class="{active: moneyType == 'optional'}" @click="changeMoneyType('optional')">自选市场</div>
                    <div class="tab" :class="{active: moneyType == 'qc'}" @click="changeMoneyType('qc')">QC</div>
                    <div class="tab" :class="{active: moneyType == 'usdt'}" @click="changeMoneyType('usdt')">USDT</div>
                    <div class="tab" :class="{active: moneyType == 'btc'}" @click="changeMoneyType('btc')">BTC</div>
                </div>
                <div class="data-table">
                    <div class="table-grid">
                        <div class="thead">
                            <div class="tr">

                                <div class="td textLeft" style="width:20%;">
                                    <div class="cell"><span class="sindex"></span>{{resource.currencyNav[0]
    }}</div>
                                </div>
                                <div class="td num real-time-price sort" @click="orderData('lastPrice')">
                                    <div class="cell">
                                        {{resource.currencyNav[1]}}
                                        <span :class="['risefall', orderField == 'lastPrice' ? arrowClass : '']"><i class="fa fa-caret-up"></i><i class="fa fa-caret-down"></i></span>
                                    </div>
                                </div>

                                <div class="td num">
                                    <div class="cell">{{resource.currencyNav[2]}}</div>
                                </div>
                                <div class="td num">
                                    <div class="cell">{{resource.currencyNav[3]}}</div>
                                </div>
                                <div class="td num sort" @click="orderData('vol')">
                                    <div class="cell">
                                        {{resource.currencyNav[4]}}
                                        <span :class="['risefall', orderField == 'vol' ? arrowClass : '']"><i class="fa fa-caret-up"></i><i class="fa fa-caret-down"></i></span>
                                    </div>
                                </div>
                                <div class="td quote-change sort" @click="orderData('change')" style="width: 12%;">
                                    <div class="cell">
                                        {{resource.currencyNav[5]}}
                                        <span :class="['risefall', orderField == 'change' ? arrowClass : '']"><i class="fa fa-caret-up"></i><i class="fa fa-caret-down"></i></span>
                                    </div>
                                </div>
                                <div class="td links" style="width: 15%;">
                                    <div class="cell">
                                        <div class="market-filter">
                                            <input v-model="coinFilter" placeholder="搜索交易币种" />
                                            <i class="fa fa-search"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="topall.length" class="tbody">
                            <div class="tr" v-for="(item, index) in partitionTopall" :key="index">

                                <div class="td market-name textLeft">
                                    <div class="cell">
                                        <span v-if="isLogined" class="sel-optional" :class="{on: isOptional(item.market)}" @click="editUserMarket(item.market)">
                                            <i class="img-icon" :class="[isOptional(item.market) ? ' icon-choice-on' : ' icon-choice']"></i>
                                        </span>
                                        <i class="coin-icon" :class="'icon-'+item.market.split('/')[0].toLowerCase()"></i>
                                        <span class="coin">{{item.market.split('/')[0]}}</span><span class="money"> / {{item.market.split('/')[1]}}</span>
                                    </div>
                                </div>
                                <div class="td num real-time-price">
                                    <div class="cell" :class="[item.riseRate < 0 ? 'text-second' : 'text-primary']">
                                        {{item.lastPrice | number}}
                                        <br>
                                        <span class="computed">
                                            $3.30
                                        </span>
                                    </div>
                                </div>
                                <div class="td num">
                                    <div class="cell">
                                        {{item.hightPrice | number}}
                                        <br>
                                        <span class="computed">
                                            $3.30
                                        </span>
                                    </div>
                                </div>
                                <div class="td num">
                                    <div class="cell">
                                        {{item.lowPrice | number}}
                                        <br>
                                        <span class="computed">
                                            ￥3.30
                                        </span>
                                    </div>
                                </div>
                                <div class="td num">
                                    <div class="cell">
                                        {{item.vol}} {{item.market.split('/')[0]}}
                                        <!-- <br />
                                        <span class="computed">
                                            ≈ {{item.vol * item.lastPrice | fixNumber(item.market.split('/')[1] == 'BTC' ? 4 : 2)}} {{item.market.split('/')[1]}}
                                        </span> -->
                                    </div>
                                </div>
                                                                <div class="td quote-change">
                                    <div class="cell" >
                                        <div class="btn btn-sm" :class="[item.riseRate < 0 ? 'btn-second' : 'btn-primary']">
                                            {{item.riseRate | number}}%
                                            <i class="iconfont" :class="[item.riseRate < 0 ? 'icon-arrowdown' : 'icon-arrowup']"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="td links">
                                    <div class="cell">
                                        <a href="./views/trade/trade.html">
                                            去交易
                                            <i class="fa fa-arrow-circle-o-right" ></i>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div v-else class="caption">
                            数据加载中...
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    </div>
    
    <div class="client_section">
        <div class="line"></div>
        <div class="container">
          <div class="title">
            <p class="w_en">THE CLIENT</p>
            <p class="w_zh">客户端</p>
            <div class="short_line"></div>
          </div>
          <div class="phone_img">
              <img src="../../assets/img/phone1.png" alt="">
              <img src="../../assets/img/phone2.png" alt="">
          </div> 
          <div class="phone_word">
              <h1>XXXX看行情专用</h1>
              <div class="short_line"></div>
              <p class="intro">币行情：支持90+全球主流交易所实时价格跟踪</p>
              <p class="intro">币资产：帮你记账，随时了解总资产变化</p>
              <p class="intro">币资料：帮你记账，众筹成本、流通量、总量，项目介绍等</p>
              <p class="intro">币资讯：交易所公告、币聊，各种教程</p>
              <div class="button_down">
                <button  class="apple_btn common_btn"><i class="fa fa-apple" aria-hidden="true"></i><span>App Store</span></button>
                <button type="button" class="android_btn common_btn"><i class="fa fa-android" aria-hidden="true"></i><span>Android</span></button>
                
              </div>
          </div>  
        </div>
    </div>

    <div class="dynamics_section">
        <div class="line"></div>
        <div class="container">
          <div class="title">
            <p class="w_en">INDUSTRY DYNAMICS</p>
            <p class="w_zh">行业动态</p>
            <div ><span class="short_line"></span><span class="more_detail">更多详情>></span></div>
          </div>  
        </div>
        <div class="container dynamics_content">
              <div class="row">
                <div class="col-xs-6">
                    <div>
                      <div class="date">
                        <p class="year">2018</p>
                        <div class="time">
                          <p class="day">12</p>
                          <p class="month">一月</p>
                        </div>
                      </div>
                      <div class="page">
                        <p class="title">关于提币手续费调整</p>
                        <p class="content">经广大用户建议，平台提币手续由以前按比例的方式调整为固定手续费。提币按每笔只收固定的提币费用,详情请点击查看...<span>更多>></span></p>

                      </div>
                    </div>
                    <div>
                      <div class="date">
                        <p class="year">2018</p>
                        <div class="time">
                          <p class="day">12</p>
                          <p class="month">一月</p>
                        </div>
                      </div>
                      <div class="page">
                        <p class="title">关于提币手续费调整</p>
                        <p class="content">经广大用户建议，平台提币手续由以前按比例的方式调整为固定手续费。提币按每笔只收固定的提币费用,详情请点击查看...<span>更多>></span></p>

                      </div>
                    </div>
                </div>
                <div class="col-xs-6">
                  <div>
                      <div class="date">
                        <p class="year">2018</p>
                        <div class="time">
                          <p class="day">12</p>
                          <p class="month">一月</p>
                        </div>
                      </div>
                      <div class="page">
                        <p class="title">关于提币手续费调整</p>
                        <p class="content">经广大用户建议，平台提币手续由以前按比例的方式调整为固定手续费。提币按每笔只收固定的提币费用,详情请点击查看...<span>更多>></span></p>

                      </div>
                    </div>
                </div>
              </div>
        </div>
    </div>

    <div class="coverage_section">
        <div class="line"></div>
        <div class="container">
          <div class="title">
            <p class="w_en">MEDIA COVERAGE</p>
            <p class="w_zh">媒体报道</p>
            <div class="short_line"></div>  
          </div>  
        </div>
        <div class="container coverage_content">
              <div class="row">
                <div class="col-xs-3">
                  <div class="fist_content">
                    <div>
                      <img src="../../assets/img/coverage.png" alt="">
                    </div>
                    <div>
                      <h5>关于提币手续费调整</h5>
                      <p><span class="show_date">2018.3.10</span></p>
                    </div>
                    <div class="detail">
                      <p>
                        经广大用户建议，平台提币手续由以前按比例...
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-xs-3">
                <div class="date"><span>01/20</span><br><span class="year">2018</span></div>
                <h5>关于提币手续费调整</h5>
                <p class="report">经广大用户建议，平台提币手续由以前按比例的方式调整为固定手续费。提币按每笔只收固定的提币费用,详情请点击查看...</p>
                <span class="more">更多 >></span>
                </div>
                <div class="col-xs-3">
                  <div class="date"><span>01/20</span><br><span>2018</span></div>
                <h5>关于提币手续费调整</h5>
                <p class="report">经广大用户建议，平台提币手续由以前按比例的方式调整为固定手续费。提币按每笔只收固定的提币费用,详情请点击查看...</p>
                </div>
                <div class="col-xs-3">
                  <div class="date"><span>01/20</span><br><span>2018</span></div>
                   <h5>关于提币手续费调整</h5>
                <p class="report">经广大用户建议，平台提币手续由以前按比例的方式调整为固定手续费。提币按每笔只收固定的提币费用,详情请点击查看...</p>
                </div>
              </div>
            </div>
    </div>


    <div class="guide_section">
        <div class="line"></div>
        <div class="container">
          <div class="title">
            <p class="w_en">BEGINNER’S GUIDE</p>
            <p class="w_zh">新手指南</p>
            <div class="short_line"></div>
          </div>  
        </div>
        <div class="container guide_content">
              <div class="row">
                <div class="col-xs-3">
                <h4>如何充值提现</h4>
                <p class="link"><a href="" target="_blank">数字资产充值</a></p>
                <p class="link"><a href="" target="_blank">数字资产充值</a></p>
                <h4>如何充值提现</h4>
                <p class="link"><a href="" target="_blank">数字资产充值</a></p>
                <p class="link"><a href="" target="_blank">数字资产充值</a></p>
                </div>
                <div class="col-xs-3">
                <h4>认证</h4>
                <p class="link"><a href="" target="_blank">交易认证</a></p>
                <p class="link"><a href="" target="_blank">谷歌认证</a></p>
                <h4>认证</h4>
                <p class="link"><a href="" target="_blank">邀请人奖励如何获得？</a></p>
                <p class="link"><a href="" target="_blank"></a></p>
                <p class="link"><a href="" target="_blank"></a></p>
                <button type="button" class="btn guide_btn">新手指南</button>
                </div>
                <div class="col-xs-6">
                    <img class="guide_img" src="../../assets/img/guide.png" alt="">
                </div>
              </div>
            </div>
    </div>
    <footer-bottom></footer-bottom>
    
  </div>
  
</template>

<script>
import footerBottom from '@/components/footerNav'
import mockData from './mock.json'
import mockData2 from './mock2.json'
import resource from './resource.json'
import method from '@/assets/js/common.js'
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
export default {
  name: 'App',
  components:{footerBottom},
  data () {
    return {
      currencyData:{},
      msg:"hello",
      moneyType:"btc",
      topall:mockData2.btc,
      orderField:'',
      sortType:'',
      coinFilter: '',
      isMore: false,
      userMarkets: [],
      resource:resource
    }
  },
  computed: {
            isLogined: function() {
                var loginStatus = "";
                return loginStatus && loginStatus !== '' ? true : false;
            },
            arrowClass: function() {
                return 'r-' + this.sortType;
            },
            //对自选市场过滤
            partitionTopall: function() {
                var topall = JSON.parse(JSON.stringify(this.topall));
                if (this.moneyType == 'optional') {
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
                console.log(topall)
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
    getData() {
        this.currencyData = mockData;
        this.$store.commit("userNameChange","world");

    },
    changeOrderType: function(type) {
        this.orderType = type;
    },
    isOptional: function(marketName) {
        return marketName ? this.userMarkets.includes(marketName.replace('/', '_')) : false;
    },
    changeMoneyType: function(type) {
        if (!this.isLogined && type == 'optional') {
            // return JuaBox.showWrong('请登录后再查看自选的市场');
            console.log('请登录后再查看自选的市场')
        }
        this.moneyType = type;
        this.topall = mockData2[type];

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
  created() {
    this.getData()
  },
  mounted() {
      
  }
}
</script>

<style lang = "less">
@import "index.less";
.table-grid {
    display: table;
    width: 100%;
    border-collapse: separate
}

.table-grid .theader,.table-grid .tr {
    display: table-row
}

.table-grid .tr:hover {
    background: rgba(251,168,28,0.05)
}

.table-grid .thead {
    display: table-row-group; 
    height: 14px;
    line-height: 14px;
    text-align: left;
    background-color: #f1f1f1;
}

.table-grid .tbody {
    display: table-row-group
}

.table-grid.no-items .tbody {
    padding: 3em 1em;
    caption-side: bottom;
    display: table-caption;
    text-align: center
}

.table-grid .th,.table-grid .td {
    display: table-cell;
    vertical-align: middle
}

.table-grid .caption {
    caption-side: bottom;
    display: table-caption;
    text-align: center
}

#home .market-data {
    color: #a7a9b7
}

.market-data .tab {
    background-color: #f9f9f9;
    text-align: center;
    color: #000;
    font-size: 18px;
    float: left;
    height: 52px;
    line-height: 52px;
}

#globalMarket .market-data .tab {
    width: 25%
}

.market-data .tab:last-child {
    margin-left: -3px
}

.market-data .tab.active {
    color: #fff;
    background-color:#1B79F9;
}

.market-data .tab.tab-topten.active {
    color: #fe5c5c;
    background: #FFF
}

.market-data .tab.tab-footten.active {
    color: #3dc18e;
    background: #FFF
}

.market-data .tab i {
    position: absolute;
    left: 20px;
    top: 10px;
    font-size: 18px
}

.market-data .tab.tab-topten.active i {
    color: #fe5c5c
}

.market-data .thead .td {
    padding: 5px 5px;
    height: 42px;
    border-top: 1px solid #dfe5ea;
}
.market-data .tbody .td {
    padding: 5px;
    height: 54px;
    border-top: 1px solid #dfe5ea
}

.market-data .thead .td {
    border-top: 0
}

.market-data i.coin-icon {
    width: 22px;
    height: 22px;
    display: inline-block;
    border-radius: 100%;
    vertical-align: middle;
    margin-top: 0;
    margin-right: 6px
}

.market-data i.coin-icon:before {
    display: none
}

.market-data .thead .tr .td {
    color: #666;
    font-size: 12px
}

.market-data .thead .tr .td .fa {
    color: #ddd;
    line-height: 7px
}

.market-data .risefall {
    display: inline-block;
    width: 15px;
    position: relative;
    height: 15px;
    vertical-align: middle
}

.market-data .risefall i {
    display: block
}

.market-data .thead .tr .td .risefall.r-up .fa.fa-caret-up,.market-data .thead .tr .td .risefall.r-down .fa.fa-caret-down {
    color: #E00
}

.sindex {
    display: inline-block;
    width: 25px;
    color: #a7a9b7;
    font-size: 12px;
    vertical-align: middle
}

.market-data span.money {
    color: #a7a9b7;
    font-size: 12px;
    transform:scale(0.8);
    display: inline-block;
}

.market-data .textLeft {
    text-align: left
}

.market-data .tbody .market-name .coin {
    font-weight: bold;
    color: #000
}

.market-data .tbody .real-time-price {
    color: #000
}

.market-data .num {
    text-align: right
}

.market_tab_bd .tr .td {
    position: relative;
    font-size: 14px;
    text-align: center;
    color: #333
}
.market_tab_bd .tr .links a{
    display: inline-block;
    width: 80%;
    border-radius: 4px;
    height: 34px;
    line-height: 34px;
    color: #1B79F9;
    background-color: #EDF4FF;
}
.market_tab_bd .tr .links a:hover{
    color: #fff;
    background-color: #1B79F9;
    text-decoration: none;
}

.market_tab_bd .go-trade {
    margin-left: 10px;
    position: absolute;
    right: 25px;
    top: 14px;
    display: block;
    width: 6px;
    height: 13px
}

.market_tab_bd .go-trade i {
    display: inline-block;
    width: 6px;
    height: 13px;
    background: url(/statics/img/v3/home/icon-goright-g.png);
    background-size: cover;
    vertical-align: middle;
    margin-top: -2px
}

.market_tab_bd .tr:hover .go-trade i {
    display: inline-block;
    width: 6px;
    height: 13px;
    background: url(/statics/img/v3/home/icon-goright-y.png);
    background-size: cover
}
.market-filter {
    border: 1px solid #DDD;
    padding-right: 16px;
    position: relative;
}
.market-filter input {
    border: 0;
    padding: 3px 6px;
    background: transparent;
}
.market-filter i {
    position: absolute;
    top: 1px;
    right: 5px;
    font-size:18px;
    line-height:20px!important;
    color:#E00!important;            
}
</style>
