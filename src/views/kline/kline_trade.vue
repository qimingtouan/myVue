<template>
  <div class="kline_trade">
    <!-- <trade-goods :trade-data = "prices"></trade-goods> -->
    <header>
          <kLine-header></kLine-header>
    </header>
    <div class="right_side">
        
        <transaction-price ></transaction-price>
    </div>
    <div class="middle_side">
        <transaction ></transaction>
    </div>
    <div class="left_side">
        <div id="kline_container"></div>
        <div style="background-color:#eee"><entrust :currency="info"></entrust></div>
      </div>
      <footer></footer>
  </div>
  
</template>

<script>
import tradeGoods from '@/components/trade.vue'
import kLineHeader from '@/components/kline_header.vue'
import kLine from 'kline'
import transactionPrice from '@/components/transaction_price.vue'
import transaction from '@/components/transaction.vue'
import entrust from '@/components/entrust.vue'
export default {
  name: 'kline',
  components:{tradeGoods,transaction,transactionPrice,entrust,kLineHeader},

  data () {
    return {
      prices:{
      },
      symbol:"btcusdt",
      info:{
        base:"USDT",
        quote:"QC",
        userid:0
      },
      temp:"",
      klineExist:false,
      kline:null
    }
  },
    computed: {
         currentCoin(){
           let temp = this.$store.state.currentCoin.split("/").join("");
           console.log(this.$store.state.currentCoin)
           return this.$store.state.currentCoin;
         }     
        },
    methods: {        
    },
    watch:{
      currentCoin(val){
         if(this.klineExist){
             console.log(1)
             let temp = val.toLowerCase().split("/").join("");
             this.kline.setSymbol(temp,val)
         }
      }
    },
    created() {
        //判断当前是否登录
    },
    mounted() {
        var kline = new Kline({
            element: "#kline_container",
            width: $(document).width()-660,
            height: 664,
            theme: 'dark', // light/dark
            language: 'zh-cn', // zh-cn/en-us/zh-tw
            ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
            symbol: this.symbol,
            symbolName: "BTC/USDT",
            type: "poll", // poll/socket
            url: "/trade/api/market/kline",
            limit: 1000,
            intervalTime: 5000,
            debug: false,
            showTrade: false,
            onResize: function (width, height) {
                console.log(width)
            }
        });
        window.onresize = function temp() {
          kline.resize($(document).width()-660,664)
        };
        
        this.kline = kline;
        this.klineExist =true;
        kline.draw();
    }
}
</script>

<style lang = "less">
.kline_trade{
  overflow: hidden;
}
header{
  background-color: #2a333a;
  height: 44px;
}
.left_side{
  margin-right: 660px;
}
.right_side{
 float: right;
 width: 350px;
 
}
.middle_side{
  float: right;
  width: 300px;
}


</style>
