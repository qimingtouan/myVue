<template>
  <div id="app" @click="hideLogin">
      <header>
        <div class="roof">
            <div class="container">
              <div class="flex_section">
                <div><a><img src="./../../assets/img/logo_new.png" alt="" ></a></div>
                <div>
                   <ul class="home_nav clearfix">
                    <li class="active"><a href="/views/home/index.html">首页</a></li>
                    <li><a href="/views/market/market.html">币种行情</a></li>
                    <li><a href="/views/goods/goods_trade.html">币币交易</a></li>
                    <li><a  @click="jumpTo('/views/asset/asset.html')">财务中心</a>
                      <ul v-if="isLogin" class="dropdown-menu animated bk-secd-menu allblock" data-animation="fadeIn" role="menu" style="left:-30px;">
                          <li v-for="item in fundDropdown" :key="item.index"><a @click="jumpTo(item.optionHref)">{{item.optionText}}</a></li>
                      </ul>
                    </li>

                  </ul>
                </div>
                <div class="clearfix">
                    <div v-if="!isLogin" style="float:left">
                      <div class="reg" @click.stop="clickLogin"> <a >登录</a></div>
                      <div class="reg"> <a href="/views/register/register.html">注册</a></div>
                    </div>
                    <div v-if="isLogin" style="float:left">
                      <div class="logined"> 
                        <i class="fa fa-user-o" aria-hidden="true"></i>
                        <span class="login_name">{{userName}}</span>
                        <ul class="dropdown-menu animate bk-secd-menu allblock" data-animation="fadeIn" role="menu">
                            <li v-for="item in userNameDropdown" :key="item.index"><a @click="jumpTo(item.optionHref)">{{item.optionText}}</a></li>
                        </ul>
                      </div>
                      <div class="logined" >
                        <span  title="退出登录" class="logout" @click="logout"><i class="fa fa-sign-out"></i></span>
                      </div>
                      
                    </div>
                    <div class="lang" @mouseover="isShowPic = true" @mouseout="isShowPic = false">
                      <div v-if="local_lang == 'cn'"><img src="../../assets/img/chinese.png" alt="中文">
                        <img v-if="isShowPic" src="../../assets/img/english.png" alt="英文" class="lang_img" @click="changeLang('en')">
                        <i class="fa fa-caret-down" style="margin-left:8px"></i>
                      </div>
                      <div v-else><img src="../../assets/img/english.png" alt="英文">
                        <img src="../../assets/img/chinese.png" alt="中文" class="lang_img" v-if="isShowPic" @click="changeLang('cn')">
                        <i class="fa fa-caret-down" style="margin-left:8px"></i>
                      </div>
                    </div> 
                </div>
              </div>
              
            </div>
            
        </div>
        <div >
            <div class="banner">
                <el-carousel trigger="click" height="359px" indicator-position="outside">
                <el-carousel-item v-for="item in 4" :key="item">
                    <div><img :src="'/static/img/banner'+item+'.png'" alt=""></div>
                </el-carousel-item>
                </el-carousel>
            </div>
            <div class="Mini" style="margin-top: 100px;margin-left: 14%;color:#999;float:left;">
                <!-- <div style="text-align：center"><button class="get_more" @mousemove = "getPosition"><span>  了解更多</span></button></div> -->
                <div class="income">
                    <p>本小时待分配收入累积折合</p>
                    <p style="font-size:40px"><i aria-hidden="true" class="fa fa-usd"></i><span>{{incomeData.hourFee|fixNumber(8)}}</span></p>
                    <p>本小时每百万份**累积收入折合：<i aria-hidden="true" class="fa fa-usd"></i><span>{{incomeData.hourFee100}}</span></p>
                </div>
                <div class="income">
                    <p>今日待分配收入累积折合</p>
                    <p style="font-size:40px"><i aria-hidden="true" class="fa fa-usd"></i><span>{{incomeData.todayFee|fixNumber(8)}}</span></p>
                    <p>今日连续持有**每百万份收入折合：<i aria-hidden="true" class="fa fa-usd"></i><span>{{incomeData.todayFee100}}</span></p>
                </div>
                <div class="income">
                    <p>  昨日待分配收入累积折合：<i aria-hidden="true" class="fa fa-usd"></i><span>{{incomeData.yesterdayFee|fixNumber(8)}}</span></p>
                    <p>   前一日挖矿产出：<i aria-hidden="true" class="fa fa-usd"></i><span>{{incomeData.yesterdayFeeCoin}}</span><button class="view_mine" @mousemove = "getPosition"><a href="/views/mining/mining.html">  [查看挖矿教程]</a></button></p>
                    <p>  昨日待分配收入累积折合：<i aria-hidden="true" class="fa fa-usd"></i><span>{{incomeData.coinAmount}}</span></p>
                    <p>  二级市场流通量： <i aria-hidden="true" class="fa fa-usd"></i><span>{{incomeData.bigAmountExchange|fixNumber(8)}}</span> </p>
                </div>
            </div>
                <!-- <div class="banner_title">BTC EOS  正式上线了！</div>
                <div  class="get_more">了解更多</div> -->
        </div>
        <transition name="slideLeft">
            <div v-if="isShowLogin"  class="login_popup" @click.stop = "">
                <div class="close" @click="hideLogin"><img src="./../../assets/img/close.png" alt=""></div>
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
                    <div class="login_ipt"><input type="text" :placeholder="showWord?'':'用户名/手机号/邮箱账号'" @focus = "showWord = true" v-model="account" ref="accountInput"></div>
                    <transition name="move-up">
                        <p v-show="showPass" class="label_word">密码</p>
                    </transition>
                    <div class="login_ipt"><input type="password" :placeholder="showPass?'':'密码'" @focus = "showPass = true" v-model="pwd"></div>
                    <!-- <p class="label_word">本次登录需要异地验证</p>
                    <div class="login_ipt login_code"><input type="text" placeholder="验证码" ><button class="code_btn" @click="getCode" :class="{code_btn_disable:codeText != codeTextDef}"> {{codeText}}</button></div> -->
                    <div class="remember"><input type="checkbox"  v-model="isChecked"><span>记住用户名</span><a class="forgetPwd">忘记密码</a></div>
                    <div class="login_btn"><a class="login_Abtn" @click="loginSubmit">立即登录</a></div>
                    <div class="reg_tips">还没有账号？ <a href="/views/register/register.html">点我注册</a></div>
                </div>
            </div>
        </transition>
        
      </header>
    

    <div class="data_info">

        <div id="marketData" v-cloak class="market-data market_tab_bd">
            <div class="container">
                <div class="tabs">
                    <!-- <div class="tab" :class="{active: moneyType == 'optional'}" @click="changeMoneyType('optional')">自选市场</div> -->
                    <div class="tab" :class="{active: moneyType == item.toLowerCase()}" @click="changeMoneyType(item,index)" v-for="(item,index) in marketCoins" :key="item.index"><span>{{item}}</span><span class="trade_area">交易区</span><div ></div></div>
                    <div class="border_line" :style="{transform:'translateX('+moveX+'px)'}"></div>
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
                                        <span v-if="isLogin" class="sel-optional" :class="{on: isOptional(item.market)}" @click="editUserMarket(item.market)">
                                            <i class="fa" :class="[isOptional(item.market) ? ' fa-star' : ' fa-star-o']"></i>
                                        </span>
                                        <img :src="item.image" alt="" class="coinImg">
                                        <span class="coin">{{item.baseCurrency}}</span><span class="money"> / {{item.quoteCurrency}}</span>
                                    </div>
                                </div>
                                <div class="td num real-time-price">
                                    <div class="cell" :class="[item.gains < 0 ? 'text-second' : 'text-primary']">
                                      
                                       <span style="fontSize:16px;"> {{item.price | fixNumber(4)}}/</span>
                                        <span class="computed">
                                            ￥{{item.priceCny}}
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
                                        {{item.volume24h|fixNumber(2)}} {{item.baseCurrency}}
                                        <!-- <br />
                                        <span class="computed">
                                            ≈ {{item.vol * item.lastPrice | fixNumber(item.quoteCurrency == 'BTC' ? 4 : 2)}} {{item.quoteCurrency}}
                                        </span> -->
                                    </div>
                                </div>
                                <div class="td quote-change">
                                    <div class="cell" >
                                        <div :class="[item.gains < 0 ? 'text-second' : 'text-primary']">
                                            {{item.percentChange24h| toPercentage}}%
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
                    <div class="load_more" @click="changeOffset">
                        <a >查看更多</a>
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
import footerBottom from "@/components/footerNav";
import resource from "./resource.json";
import method from "@/assets/js/common_method.js";
var compareTopall = function(a, b) {
  //一点点容错处理，没数据默认为0
  var aNum = a.gains ? Number(a.gains) : 0;
  var bNum = b.gains ? Number(b.gains) : 0;
  if (aNum < bNum) return -1;
  if (aNum > bNum) return 1;
  return 0;
};
var compareLastPrice = function(a, b) {
  var aNum = a.lastPrice ? Number(a.lastPrice) : 0;
  var bNum = b.lastPrice ? Number(b.lastPrice) : 0;
  return aNum - bNum;
};
var compareVol = function(a, b) {
  var aNum = a.vol ? Number(a.vol) : 0;
  var bNum = b.vol ? Number(b.vol) : 0;
  return aNum - bNum;
};

export default {
  name: "App",
  components: { footerBottom },
  data() {
    return {
      loginUserName:"",
      showWord: false,
      showPass: false,
      msg: "hello",
      moneyType: "btc",
      topall: [],
      incomeData: {},
      orderField: "",
      sortType: "",
      coinFilter: "",
      isMore: false,
      userMarkets: [],
      resource: resource,
      slide_length: 0,
      isShowLogin: false,
      marketCoins: ['BTC','ETH','USDT'],
      moveX: 60,
      codeTextDef: "点击获取",
      codeTextAct: "已发送",
      codeText: "点击获取",
      timeOut: 60,
      codeStatus: 0,
      isChecked: false,
      account: "",
      pwd: "",
      isShowPic:false,
      offset:0,
      userNameDropdown: [
      {
        optionHref: '/views/user/user.html#/basic',
        optionText: '账户信息'
      },
      {
        optionHref: '/views/user/user.html#/api',
        optionText: 'API设置'
      }],
      fundDropdown: [
      {
        optionHref: '/views/asset/asset.html#/financeAsset',
        optionText: '账户资产'
      },
      {
        optionHref: '/views/asset/asset.html#/payin/',
        optionText: '充币'
      },
      {
        optionHref: '/views/asset/asset.html#/payout/',
        optionText: '提币'
      },
      {
        optionHref: '/views/asset/asset.html#/account/',
        optionText: '地址管理'
      },
      {
        optionHref: '/views/asset/asset.html#/bill',
        optionText: '交易账单'
      }],
    };
  },
  computed: {
    userName(){
      return this.$store.state.userName
    },
    local_lang(){
      return this.$store.state.localLanguage ||"cn"
    },
    isLogin() {
        return this.$store.state.isLogin
    },
    arrowClass: function() {
      return "r-" + this.sortType;
    },
    //对自选市场过滤
    partitionTopall: function() {
      var topall = JSON.parse(JSON.stringify(this.topall));
      if (this.moneyType == "optional") {
        topall = this.topall.filter(
          function(item) {
            var marketName = item.market.replace("/", "_");
            return this.userMarkets.includes(marketName);
          }.bind(this)
        );
      }
      // 涨跌幅排序
      if (this.orderField == "change") {
        topall =
          this.sortType === "up"
            ? topall.sort(compareTopall)
            : topall.sort(compareTopall).reverse();
      }
      if (this.orderField == "lastPrice") {
        topall =
          this.sortType === "up"
            ? topall.sort(compareLastPrice)
            : topall.sort(compareLastPrice).reverse();
      }
      if (this.orderField == "vol") {
        topall =
          this.sortType === "up"
            ? topall.sort(compareVol)
            : topall.sort(compareVol).reverse();
      }
      // 搜索过滤
      if (this.coinFilter !== "") {
        topall = topall.filter(
          function(item) {
            return (
              item.symbol
                .toUpperCase()
                .indexOf(this.coinFilter.toUpperCase()) !== -1
            );
          }.bind(this)
        );
      }
      console.log(topall);
      return topall;
    },
    orderTopall: function() {
      var topall = JSON.parse(JSON.stringify(this.topall));
      // 涨、跌过滤排序
      if (this.orderType == "up") {
        topall = topall.filter(function(item) {
          return item.gains >= 0;
        });
        topall = topall.sort(compareTopall).reverse();
      } else if (this.orderType == "down") {
        topall = topall.filter(function(item) {
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
      return !value || value == "" ? "--" : value;
    },
    fixNumber: function(value, unit) {
      var unit;
      if (value < 0.01 && !unit) {
        unit = 6;
      }
      unit = typeof unit == "undefined" ? 2 : unit;
      return !value || value == "" ? "--" : method.fixNumber(value, unit);
    },
    // 两位数补全
    supplement: function(value) {
      return ("0" + value).slice(-2);
    },
    toPercentage(val) {
      return (Number(val) * 100).toFixed(2);
    }
  },
  methods: {
    clickLogin(){
      this.isShowLogin = true;
      let _this = this;
      setTimeout(()=>{
            _this.loginUserName = _this.$cookie.get("BCKJ_logusername");
            if(_this.loginUserName){
              _this.$refs["accountInput"].focus();
              setTimeout(()=>{
                _this.account = _this.loginUserName;
              },600) 
            }
      },800)
    },
    loginSubmit() {
      if(!this.account || !this.pwd){
        this.$message.info("请输入账户或密码。")
        return
      }
      this.$ajax
        .post("/wap/login/login/" + this.account + "/" + this.pwd, {})
        .then(res => {
          if (res.data.code <= 200) {
            console.log(res.data.msg);
            if(this.isChecked){
                this.$cookie.set("BCKJ_logusername", this.account, {
                    expires: 7,
                    path: "/"
                });
            }
            this.$cookie.set("BCKJ_safePwdStatus",res.data.data.transPwd)
            this.account = "";
            this.pwd = "";
            this.$message.success('登录成功');
            this.$store.commit("checkLogin");
            
            this.hideLogin();
          } else {
            this.$alert(res.data.msg, "ERROR", {
              confirmButtonText: "确定"
            });
          }
        });
    },
    logout(){
        this.$ajax.get("/wap/login/loginOut").then((res)=>{
          if(res.data.code <=200){
            this.$message({
              message: '退出登录成功',
              type: 'success'
            });
            this.$store.commit("checkLogin")
          }
        })
    },
    changeLang(type){
        this.$store.commit("setLanguage",type);
        this.isShowPic = false;
    },
    getPosition(e) {
      const x = e.pageX - e.target.offsetLeft;
      const y = e.pageY - e.target.offsetTop;
      console.log(x, y);
      e.target.style.setProperty("--x", `${x}px`);
      e.target.style.setProperty("--y", `${y}px`);
    },
    hideLogin(evt) {
      this.isShowLogin = false;
      this.showWord = false;
      this.showPass = false;
      this.account = "";
    },
    countDown() {
      setTimeout(() => {
        this.timeOut--;
        if (this.timeOut == 0) {
          this.codeText = this.codeTextDef;
          this.timeOut = 60;
        } else {
          this.codeText = this.codeTextAct + "( " + this.timeOut + "s )";
          this.countDown();
          console.log(this.timeOut);
        }
      }, 1000);
    },
    getCode() {
      // if (this.codeText == this.codeTextDef) {
      //   this.timeOut = 60;
      //   this.codeText = this.codeTextAct + "( " + this.timeOut + "s )";
      //   this.countDown();
      //   this.$ajax
      //     .get("/user/register/getPicVerifyCode/" + this.account)
      //     .then(res => {
      //       console.log(res);
      //     });
      // }
    },
    getData() {
      //请求计价币接口
      this.$ajax.get("/wap/market/coin").then(res => {
        if (res.data.code == 200) {
          this.marketCoins = res.data.data;
        }
      });
      //查询接口
      this.$ajax.get("/web/market/" + this.moneyType+"/0").then(res => {
        if (res.data.code == 200) {
          this.topall = res.data.data;
        }
      });
      //web分红
      this.$ajax.get("/web/exchange/web").then(res => {
        if (res.data.code == 200) {
          this.incomeData = res.data.data;
        }
      });

      // this.$store.commit("userNameChange","world");
    },
    changeOrderType: function(type) {
      this.orderType = type;
    },
    isOptional: function(marketName) {
      return marketName
        ? this.userMarkets.includes(marketName.replace("/", "_"))
        : false;
    },
    changeMoneyType: function(type, index) {
      this.moveX = 60 + index * 230;
      type = type.toLowerCase();
      this.moneyType = type;
      this.$ajax.get("/web/market/" + this.moneyType+"/0").then(res => {
        if (res.data.code == 200) {
          this.topall = res.data.data;
        }
      });
    },
    changeOffset(){
      this.offset += 1;
      this.$ajax.get("/web/market/" + this.moneyType+"/"+this.offset).then(res => {
        if (res.data.code == 200) {
          if(res.data.data.length > 0 ){
            this.topall = this.topall.concat(res.data.data);
          }else{
            this.offset -=1;
            this.$message.info("没有更多数据")
          }
        }
      });
    },
    orderData: function(field) {
      this.orderField = field;
      this.sortType = this.sortType == "up" ? "down" : "up";
    },
    gotoUrl: function(url) {
      window.location.href = url;
    },
    jumpTo(toHref) {
        if(this.isLogin) {
            if (this.$cookie.get("BCKJ_safePwdStatus") && this.$cookie.get("BCKJ_safePwdStatus") == "true") {
                window.location.href = toHref;
            } else {
                window.location.href = "/views/pwd/pwd.html#/setSafePwd";
            }
        } else {
            this.$message.error("请先登录");
        }
    }
  },
  created() {
    this.$store.commit("checkLogin");
    this.getData();
  },
  mounted() {
  }
};
</script>

<style lang = "less">
@import "index.less";
@import "trade.less";
</style>
