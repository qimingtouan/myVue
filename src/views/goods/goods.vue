<template>
  <div class="goods">
	<header>
		<div class="header">
			<div>
        <header-nav :activeItem = 'activeItem'></header-nav>
			</div>
		</div>
	</header>
	<section class="moveup">
    <div class="bk-trans-asset">	
		<div class="container">
			<div class="bk-band clearfix" >
        <tab-nav></tab-nav>
			</div>


			<div class="trade_info clearfix">
				<div class="col-xs-4 trade_item">
					<div class="trade_dual">
						<p>交易对：<span class="font_24">{{currentCoin}}</span></p>
					</div>
					<div class="col-xs-5 padl_0 trade_left">
						<div class="canUse">
							可用 : <span>{{canUseQuote}}{{currentCoin.split("/")[1]}}</span>
						</div>
						<div class="canUse">
							可买: <span>{{canBuy}}{{currentCoin.split("/")[0]}}</span>
						</div>
					</div>
					<div class="col-xs-6 padl_0">
						<div class="canUse">
							可用: <span>{{canUseBase}}{{currentCoin.split("/")[0]}}</span>
						</div>
						<div class="canUse">
							可卖: <span>{{canSell}}{{currentCoin.split("/")[1]}}</span>
						</div>
					</div>
				</div>
				<div class="col-xs-6 trade_item">
					<div class="coin_info">
						<div class="ratio">
							<p>BTC：<span style="font-size:14px;"> {{info.nowprice}} {{currentCoin.split("/")[1]}}</span>/<span>￥{{info.priceCny}}</span></p>
						</div>
						<div>
							<p>高（24H）：{{currentCoin.split("/")[1]}} {{info.high}} </p>
							<p>低（24H）：{{currentCoin.split("/")[1]}} {{info.low}}</p>
							<p>成交量（24H）：{{info.amount}}</p>
							
						</div>
					</div>
					<div class="col-xs-5">
						<div class="k_btn">
							<a :href='"/views/kline/kline_trade.html#/"+currentCoin.toLowerCase()'><img src="../../assets/img/k_line.png" style="margin-right:5px;margin-top:-3px"/>K线交易</a>
						</div>
						<div class="k_btn">
							<a :href='"/views/coins/coins.html#/"+currentCoin.split("/")[0].toLowerCase()'><img src="../../assets/img/coin.png" style="margin-right:5px;margin-top:-3px" />币种资料</a>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>

	<div class="bk-trans-form">
		<div class="container">
			<div class="clearfix pad15 bg_fff">
			    <div class="bk-trans-left bg_fff col-xs-4 ">
					<div class="item">
					<div class="bk-buy-form">
						<div class="buy_header" id="bkBuyType">
							<div>
								<img src="../../assets/img/buy.png" alt="">
							</div>
							<div class="buy_title">
								限价买入
							</div>
						</div>

						<!-- 限价/批量买入委托开始 -->
						<div id="buyDefaultForm">
							<div class="form-group has-feedback form-subline">
								<label class="control-label" for="buyUnitPrice">
									<span class="buyDefaultLabel">买入价</span> ({{currentCoin.split("/")[1]}})
								</label>
								<div class="input-group">
									<input type="text" class="form-control form-second" v-model="buyPrice" name="buyUnitPrice">
								</div>
							</div>
							
							<div class="form-group has-feedback form-subline">
								<label class="control-label" for="buyNumber">买入量 ({{currentCoin.split("/")[0]}})</label>
								<div class="input-group">
									<input type="text" class="form-control form-second" v-model="buyNumber" name="buyNumber">
								</div>
							</div>

							<div class="range range_buy" id="buySlider">
								<el-slider v-model="buybar" @change="dragBar(buybar,0)" :format-tooltip="formatTooltip"> </el-slider>
								<div class="el-slider__stop" style="left: 25%; top:16px"></div>
								<div class="el-slider__stop" style="left: 50%; top:16px"></div>
								<div class="el-slider__stop" style="left: 75%; top:16px"></div>
							</div>

							<div class="form-group has-feedback">
								<label class="control-label" for="realBuyAccount">预计交易额：<b class="text-primary" id="realBuyAccount">{{buyTrade}}</b> {{currentCoin.split("/")[1]}}</label>	
								
							</div>

						</div>
						<div>
							<button id="buyBtn" type="button" class="btn btn-primary btn-block ft16" @click="buyFun">
								立即买入
							</button>
						</div>
					</div>
					</div>
			  	</div>
				<div class="bk-trans-left bg_fff col-xs-4">
					<div class="item2">
						<div class="bk-sell-form">
							<div class="sell_header" >
								<div>
									<img src="../../assets/img/sell.png" alt="">
								</div>
								<div class="buy_title">
									限价卖出
								</div>
							</div>

							<!-- 限价/批量委托卖出开始 -->
							<div id="sellDefaultForm">
								<div class="form-group has-feedback form-subline">
									<label class="control-label" for="sellUnitPrice">
									<span class="sellDefaultLabel">卖出价</span> ({{currentCoin.split("/")[1]}})
									</label>
									<div class="input-group">
										<input type="text" class="form-control form-second" v-model="sellPrice" name="sellUnitPrice">
									</div>
								</div>
								
								<div class="form-group has-feedback form-subline">
									<label class="control-label" for="sellNumber">卖出量 ({{currentCoin.split("/")[0]}})</label>
									<div class="input-group">
										<input type="text" class="form-control form-second" v-model="sellNumber" name="sellNumber">
									</div>
								</div>

								<div class="range range_sell" id="sellSlider"><el-slider v-model="sellbar" @change='dragBar(sellbar,1)' :format-tooltip="formatTooltip"> </el-slider>
								<div class="el-slider__stop" style="left: 25%; top:16px"></div>
								<div class="el-slider__stop" style="left: 50%; top:16px"></div>
								<div class="el-slider__stop" style="left: 75%; top:16px"></div></div>

								<div class="form-group has-feedback">
									<label class="control-label" for="realSellAccount">预计交易额：<b class="text-second" id="realSellAccount">{{sellTrade}}</b> {{currentCoin.split("/")[1]}}</label>
								</div>
							</div>
							<!-- 限价/批量委托卖出结束 -->

							<div >
								<button id="sellBtn" type="button" class="btn btn-second btn-block ft16" @click="sellFun">
									立即卖出
								</button>
							</div>
						</div>
					</div>
			  	</div>
			  	<div class="bk-trans-right bg_fff col-xs-4 pull-right">
					<div class="post_orders">
						<div style="float:left;margin-left:35px;height:28px;line-height:28px;font-size:18px;">
							挂单
						</div>
						<div style="float:right;margin-right:35px">
							<el-select v-model="value" placeholder="买卖档位" size="mini" @change="changeDepth">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
							</el-select>
						</div>
						
					</div>

					<div class="bk-market-form market">
						<table id="sellMarket" width="100%">
							<thead>
								<tr>
									<td>买/卖</td>
									<td>价格</td>
									<td>数量</td>
								</tr>
							</thead>
							<tbody v-if = 'sellData.length>0'>  
								<tr v-for="(item,index) in sellData" :key="item.index" @click="$store.commit('setPrice',item.price)">
									<td width="20%" class="text-second">卖{{sellValue-index}}</td>
									<td width="40%" >{{item.price}}</td>
									<td width="40%" class="text-left text-g rela">{{item.amount}}<div class="percent text-second" :style="{width:sellwidth[index]}"></div></td>
								</tr>
							</tbody>
              <tbody v-else>  
								<tr style="height:150px">
									<td colspan="3" >没有卖单数据</td>
								</tr>
							</tbody>
						</table>
			  	    	<div class="bk-divider" style="margin:10px auto;border-top:1px solid #ddd"></div>
						<table id="buyMarket" width="100%">
							<tbody v-if = 'buyData.length>0'>		
								<tr v-for="(item,index) in buyData" :key="item.index" @click="$store.commit('setPrice',item.price)">
									<td width="20%" class="text-primary">买{{index+1}}</td>
									<td width="40%">{{item.price}}</td>

									<td width="40%" class="text-left text-g rela">{{item.amount}}<div class="percent text-primary" :style="{width:buywidth[index]}"></div></td>

								</tr>
							</tbody>
              <tbody v-else>  
								<tr style="height:150px">
									<td width="100%" >没有买单数据</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			  	<div class="bk-trans-record bg_fff ">

					  <entrust :gettype="type1">                    
						<div slot="header">
                <div class="entrust_title" role="button">限价委托</div>
            </div>
					</entrust>
          <div style="margin-top:30px"></div>
					  <entrust :gettype="type2">
						  <div  slot="header">
							<div class="entrust_title" role="button">历史委托</div>
						</div>
					  </entrust>
				</div>
			</div>
		</div>
	</div>
      <div style="margin-top:40px">
        <footer-nav></footer-nav>
    </div>
	</section>
  </div>
</template>

<script>
import searchCoin from "@/components/search.vue";
import entrust from "@/components/entrust2.vue";
import tabNav from "@/components/tabNav.vue";
import footerNav from "@/components/footerNav.vue";
import headerNav from "@/components/trade_header.vue";
import method from "@/assets/js/common_method.js";
export default {
  name: "goods",
  components: { searchCoin, entrust, tabNav, footerNav, headerNav },

  data() {
    return {
      info: {},
      buyNumber: "",
      sellNumber: "",
      buyPrice: "",
      sellPrice: "",
      prices: {},
      sellbar: 0,
      buybar: 0,
      sellValue: 5,
      activeItem: [false, false, true, false],
      maxBuyNumber:"",
      options: [
        {
          value: 5,
          label: "5档"
        },
        {
          value: 10,
          label: "10档"
        },
        {
          value: 20,
          label: "20档"
        }
      ],
      sellData: [],
      buyData: [],
      symbol: "btc/usdt",
      value: "5",
      type1: "0",
      type2: "1",
      canUse: 10,
      canUseQuote: "--",
      canUseBase: "--",
      canSell: "--",
      canBuy: "--"
    };
  },
  computed: {
    setPrice() {
      return this.$store.state.count;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    currentCoin() {
      return this.$store.state.currentCoin;
    },
    interval() {
      return this.$store.state.time;
    },
    buyTrade: {
      get() {
        if (this.isLogin) {
          if (this.buyPrice != "" && this.buyNumber != "") {
            if (this.buyPrice * this.buyNumber > this.canUseQuote) {
            }
            return method.floorNumber(this.buyPrice * this.buyNumber,4);
          }
        }
        return "0.00";
      }
    },
    sellTrade: {
      get() {
        if (this.isLogin) {
          if (this.sellPrice != "" && this.sellNumber != "") {
            return method.floorNumber(this.sellPrice * this.sellNumber,4);
          }
        }
        return "0.00";
      }
    },
    sellwidth() {
      let max = 0;
      let temp = [];
      this.sellData.forEach(item => {
        if (Number(item.amount) > max) {
          max = Number(item.amount);
        }
      });
      console.log(max);
      temp = this.sellData.map(item => {
        return Number(item.amount) / max * 100 + "%";
      });
      console.log(temp);
      return temp;
    },
    buywidth() {
      let max = 0;
      let temp = [];
      this.buyData.forEach(item => {
        if (Number(item.amount) > max) {
          max = Number(item.amount);
        }
      });
      console.log(max);
      temp = this.buyData.map(item => {
        return Number(item.amount) / max * 100 + "%";
      });
      return temp;
    }
  },
  methods: {
    changeDepth() {
      this.getBuySellInfo();
    },

    dragBar(val, type) {
      if (this.isLogin) {
        if (type == 0) {
          // this.buybar = val;
          if (this.buyPrice != "" && this.buyPrice != "0") {
            this.buyNumber = parseFloat(
              (this.canUseQuote / this.buyPrice * val / 100).toFixed(4)
            );
          }
        } else {
          // this.sellbar = val;
          if (this.sellPrice != "" && this.sellPrice != "0") {
            this.sellNumber = parseFloat(
              (this.canUseBase * val / 100).toFixed(4)
            );
          }
        }
      }
    },
    getBuySellInfo(isFirst) {
      if (this.isLogin) {
        this.$ajax
          .all([
            this.$ajax.get(
              "/wap/market/assest/" + this.currentCoin.toLowerCase()
            ),
            this.$ajax.get(
              "/wap/market/Kline/" + this.currentCoin.toLowerCase()
            )
          ])
          .then(
            this.$ajax.spread((perms, response) => {
              if (response.data.code <= 200) {
                this.info.nowprice = response.data.data.price;
                this.info.gains = response.data.data.gains;
                this.info.high = response.data.data.high;
                this.info.low = response.data.data.low;
                this.info.amount = response.data.data.amount;
                this.info.priceCny = response.data.data.priceCny;
              }
              if (perms.data.code <= 200) {
                this.canUseQuote = method.floorNumber(
                  perms.data.data.quote.available,
                  6
                );
                this.canUseBase = method.floorNumber(
                  perms.data.data.base.available,
                  6
                );
              }
            })
          );
      } else {
        let url = "/wap/market/Kline/" + this.currentCoin.toLowerCase();
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
        .get("/wap/market/sellAndBuy/" + this.currentCoin.toLowerCase())
        .then(response => {
          if (response.data.code == 200) {
            console.log(this.value);
            if (this.value <= response.data.data.sell.length) {
              this.sellValue = this.value;
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
            if (isFirst) {
              this.buyPrice = this.sellData[this.sellData.length - 1].price | "";
              this.sellPrice = this.buyData[0].price || "";
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
    },
    formatTooltip(val) {
      return val + "%";
    },

    sellFun() {
      if (this.isLogin) {
        let data = {
          coinName: this.currentCoin.split("/")[0],
          price: this.sellPrice,
          marketName: this.currentCoin.split("/")[1],
          amount: this.sellNumber,
          type: 2,
          sources: "web"
        };
        if (!this.sellNumber || !this.sellPrice) {
          this.$message({
            showClose: false,
            message: "请输入价格或数量。",
            type: "warning"
          });
          return;
        }
        this.$ajax
          .post("/wap/market/order", data)
          .then((response)=> {
            if (response.data.code == 200) {
              this.$message({
                showClose: true,
                message: "卖出成功",
                type: "success"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    buyFun() {
      if (this.isLogin) {
        let data = {
          coinName: this.currentCoin.split("/")[0],
          price: this.buyPrice,
          marketName: this.currentCoin.split("/")[1],
          amount: this.buyNumber,
          type: 1,
          sources: "web"
        };
        console.log(this.buyNumber && this.buyPrice);
        if (!this.buyNumber || !this.buyPrice) {
          this.$message({
            showClose: false,
            message: "请输入价格或数量。",
            type: "warning"
          });
          return;
        }
        // this.$confirm(
        //   `您将买入 ${this.buyNumber} 个 ${data.coinName}, 是否继续?`,
        //   "提示",
        //   {
        //     confirmButtonText: "确定",
        //     cancelButtonText: "取消",
        //     type: "warning"
        //   }
        // )
        //   .then(() => {
        this.$ajax
          .post("/wap/market/order", data)
          .then(response => {
            if (response.data.code == 200) {
              this.$message({
                showClose: true,
                message: "买入成功！",
                type: "success"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        // })
        // .catch(() => {
        //   this.$message({
        //     showClose: false,
        //     message: "取消买入！",
        //     type: "info"
        //   });
        // });
      }
    }
  },
  created() {
    this.$store.commit("checkLogin");
    this.$store.dispatch("startInterval");
    //获取交易对
    // console.log(window.location.hash)

    this.init(true);
  },
  watch: {
    buyNumber(val, oldval) {
      if (this.isLogin || this.buyNumber != "0" || this.buyNumber != "") {
        // this.buyPrice = this.buyPrice.toString().replace(/[^\d|\.]/g, "");
        if (isNaN(this.buyNumber)) {
          this.buyNumber = parseFloat(val.toString()) || "";
        }
        if (Number(this.buyNumber) * this.buyPrice > this.canUseQuote) {
          this.buyNumber = method.floorNumber(this.canUseQuote / this.buyPrice,6);
        }
        this.buybar = (this.buyNumber * this.buyPrice / this.canUseQuote * 100).toFixed(2);
        
      }
    },
    sellNumber(val, oldval) {
      if (this.isLogin || this.sellNumber != "0" || this.sellNumber != "") {
        // this.sellPrice = this.sellPrice.toString().replace(/[^\d|\.]/g, "");
        if (isNaN(this.sellNumber)) {
          this.sellNumber = parseFloat(val.toString()) || "";
          if(this.sellNumber){
            this.canSell = method.floorNumber(
                  perms.data.data.base.available * this.info.nowprice,
                  6
                );
          }
        }
        if (Number(this.sellNumber) > this.canUseBase) {
          this.sellNumber = this.canUseBase;
        }
        this.sellbar = (this.sellNumber / this.canUseBase * 100).toFixed(2);
      }
    },
    sellPrice(val) {
      if (this.isLogin) {
        if (isNaN(this.sellPrice)) {
          this.sellPrice = parseFloat(val.toString()) || "";
        }
      }
    },
    buyPrice(val) {
      if (this.isLogin && this.buyPrice != "" && this.buyPrice != 0) {
          if (isNaN(this.buyPrice) ) {
            this.buyPrice = parseFloat(val.toString()) || "";
            if(this.buyPrice){
                this.canBuy = method.floorNumber(
                    perms.data.data.quote.available / this.info.nowprice,
                    6
                  );
            }
          }else{
            if(this.buyNumber != ""){
              this.maxBuyNumber = method.floorNumber(this.canUseQuote/this.buyPrice,6);
              this.buyNumber = method.floorNumber(this.maxBuyNumber*this.buybar/100,6);
            }

          }
        }
    },
    setPrice(val, oldval) {
      this.buyPrice = this.$store.state.selectedPrice;
      this.sellPrice = this.$store.state.selectedPrice;
    },
    currentCoin(val) {
      this.getBuySellInfo();
    },
    interval(val) {
      console.log(`第${val}次循环`);
      this.init();
    }
  },
  mounted() {}
};
</script>

<style lang = "less">
@import "goods.less";
</style>
