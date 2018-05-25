<template>
<div class="header_wrap">
    <div class="row">
        <div class="col-xs-2 log">
            logo
        </div>
        <div class="col-xs-3 area">
            
        </div>
        <div class="col-xs-2 title" >
            当前交易 :{{currentCoin}}
        </div>
        <div class="col-xs-2">
            <search :coin-list = "coinsData" selectVal = "selected" eventName = "handle" v-on:selected="selectCoin" v-on:handle="showResult"></search>
        </div>
        <div class="col-xs-3">
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
           coinsData:["ZB/QC","ZB/BTC","ZB/USDT","BTC/USDT","ETH/USDT","ETC/BTC","ETC/QC","BTC/QC","BTC/USDT"],
           currentCoin:"BTC/QC"
           
           
        };
    },
    props:["coinList","eventName","selectVal"],
    computed: {
            
     
            
    },
    methods: {
        selectCoin (val){
            this.$store.commit("setCurrentCoin",val.toUpperCase())
            this.currentCoin = val.toUpperCase();
            console.log(this.$store.state.currentCoin)
        },
        showResult (){

        }
    },
    watch: {

    },
    created() {
       
    },
    mounted() {
      console.log(this.coinList)
    }
};
</script>

<style scoped lang="less">
@buyer-color :#e23d3b;
@seller-color:#0ebb74;
.header_wrap{
    height: 44px;
    line-height: 44px;
    .title{
        color: #e23e23;
    }
    .area{

    }
    .log{
        color: #fff
    }
}
</style>
