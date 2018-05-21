<template>
  <div class="kline_trade">
    <!-- <trade-goods :trade-data = "prices"></trade-goods> -->
    <header>

    </header>
    <div class="right_side">
        
        <transaction-price></transaction-price>
    </div>
    <div class="middle_side">
        <transaction></transaction>
    </div>
    <div class="left_side">
        <div id="kline_container"></div>
        <div style="background-color:#eee"><entrust></entrust></div>
      </div>
      <footer></footer>
  </div>
  
</template>

<script>
import tradeGoods from '@/components/trade.vue'
import kLine from 'kline'
import transactionPrice from '@/components/transaction_price.vue'
import transaction from '@/components/transaction.vue'
import entrust from '@/components/entrust.vue'
export default {
  name: 'kline',
  components:{tradeGoods,transaction,transactionPrice,entrust},

  data () {
    return {
      prices:{
      },
      symbol:"btcusdt"
    }
  },
    computed: {
            
     
            
        },
    methods: {
   

    },
    created() {
        
    },
    mounted() {
      console.log($(document).width())
      var _this = this;
        var kline = new Kline({
            element: "#kline_container",
            width: $(document).width()-660,
            height: 664,
            theme: 'dark', // light/dark
            language: 'zh-cn', // zh-cn/en-us/zh-tw
            ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
            symbol: "btcusdt",
            symbolName: "BTC/USDT",
            type: "poll", // poll/socket
            url: "/trade/api/market/kline",
            limit: 1000,
            intervalTime: 5000,
            debug: true,
            showTrade: false,
            onResize: function (width, height) {
                console.log(width)
            }
        });
        window.onresize = function temp() {
          kline.resize($(document).width()-660,664)
        };
        kline.draw();
        setInterval(function(){
      _this.prices = {
        "baseCurrency":"USDT",
        "quoteCurrency":"BTC",
        "buy":[{
          number:1,
          price:190,
          amount:2
        },{
          number:2,
          price:190,
          amount:2
        },
        {
          number:3,
          price:(190+Math.random()).toFixed(4),
          amount:2
        },{
          number:4,
          price:(190+Math.random()).toFixed(4),
          amount:2
        }],
        "sell":[{
          number:4,
          price:(190+Math.random()).toFixed(4),
          amount:2
        },{
          number:3,
          price:(190+Math.random()).toFixed(4),
          amount:(4+2*Math.random()).toFixed(4)
        },{
          number:2,
          price:140,
          amount:2
        },{
          number:1,
          price:140,
          amount:2
        }]
      }
        },1000)
    }
}
</script>

<style lang = "less">
.gkline_trade{
  overflow: hidden;
}
header{
  background-color: aqua;
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
