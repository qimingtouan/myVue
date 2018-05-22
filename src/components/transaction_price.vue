<template>
    <div>

        <div class="order_book table-container">
            <div class="head">
                <p class="title">最新价 
                    <span id="tickerClose">8363.00</span> 
                    <em class="uppercase" >usdt</em> 
                    涨幅
                    <span name="rate" class="color_up">+1.38%</span>
                </p>
            </div>
            <div class="ex-depth">
                <div id="market_depth">
                    <dl>  
                        <dt class="header">                                            
                        <span class="title"></span>                                             
                        <span class="price">价格(USDT)</span>                                             
                        <span class="amount">数量<em class="uppercase">(btc)</em></span>                                             
                        <span>累计<em class="uppercase">(btc)</em></span>                                         
                        </dt>  
                        <dd data-info="8366.25" @click="setPrice(8366.25)">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">卖 7</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd>
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">卖 7</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd>
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">卖 7</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd>
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">卖 7</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd> 
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">卖 7</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd>
                                                <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">卖 7</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd>
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">卖 7</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd>
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">卖 7</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd>
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">卖 7</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd> 
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">卖 7</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd>   
                   </dl>
                    <div class="dl-hr">                                         
                           <hr>                                    
                    </div>
                    <dl>  
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">买 1</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd> 
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">买 2</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd> 
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">买 3</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd> 
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">买 4</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd> 
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">买 5</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd>
                                                <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">买 1</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd> 
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">买 2</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd> 
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">买 3</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd> 
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">买 4</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
                            </div>                                         
                        </dd> 
                        <dd data-info="8366.25">                                             
                            <div class="inner">                                                 
                                <span class="title color-sell">买 5</span>                                                 
                                <span class="price">8366.25</span>                                                 
                                <span class="amount">0.5490</span>                                                 
                                <span>2.9752</span>                                                 
                                <b class="color-sell-bg" style="width: 24.140357048632488%"></b>                                            
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
                        <dd>08:58:14</dd>  
                        <dd>08:58:14</dd>  
                        <dd>08:58:11</dd>  
                        <dd>08:58:08</dd>  
                        <dd>08:58:07</dd>  
                        <dd>08:58:07</dd>  
                        <dd>08:58:07</dd>  
                        <dd>08:58:06</dd>  
                        <dd>08:58:06</dd>  
                        <dd>08:58:06</dd>   
                </dl>                                         
                    <dl class="market_trades_type">                                             
                        <dt>方向</dt>  
                        <dd class="color_up">买入</dd>  
                        <dd class="color_up">买入</dd>  
                        <dd class="color_up">买入</dd>  
                        <dd class="color_down">卖出</dd>  
                        <dd class="color_up">买入</dd>  
                        <dd class="color_up">买入</dd>  
                        <dd class="color_up">买入</dd> 
                        <dd class="color_up">买入</dd>  
                        <dd class="color_down">卖出</dd> 
                        <dd class="color_down">卖出</dd>           
                    </dl>                                         
                    <dl class="market_trades_price">                                             
                        <dt>价格<span class="uppercase">(usdt)</span></dt>  
                        <dd>8340.00</dd>  
                        <dd>8340.83</dd> 
                        <dd>8340.00</dd> 
                        <dd>8339.99</dd>  
                        <dd>8340.00</dd>  
                        <dd>8339.99</dd>  
                        <dd>8339.99</dd>  
                        <dd>8340.00</dd>  
                        <dd>8339.99</dd>  
                        <dd>8340.00</dd>  
                        <dd>8341.06</dd>   
                        <dd>8340.18</dd> 
                        <dd>8341.90</dd>    
                    </dl>                                        
                    
                    <dl class="market_trades_amount">                                             
                        <dt>数量<span class="uppercase">(btc)</span></dt>  
                        <dd>0.1889</dd> 
                        <dd>0.0108</dd>  
                        <dd>0.0100</dd>  <dd>0.0041</dd>  
                        <dd>0.0170</dd>  <dd>0.0901</dd>  
                        <dd>0.0164</dd>  <dd>0.0114</dd>  
                        <dd>0.0041</dd>  <dd>0.0042</dd>   
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "transaction",
  data() {
    return {
      nav: ["时间", "方向","价格","数量"],
      title:"实时成交",
      base:"btc",
      queto:"usdt"
    };
  },
  props: ["tradeData"],
  computed: {},
  methods: {
      setPrice(price) {
          this.$store.commit("setPrice",price);
      }
  },
  created() {
  },
  mounted() {
  }
};
</script>

<style scoped lang="less">
@buyer-color :#de211d;
@seller-color: #0ebb74;
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
    width: 350px;
    background-color: #fff;
    color: #333;
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
}
.order_book .head {
    height: 48px;
    line-height: 48px;
    padding-left: 30px;
    position: relative
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
    max-width: 100%
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
