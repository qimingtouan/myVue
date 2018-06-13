<template>
<div class="header_wrap">
    <div class="row">
        <div class="col-xs-1 log">
            logo
        </div>

        <div class="col-xs-2 title" >
            当前交易 :{{currentCoin}}
        </div>
        <div class="col-xs-3 area">
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
        </div>
        <div class="col-xs-2">
            <search :coin-list = "coinsData" selectVal = "selected" eventName = "handle" v-on:selected="selectCoin" v-on:handle="showResult"></search>
        </div>
        <div class="col-xs-4">
            <div class="logined" style="">
                <a target="_self" href="">
                        您好，<span id="">15251762038@163.com</span>
                </a> | 
                <a href="" target="_self" title="退出登录">退出登录</a> | 
                <a href="" target="_self" title="返回专业版">现货交易</a>
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
           inputCoin:"",
           coins :[],
           showItem:false,
           coinsData:["ZB/QC","ZB/BTC","ZB/USDT","BTC/USDT","ETH/USDT","ETC/BTC","ETC/QC","BTC/QC","BTC/USDT","NB/USDT"],
           currentCoin:"",
           searchInfo:{
                entrust:"",
                base:""
            },      
           
           
        };
    },
    props:["coinList","eventName","selectVal"],
    computed: {
            
     
            
    },
    methods: {
        selectCoin (val){
            this.$store.commit("setCurrentCoin",val.toUpperCase())
            this.currentCoin = val.toUpperCase();
            window.location.hash = this.currentCoin;
            console.log(this.$store.state.currentCoin)
        },
        showResult (){

        },
        setCoins(){
            this.currentCoin = window.location.hash.substring(2);
            this.$store.commit("setCurrentCoin",this.currentCoin.toUpperCase())
        }

    },
    watch: {

    },
    created() {
        //判断当前
       this.setCoins()
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
    .title{
        color: #e23e23;
    }
    .area{

    }
    .log{
        color: #fff
    }
    .entrust_input {
         width: 100px;
         margin-top:16px;
        input{
            background-color: #2a333a;
            color:#f7f7f7
        }
    }
    .coin_input{
        width:100px;
        margin-top:16px;
        input{
            background-color: #2a333a;
            color:#f7f7f7;
        }
    }
    
}

   
</style>
