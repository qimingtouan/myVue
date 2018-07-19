<template>
<div class="header_wrap">
    <div class="row">
        <div class="col-xs-3 logo">
            <a href="/views/home/index.html"><img src="./../assets/img/logo_new.png" alt="xx交易"></a>
        </div>

        <div class="col-xs-3 title" >
            <span>当前币种</span> 
            <div class="change_coin">
                <div class="header_btn">
                <a class="">{{currentCoin}}<i class="fa fa-caret-down"></i></a>
                <div class="coins_list"  >
                    <div class="coin_title">
                        <!-- <div class="tab" :class="{active: moneyType == item.toLowerCase()}" @click="changeMoneyType(item,index)" v-for="(item,index) in marketCoins" :key="item.index"><span>{{item}}</span><div ></div></div> -->
                        <div class="coin_tab" :class="{coin_tab_active:item.toLowerCase() == currentCoin.split('/')[1].toLowerCase()}"  @mouseenter = changeMoneyType(item,index) v-for="(item,index) in marketCoins" :key="item.index">
                            {{item}}
                        </div>
                        
                        <div class="coin_input">
                            <input placeholder="搜索交易币种" v-model="coinFilter"> <i class="fa fa-search"></i>
                        </div>
                    </div>
                    <div class="coins">
                       <a @click="changeCoin(item.token)" v-for="item in partitionTopall" :key="item.index"><img :src="item.logo" :alt="item.token" class="coin_active" >{{item.token.split("/")[0]}}/<span>{{item.token.split("/")[1]}}</span></a>
                    </div>
                </div>
            </div>
            </div>
            
              
        </div>
        <!-- <div class="col-xs-3 area">
            <el-form :inline="true" :model="searchInfo" size="mini">
                <el-form-item label="交易对">
                    <el-input v-model="searchInfo.base" class="coin_input" ></el-input>
                </el-form-item>
                <el-form-item label="/">
                <el-select v-model="searchInfo.qoute" class="entrust_input">
                        <el-option label="BTC" value="btc"></el-option>
                        <el-option label="USDT" value="usdt"></el-option>
                        <el-option label="ETH" value="eth"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div> -->
        <div class="col-xs-2" >
            
        </div>
        <div class="col-xs-4">
            <div class="clearfix">
                 <div class="lang" @mouseover="isShowPic = true" @mouseout="isShowPic = false">
                  <div v-if="local_lang == 'cn'"><img src="./../assets/img/chinese.png" alt="中文">
                    <img v-if="isShowPic" src="./../assets/img/english.png" alt="英文" class="lang_img" @click="changeLang('en')">
                    <i class="fa fa-caret-down" style="margin-left:8px"></i>
                  </div>
                  <div v-else><img src="./../assets/img/english.png" alt="英文">
                    <img src="./../assets/img/chinese.png" alt="中文" class="lang_img" v-if="isShowPic" @click="changeLang('cn')">
                    <i class="fa fa-caret-down" style="margin-left:8px"></i>
                  </div>
                </div> 
                <div v-if="!isLogin" style="float:right;margin-right:30px">
                  <div class="reg"> <a href="/views/login/login.html">登录</a></div>
                  <div class="reg"> <a href="/views/register/register.html">注册</a></div>
                </div>
                <div v-if="isLogin" style="float:right;margin-right:30px">
                  <div class="logined"> 
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                    <span class="login_name">{{userName}}</span>
                    <i class="fa fa-caret-down"></i>
                        <ul class="dropdown-menu animate bk-secd-menu allblock" data-animation="fadeIn" role="menu">
                            <li v-for="item in userNameDropdown" :key="item.index"><a @click="jumpTo(item.optionHref)">{{item.optionText}}</a></li>
                        </ul>
                  </div>
                  <div class="logined" >
                    <span  title="退出登录" class="logout" @click="logout"><i class="fa fa-sign-out"></i></span>
                  </div>
                </div>

            </div>
        </div>
    </div>
</div>
</template>
<script>
import search from '@/components/search.vue'
export default {
    name: "kline_header",
    components:{search},
    data() {
        return {
           activeName:"second",
           inputCoin:"",
           coins :[],
           marketCoins:['自选'],
           currentCoin:"btc/usdt",
           isShowSelect:false  ,    
           topall:{"optional":[]},
           coinFilter:"",
           moneyType:"USDT",
           isShowPic:false,
           userNameDropdown: [
            {
              optionHref: '/views/user/user.html#/basic',
              optionText: '账户信息'
            },
            {
              optionHref: '/views/user/user.html#/api',
              optionText: 'API设置'
            }],
           
        };
    },
    props:["coinList","eventName","selectVal"],
    computed: {
        //对自选市场过滤
        partitionTopall: function() {
            var topall = JSON.parse(JSON.stringify(this.topall));
            if (this.moneyType == 'optional') {

            }
            // 搜索过滤
            if (this.coinFilter !== '') {
                topall = topall.filter(function(item){
                    return item.token.toUpperCase().indexOf(this.coinFilter.toUpperCase()) !== -1;
                }.bind(this))

            }
            console.log(topall)
            return topall[this.moneyType];
        },
        isLogin() {
            return this.$store.state.isLogin;
        },
        userName(){
        return this.$store.state.userName
        },
        local_lang(){
        return this.$store.state.localLanguage ||"cn"
        },
            
    },
    methods: {
        jumpTo(toHref) {
            if(this.isLogin) {
                if (this.$cookie.get("BCKJ_safePwdStatus")==true) {
                    window.location.href = toHref;
                } else {
                    window.location.href = "/views/pwd/pwd.html#/setSafePwd";
                }
            } else {
                this.$message.error("请先登录");
            }
        },
        changeLang(type){
            this.$store.commit("setLanguage",type);
            this.isShowPic = false;
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
        handleClick(){

        },
        changeCoin (val){
            this.$store.commit("setCurrentCoin",val.toUpperCase())
            this.currentCoin = val.toUpperCase();
            window.location.hash = this.currentCoin;
        },
        showResult (){

        },
        setCoins(){
            this.currentCoin = window.location.hash.substring(2) || this.currentCoin;
            this.$store.commit("setCurrentCoin",this.currentCoin.toUpperCase())
        },
        changeMoneyType: function(type,index) {
            if(index == 1){
                this.moneyType = "optional";
            }
            this.moneyType = type;
            
        },
        //请求计价币接口
        getMarketCoins(){
            this.$ajax.get("/wap/market/coin").then((res)=>{
                if(res.data.code <=200){
                    this.marketCoins = this.marketCoins.concat(res.data.data);
                }
            })
        },
        //
        getCoins(){
            this.$ajax.get("/wap/market/Array").then((res)=>{
                if(res.data.code <=200){
                    this.topall = res.data.data;
                    this.topall.optional = [];
                }
            })
        }
    },
    watch: {

    },
    created() {
        //判断当前
       this.setCoins();
       this.getMarketCoins();
       this.getCoins()
       //查询自选接口
    },
    mounted() {
      console.log(this.coinList)
    }
};
</script>

<style  lang="less">
@buyer-color :#e23d3b;
@seller-color:#0ebb74;

.header_wrap{
    height: 60px;
    line-height:60px;
    min-width: 1200px;
    a{
        color: #fff;
    }
    a:hover{
        text-decoration: none;
    }
    .title{
        color: #fff;
        
        
    }
    .area{

    }
    .logo{
        min-width: 160px;
    }
    .header_btn{
        color:#fff;
        font-size:14px;
        line-height: 32px;
        margin-left: 10px;
        padding:0 12px;
        display: inline-block;
        text-transform: uppercase;
        background: #4353D0;
        border-radius: 10px;
        cursor: pointer;
        position: relative;
        a{
            color: #fff;
        }
        i{
            margin-left: 6px;
        }
        .tab_content{
            position: absolute;
            top: 40px;
            z-index: 10;
            width: 500px;
            padding: 20px;
            background: #2F313F;
        }
    }
    .change_coin{
        display: inline-block;

    }
    .change_coin:hover .coins_list {
        display: block
    }
    .coins_list{
        position: absolute;
        display: none;
        width:  510px;
        z-index: 20;
        background-color: #2F313F;
        top:40px;
        padding: 15px;
        .coin_title{
            .coin_tab{
                display: inline;
                margin: 0 12px;
                color: #999;
                padding-bottom: 2px;
                font-size: 14px;
            }
            .coin_tab:hover{
                border-bottom: 2px solid #4353D0;
                color: #fff;
            }
            .coin_input{ 
                position:  absolute;
                width:  200px;
                right:  15px;
                height: 30px;
                top: 10px;
                border: 1px solid #999;
                border-radius: 15px;
                input{
                    border: 0;
                    padding: 3px 16px;
                    height: 30px;
                    line-height: 28px;
                    width: 156px;
                    background: transparent;
                    outline: 0 none;
                }
            }
            .coin_tab_active{
                border-bottom: 2px solid #4353D0;
                color: #fff;
            }
        }
        .coins{
           background-color: #444653;
           .coin_active{
               background-color:#2F313F;
               color: #fdfdfd;
           }
           a{
               display: inline-block;
               padding: 0 5px;
               margin-right: 10px;
           }
           img{
               width: 16px;
               height: 16px;
               margin-top: -3px;
               margin: 5px;
           }
           span{
               color: #999;
           }
        }
    }
.reg{
  width:80px;
  height:32px;
  margin:10px 10px;
  display: inline-block;
  color: #fff;
  border: 1px solid #eee;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  border-radius:16px;
  a{
    color: #fff;
    &:hover{
      text-decoration: none;
    }
  }
}
.logined{
  display: inline-block;
  margin-top: 10px;
  padding: 0px 10px 10px 10px;
  height:60px;
  line-height: 40px;
  font-size: 16px;
  color: #fff;
  position: relative;
  cursor: pointer;
  &:hover{
    color: #FFB72B;
  }
  &:hover .dropdown-menu {
    display: block
  }
  .login_name{
    margin-left: 2px;
  }
  
}
.logout :hover{
  color: #FFB72B;
  cursor: pointer;
}
.lang{
  line-height: 40px;
  float:right;
  height:40px;
  margin:10px 10px;
  position: relative;
  color: #fff;
}
.lang_img{
  position: absolute;
  top:35px;
  left: 0;
}
    .login_area{
        text-align: right;
        color: #eee;
        margin-right: 20px;
        a{
            color: #eee;
        }
    }
    
}
.bk-secd-menu:after {
  content: "";
  width: 18px;
  height: 12px;
  display: block;
  position: absolute;
  top: -11px;
  right: 50%;
  margin-right: -9px;
  background-image: url('./../assets/img/dropdown_arrow.png');
  background-repeat: none;
  z-index: 1025; 
}
.bk-secd-menu{
  top: 40px;
}
.bk-secd-menu li a{
  padding: 7px 0;
  text-align: center;
  cursor: pointer;
}
   
</style>
