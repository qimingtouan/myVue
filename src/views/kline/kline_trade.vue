<template>
  <div>
    <el-container>
        <el-header>
            <header>
                <kLine-header></kLine-header>
            </header>
        </el-header>
        <el-container>
          <el-main><div id="kline_container"></div></el-main>
          <el-aside width="522px"><transaction-price ></transaction-price></el-aside>     
        </el-container>
          <!-- <el-aside width="300px"><transaction ></transaction></el-aside> -->
        <el-container height="276px">
          <el-main><entrust ></entrust></el-main>
          <el-aside width="522px" class="buyandsell">

            <buy-and-sell></buy-and-sell>

            </el-aside>     
        </el-container>
    </el-container>
  </div>
</template>

<script>
import kLineHeader from '@/components/kline_header.vue'
import kLine from 'kline'
import transactionPrice from '@/components/trade_price.vue'
import buyAndSell from '@/components/transaction.vue'
import entrust from '@/components/entrust.vue'
export default {
  name: 'kline',
  components:{transactionPrice,entrust,kLineHeader,buyAndSell},

  data () {
    return {
      prices:{
      },
      symbol:"",
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
        //判断当前是否登录;
        this.$store.commit("checkLogin");

    },
    mounted() {
      let _this = this
        var kline = new Kline({
            element: "#kline_container",
            width: $(".el-main").width(),
            height: 630,
            theme: 'dark', // light/dark
            language: 'zh-cn', // zh-cn/en-us/zh-tw
            ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
            symbol: this.currentCoin.toLowerCase().split("/").join(""),
            symbolName: "NB/USDT",
            type: "poll", // poll/socket
            url: "/web/market/kline",
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
          kline.resize($(".el-main").width(),630)
        };
        
        this.kline = kline;
        this.klineExist =true;
        kline.draw();
    }
}
</script>

<style lang = "less">

.el-main, .el-aside{
  padding:0;
  background-color: #1E202E;
}
.el-footer{
  padding:0 20px 0 0;
  background-color: #282828;
}
header{
  height: 60px;
   background: #1E202E;
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
.buyandsell{
  border-left: 1px solid #2b2929;
}

</style>
