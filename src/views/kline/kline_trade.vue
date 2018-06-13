<template>
  <div>
    <el-container>
        <el-header >
          <header>
              <kLine-header></kLine-header>
          </header>
        </el-header>
        <el-container>
          <el-container>
          <el-main><div id="kline_container"></div></el-main>
          <el-footer height="280px"><entrust ></entrust></el-footer>
        
        </el-container>
          <el-aside width="300px"><transaction ></transaction></el-aside>
          <el-aside width="350px"><transaction-price ></transaction-price></el-aside>
        </el-container>
          
    </el-container>
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
      symbol:"nbusdt",
      temp:"",
      klineExist:false,
      kline:null
    }
  },
    computed: {
         currentCoin(){
           let temp = this.$store.state.currentCoin.split("/").join("");
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
      let _this = this
        var kline = new Kline({
            element: "#kline_container",
            width: $(".el-main").width(),
            height: 664,
            theme: 'dark', // light/dark
            language: 'zh-cn', // zh-cn/en-us/zh-tw
            ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
            symbol: this.symbol,
            symbolName: "NB/USDT",
            type: "poll", // poll/socket
            url: "/trade/api/market/kline",
            limit: 1000,
            intervalTime: 5000,
            debug: false,
            showTrade: false,
            onResize: function (width, height) {
                
            },
            onThemeChange:function(theme){
              _this.$store.commit("setklineTheme",theme);
            }
        });
        window.onresize = function temp() {
          kline.resize($(".el-main").width(),664)
        };
        
        this.kline = kline;
        this.klineExist =true;
        kline.draw();
    }
}
</script>

<style lang = "less">

.el-main{
  padding:0 20px 0 0;
  background-color: #282828;
}
.el-footer{
  padding:0 20px 0 0;
  background-color: #282828;
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
