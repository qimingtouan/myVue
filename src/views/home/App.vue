<template>
  <div id="app">
      <header>
        <div class="roof">
            <div> <div class="lang"> <img src="./../../assets/img/chinese.png" alt=""></div><div class="reg" @click="isShowLogin = !isShowLogin"> 登录</div><div class="reg"> 注册</div> </div>
            <div class="logo"><a><img src="./../../assets/img/logo_new.png" alt=""></a></div>
            <ul class="home_nav">
                <li class="active"><a href="#">首页</a></li>
                <li><a href="">币种行情</a></li>
                <li><a href="views/goods/goods_trade.html">币币交易</a></li>
                <li><a href="">财务中心</a></li>
            </ul>
            
        </div>
        <div >
            <div class="banner">
            </div>
                <div class="banner_title">BTC EOS  正式上线了！</div>
                <div  class="get_more">了解更多</div>
        </div>
        <transition name="slideLeft">
            <div v-if="isShowLogin"  class="login_popup">
                <div class="close" @click="isShowLogin = !isShowLogin"><img src="./../../assets/img/close.png" alt=""></div>
                <div class="login_wrap">
                    <div class="login_title"><h2>登录</h2></div>
                    <!-- <el-form status-icon  ref="ruleForm2" class="demo-ruleForm">
                        <el-form-item prop="pass">
                            <el-input type="password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="checkPass">
                            <el-input type="password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item prop="age">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" >提交</el-button>
                        </el-form-item>
                    </el-form> -->
                    <transition name="move-up">
                        <p v-show="showWord" class="label_word"  >用户名/手机号/邮箱账号</p>
                    </transition>
                    <div class="login_ipt"><input type="text" :placeholder="showPass?'':'用户名/手机号/邮箱账号'" @focus = "showWord = !showWord"></div>
                    <transition name="move-up">
                        <p v-show="showPass" class="label_word">密码</p>
                    </transition>
                    <div class="login_ipt"><input type="password" :placeholder="showPass?'':'密码'" @focus = "showPass = !showPass"></div>
                    <p class="label_word">本次登录需要异地验证</p>
                    <div class="login_ipt login_code"><input type="text" placeholder="验证码" ><button class="code_btn">点击获取</button></div>
                    <div></div>
                    <div class="login_btn"><a class="btn btn-primary">立即登录</a></div>
                </div>
            </div>
        </transition>
        
      </header>
    <div>  
      <ol class="carousel-indicators" id="banner_indicators"><li data-target="#carousel-example-generic" data-slide-to="0" class=""></li><li data-target="#carousel-example-generic" data-slide-to="1" class=""></li><li data-target="#carousel-example-generic" data-slide-to="2" class=""></li><li data-target="#carousel-example-generic" data-slide-to="3" class=""></li><li data-target="#carousel-example-generic" data-slide-to="4" class="active"></li><li data-target="#carousel-example-generic" data-slide-to="5" class=""></li></ol>
    </div>

    <div class="data_info">

        <div id="marketData" v-cloak class="market-data market_tab_bd">
            <div class="container">
                <div class="tabs">
                    <!-- <div class="tab" :class="{active: moneyType == 'optional'}" @click="changeMoneyType('optional')">自选市场</div> -->
                    <div class="tab" :class="{active: moneyType == 'usdt'}" @click="changeMoneyType('usdt')">USDT</div>
                    <div class="tab" :class="{active: moneyType == 'btc'}" @click="changeMoneyType('btc')">BTC</div>
                    <div class="tab" :class="{active: moneyType == 'eth'}" @click="changeMoneyType('eth')">ETH</div>
                </div>
                <div class="data-table">
                    <div class="market-filter">
                        <input v-model="coinFilter" placeholder="搜索交易币种" />
                        <i class="fa fa-search"></i>
                    </div>
                    <div class="table-grid">
                        <div class="thead">
                            <div class="tr">
                                <div class="td textLeft" style="width:18%;">
                                    <div class="cell"><span class="sindex"></span>{{resource.currencyNav[0]}}</div>
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
                                <div class="td links" style="width: 18%;">
                                    <div class="cell">
                                        <div>操作</div>
                                        <!-- <div class="market-filter">
                                            <input v-model="coinFilter" placeholder="搜索交易币种" />
                                            <i class="fa fa-search"></i>
                                        </div> -->
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
                                        <i class="coin-icon" :class="'icon-'+item.baseCurrency.toLowerCase()"></i>
                                        <span class="coin">{{item.baseCurrency}}</span><span class="money"> / {{item.quoteCurrency}}</span>
                                    </div>
                                </div>
                                <div class="td num real-time-price">
                                    <div class="cell" :class="[item.gains < 0 ? 'text-second' : 'text-primary']">
                                        {{item.price | fixNumber(4)}}
                                        <br>
                                        <span class="computed">
                                            ￥{{item.priceCny
}}
                                        </span>
                                    </div>
                                </div>
                                <div class="td num">
                                    <div class="cell">
                                        {{item.high24h | fixNumber()}}

                                    </div>
                                </div>
                                <div class="td num">
                                    <div class="cell">
                                        {{item.low24h | fixNumber()}}

                                    </div>
                                </div>
                                <div class="td num">
                                    <div class="cell">
                                        {{item.volume24h|fixNumber(2)
}} {{item.baseCurrency}}
                                        <!-- <br />
                                        <span class="computed">
                                            ≈ {{item.vol * item.lastPrice | fixNumber(item.quoteCurrency == 'BTC' ? 4 : 2)}} {{item.quoteCurrency}}
                                        </span> -->
                                    </div>
                                </div>
                                <div class="td quote-change">
                                    <div class="cell" >
                                        <div :class="[item.gains < 0 ? 'text-second' : 'text-primary']">
                                            {{item.percentChange24h
| toPercentage}}%
                                            <i class="iconfont" :class="[item.gains < 0 ? 'icon-arrowdown' : 'icon-arrowup']"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="td links">
                                    <div class="cell">
                                        <a :href="'/views/kline/kline_trade.html#/'+item.baseCurrency+'/'+item.quoteCurrency">
                                            k线交易   
                                        </a>
                                        <a :href="'/views/goods/goods_trade.html#/'+item.baseCurrency+'/'+item.quoteCurrency" class="trade">
                                            币币交易 
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
                <div  style="background:#fff;padding:40px 50px 57px;">
                    <div class="load_more">
                        <a href="/views/goods/goods_trade.html#/btc/usdt">查看更多</a>
                    </div>
                </div>
            </div>


    </div>

    </div>
    <div style="margin-top:44px">
        <footer-bottom></footer-bottom>
    </div>
    
    
  </div>
  
</template>

<script>
import footerBottom from '@/components/footerNav'
import mockData from './mock.json'
import mockData2 from './mock2.json'
import resource from './resource.json'
import method from '@/assets/js/common_method.js'
var compareTopall = function(a,b) {
    //一点点容错处理，没数据默认为0
    var aNum = a.gains ? Number(a.gains) : 0;
    var bNum = b.gains ? Number(b.gains) : 0;
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
      showWord:false,
      showPass:false,
      msg:"hello",
      moneyType:"usdt",
      topall:[],
      orderField:'',
      sortType:'',
      coinFilter: '',
      isMore: false,
      userMarkets: [],
      resource:resource,
      slide_length:0,
      isShowLogin:false,
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
                        return item.baseCurrency.toUpperCase().indexOf(this.coinFilter.toUpperCase()) !== -1;
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
                        return item.gains >= 0;
                    });
                    topall = topall.sort(compareTopall).reverse();
                } else if (this.orderType == 'down') {
                    topall = topall.filter(function(item){
                        return item.gains < 0;
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
                var unit;
                if(value < 0.01 && !unit){
                    unit = 6
                }
                unit = typeof unit == 'undefined' ? 2 : unit;
                return !value || value == '' ? '--' : method.fixNumber(value, unit);
            },
            // 两位数补全
            supplement: function(value) {
                return ('0' + value).slice(-2);
            },
            toPercentage(val){
                return (Number(val)*100).toFixed(2);
            }
        },
  methods: {
    getData() {
        this.$ajax.get("/trade/api/market/"+this.moneyType).then((res)=>{
            if(res.data.code == 0){
                this.topall = res.data.data;
            }
            
        })
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
        this.$ajax.get("/trade/api/market/"+type).then((res)=>{
            if(res.data.code == 0){
                this.topall = res.data.data
            }
            
        })

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
    console.log(this.$refs)

  }
}
</script>

<style lang = "less">
@import "index.less";
@import "trade.less";
</style>
