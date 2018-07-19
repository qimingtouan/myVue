<template>
    <div class="trade_his">

        <div class="order_book table-container">
            <div class="head">
                <p class="title">最新价 
                    <span id="tickerClose">{{nowprice}}</span> 
                    <em class="uppercase" >{{quoteCoin}}</em> 
                    涨幅
                    <span name="rate" class="color_up">+1.38%</span>
                </p>
            </div>
            <div class="ex-depth">
                <div id="market_depth">
                    <dl>  
                        <dt class="header">                                            
                        <span class="title"></span>                                             
                        <span class="price">价格{{quoteCoin}}</span>                                             
                        <span class="amount">数量(<em class="uppercase">{{baseCoin}}</em>)</span>                                             
                        <span>累计<em class="uppercase">({{baseCoin}})</em></span>                                         
                        </dt>  
                        <dd  @click="setPrice(item.price)" v-for="(item,index) in sellData" :key="item.index">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">卖{{10-index}}</span>                                                 
                                <span class="price">{{item.price}}</span>                                                 
                                <span class="amount">{{item.amount.toFixed(4)}}</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" :style="{width:sellwidth[index]+'%'}"></b>                                            
                            </div>                                         
                        </dd>
                   </dl>
                    <div class="dl-hr">                                         
                           <hr>                                    
                    </div>
                    <dl>  
                        <dd  @click="setPrice(item.price)" v-for="(item,index) in buyData" :key="item.index">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">买{{index+1}}</span>                                                 
                                <span class="price">{{item.price}}</span>                                                 
                                <span class="amount">{{item.amount.toFixed(4)}}</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-buy-bg" :style="{width:buywidth[index]+'%'}"></b>                                            
                            </div>                                         
                        </dd>  
                   </dl>
                </div >
            </div>
        </div>
                <div class="mod market_trades" style="">
            <!-- <div class="mod_hd">
                <span class="mod_show_btn">
                    <span>实时成交</span>
                </span>
            </div> -->
            <div class="mod_bd">
            <div class="market_trades_list" id="market_trades_list">
                <dl class="market_trades_time">                                             
                    <dt>时间</dt>  
                        <dd v-for="list in historyTrade" :key="list.id">{{list.id|getFormatTime}}</dd>   
                </dl>                                         
                    <dl class="market_trades_type">                                             
                        <dt>方向</dt>  
                        <dd v-for="list in historyTrade" :key="list.id" :class="{color_up:list.path == '1',color_down:list.path == '2'}">{{list.path|buyOrsell}}</dd> 
                    </dl>                                        
                    <dl class="market_trades_price">                                             
                        <dt>价格<span class="uppercase">{{quoteCoin}}</span></dt>  
                        <dd v-for="list in historyTrade" :key="list.id">{{list.price.toFixed(4)}}</dd>     
                    </dl>                                        
                    
                    <dl class="market_trades_amount">                                             
                        <dt>数量<span class="uppercase">{{baseCoin}}</span></dt>  
                        <dd v-for="list in historyTrade" :key="list.id">{{list.amount.toFixed(2)}}</dd> 
      
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import formatTime from "@/assets/js/formatTime"
export default {
  name: "transaction",
  data() {
    return {
      nav: ["时间", "方向","价格","数量"],
      title:"实时成交",
      base:"btc",
      queto:"usdt",
      buyData:[],
      sellData:[],
      nowprice:"--",
      historyTrade:[]
    };
  },
  props:["currency"],
  computed: {
      sellwidth(){
          let max = 0;
          let temp = [];
          this.sellData.forEach(item=>{
              if(Number(item.amount)>max){
                  max = Number(item.amount)
              }
          })
          console.log(max)
          temp = this.sellData.map(item=>{
              return Number(item.amount)/max*100
            }
          )
          return temp; 
      },
      buywidth(){
          let max = 0;
          let temp = [];
          this.sellData.forEach(item=>{
              if(Number(item.amount)>max){
                  max = Number(item.amount)
              }
          })
          console.log(max)
          temp = this.sellData.map(item=>{
              return Number(item.amount)/max*100
            }
          )
          return temp; 
      },
      isLogin(){
          return this.$store.state.isLogin;
      },
      baseCoin(){
          return this.$store.state.currentCoin.split("/")[0]
      },
      quoteCoin(){
          return this.$store.state.currentCoin.split("/")[1]
      },
      currentCoin(){
          return this.$store.state.currentCoin;
      }
  },
  methods: {
      setPrice(price) {
          
          this.$store.commit("setPrice",price);
      },
    getBuySellInfo(isFirst) {
      if(this.isLogin){
        this.$ajax.all([this.$ajax.get("/web/api/market/assest/"+this.currentCoin.toLowerCase()), this.$ajax.get("/web/api/market/Kline/" + this.currentCoin.toLowerCase())])
        .then(this.$ajax.spread((perms, response) =>{
          if (response.data.code <= 200) {
              this.info.nowprice = response.data.data.price;
              this.info.gains = response.data.data.gains;
              this.info.high = response.data.data.high;
              this.info.low = response.data.data.low;
              this.info.amount = response.data.data.amount;
              this.info.priceCny = response.data.data.priceCny;
            }
            if(perms.data.code <= 200){
              this.canUseQuote = Number(perms.data.data.quote.available).toFixed(4);
              this.canUseBase = Number(perms.data.data.base.available).toFixed(4);
            }
        }));
      }else{
        let url = "/web/api/market/Kline/" + this.currentCoin.toLowerCase();
        this.$ajax
          .get(url)
          .then(response => {
            if (response.data.code <= 200) {
              this.info.nowprice = response.data.data.price;
              this.info.gains = response.data.data.gains;
              this.info.high = response.data.data.high;
              this.info.low = response.data.data.low;
              this.info.amount = response.data.data.amount;
              this.info.priceCny = response.data.data.priceCny;
            } else {
              
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
      
      this.$ajax
        .get("/web/api/market/sellAndBuy/" + this.currentCoin.toLowerCase())
        .then(response => {
          if (response.data.code == 200) {
            console.log(this.value)
            if (this.value <= response.data.data.sell.length) {
              this.sellValue = this.value
              this.sellData = response.data.data.sell
                .reverse()
                .slice(0, this.value)
                .reverse();
            } else {
              this.sellData = response.data.data.sell;
              this.sellValue = response.data.data.sell.length;
            }
            if (this.value <= response.data.data.buy.length) {
              this.buyData = response.data.data.buy.slice(0, this.value);
            } else {
              this.buyData = response.data.data.buy;
            }
            //第一次进来，初始化买一卖一
            if(isFirst){
              this.buyPrice = this.sellData[this.sellData.length-1].price|"";
              this.sellPrice = this.buyData[0].price||"";
            }
          } else {
            throw new Error(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    init(isFirst) {
      this.getBuySellInfo(isFirst);
      this.getHistoryTrade();
    },
      getHistoryTrade(){
          let url = "/web/api/market/depth/"+this.currentCoin.toLowerCase();
           this.$ajax.get(url).then(response => {
            console.log(response);
            if(response.data.code == 0){
                //30
                if(response.data.data && response.data.data.length >=15){
                    this.historyTrade = response.data.data.slice(0,15);
                }else{
                    this.historyTrade = response.data.data;
                }
                
            }
           })
      }
  },
  watch:{
      currentCoin(){
          this.getBuySellInfo()
      }
  },
  filters:{
      getFormatTime(val){
          return formatTime(new Date(val)).substr(11)
      },
      buyOrsell(val){
          return val == "1"?"买入":"卖出";
      }
  },
  created() {
      this.init()
  },
  mounted() {
  }
};
</script>

<style scoped lang="less">
@buyer-color :#de211d;
@seller-color: #0ebb74;
.trade_his{
    background-color: #212121;
    color: #999;
    height: 100%;
    border-left: 1px solid #3a3a3a;
}
hr{
    border-color: #666
}
 .color_down {
    color: @buyer-color;
    text-transform: lowercase
}
 .color_up {
    color: @seller-color;
    text-transform: lowercase
}
.mod {
    border-radius: 3px;
    margin-bottom: 10px;
    transition: height .15s ease-in-out;
}

.mod .mod_hd {
    height: 48px;
    font-size: 16px;
    line-height: 48px;
    padding-left: 30px
}
.market_trades {
    // height: 520px;
    width: 349px;
    

}

.market_trades.mod .mod_hd {
    padding-left: 10px
}

.market_trades.mod .mod_bd {
    font-size: 12px;
    // height: 462px;
    overflow-y: auto;
    font-family: Arial,Helvetica,sans-serif;
    padding-bottom: 10px
}

.market_trades_list {
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between
}

.market_trades dt {
    height: 40px;
    line-height: 40px
}

.market_trades dd {
    height: 20px;
    line-height: 20px
}

.market_trades_amount dd,.market_trades_amount dt,.market_trades_price dd,.market_trades_price dt {
    text-align: right
}

.market_trades_type dd {
    text-transform: lowercase
}

.market_trades_type dd:first-letter {
    text-transform: uppercase
}
.mod .mod_bd {
    padding: 0 30px
}
.order_book {
    display: table-cell;
    overflow: visible;
    vertical-align: top;
     width: 324px;
     height: 50%;
}
.order_book .head {
    height: 48px;
    line-height: 48px;
    padding-left: 30px;
    position: relative;
    
}

.order_book .head .title {
    font-size: 14px
}
.ex-depth {
    // height: 442px;
   
}

.ex-depth .dl-hr {
    margin: 1px 10px 9px
}

.ex-depth .dl-hr hr {
    width: 100%
}

.ex-depth dl {
    overflow: hidden;
    padding: 0 4px
}

.ex-depth dl dd,.ex-depth dl dt {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: right;
    position: relative;
    box-sizing: border-box
}

.ex-depth dl dd .inner,.ex-depth dl dt .inner {
    display: table;
    padding: 0;
    position: relative
}

.ex-depth dl dd .title,.ex-depth dl dt .title {
    width: 45px;
    text-align: left
}

.ex-depth dl dd .title:first-letter,.ex-depth dl dt .title:first-letter {
    text-transform: uppercase
}

.ex-depth dl dd span,.ex-depth dl dt span {
    font-size: 12px;
    white-space: nowrap;
    display: table-cell;
    width: 33%
}

.ex-depth dl dt {
    table-layout: fixed;
    padding-right: 6px
}

.ex-depth dl dt .title {
    min-width: 30px
}

.ex-depth dl dd {
    height: 20px;
    line-height: 20px;
    margin-bottom: 2px;
    padding: 0 6px;
    cursor: pointer
}

.ex-depth dl dd * {
    cursor: pointer
}

.ex-depth dl dd:hover b {
    visibility: hidden
}
.ex-depth .color-buy,.ex-depth .color-sell {
    text-transform: lowercase
}

.ex-depth .color-buy-bg,.ex-depth .color-sell-bg {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    opacity: .1;
    max-width: 100%;
    
}
.color-buy-bg{
    background-color: #de211d
}
.color-sell-bg{
    background-color: #3dc18e
}
.ex-depth .link-group {
    padding: 0 10px;
    height: 28px;
    line-height: 22px;
    margin-top: 7px
}

.ex-depth .link-group a {
    font-size: 12px;
    float: right
}
.upper,.uppercase {
    font-style: normal;
    text-transform: uppercase
}
.table-container .head {
    // background-color: #1b1e2e;
    padding: 0 20px;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    // color: #c7cce6
}
</style>
