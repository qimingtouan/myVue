<template>
    <div class="deal_wrapper">
        <div  class="buy_area">
            <div class="canUse">
                <div class="cnaUse_left">可用 <span class="coin">{{canUse}} {{currentCoin.split("/")[0]}}</span></div>  
                <div class="cnaUse_right">可买<span class="coin">{{canBuy}} {{currentCoin.split("/")[0]}}</span></div>
            </div>
							<div class="form-subline">
								<label class="control-label" for="buyUnitPrice">
									<span class="buyDefaultLabel">买入价</span> ({{currentCoin.split("/")[0]}})
								</label>
								<div class="input-group">
									<input type="text" class="form-control bk-buy-form " v-model="buyPrice" name="buyUnitPrice">
								</div>
							</div>
							
							<div class="form-subline">
								<label class="control-label" for="buyNumber">买入量 ({{currentCoin.split("/")[0]}})</label>
								<div class="input-group">
									<input type="text" class="form-control bk-buy-form " v-model="buyNumber" name="buyNumber">
								</div>
							</div>

							<div class="range range_buy" id="buySlider">
								<el-slider v-model="buybar" @change="dragBar(buybar,0)"> </el-slider>
								<div class="el-slider__stop" style="left: 25%; top:16px"></div>
								<div class="el-slider__stop" style="left: 50%; top:16px"></div>
								<div class="el-slider__stop" style="left: 75%; top:16px"></div>
							</div>

							<div class="">
								<label class="control-label" for="realBuyAccount">预计交易额：<b class="text-buy" id="realBuyAccount">{{buyTrade}}</b> {{currentCoin.split("/")[1]}}</label>	
								
							</div>
      				<div>
                <button id="buyBtn" type="button" class="Abtn btn-primary btn-block " @click="buyFun">
                  立即买入
                </button>
					  	</div>
						</div>

            	<div class="sell_area">
                <div class="canUse">
                    <div>可用 <span>10</span>USDT </div>  <div>可买<span>{{canSell}}</span>BTC</div>
                </div>
                    <div class="form-subline">
                        <label class="control-label" for="sellUnitPrice">
                        <span class="sellDefaultLabel">卖出价</span> ({{currentCoin.split("/")[1]}})
                        </label>
                        <div class="input-group">
                            <input type="text" class="form-control form-second bk-sell-form" v-model="sellPrice">
                        </div>
                    </div>
                    
                    <div class="form-subline">
                        <label class="control-label" for="sellNumber">卖出量 ({{currentCoin.split("/")[0]}})</label>
                        <div class="input-group">
                            <input type="text" class="form-control form-second bk-sell-form" v-model="sellNumber" name="sellNumber">
                        </div>
                    </div>

                    <div class="range range_sell" id="sellSlider">
                    <el-slider v-model="sellbar" @change='dragBar(sellbar,1)'> </el-slider>
                    <div class="el-slider__stop" style="left: 25%; top:16px"></div>
                    <div class="el-slider__stop" style="left: 50%; top:16px"></div>
                    <div class="el-slider__stop" style="left: 75%; top:16px"></div>
                    </div>

                    <div class="">
                        <label class="control-label" for="realSellAccount">预计交易额：<b class="text-sell" id="realSellAccount">{{sellTrade}}</b> {{currentCoin.split("/")[1]}}</label>
                    </div>
                <div >
                  <button id="sellBtn" type="button" class="Abtn btn-second btn-block" @click="sellFun">
                    立即卖出
                  </button>
		</div>
        </div>




    </div>
</template>
<script>
import method from "@/assets/js/common_method.js";
export default {
  name: "transaction",
  data() {
    return {
      nav: ["时间", "方向", "价格", "数量"],
      title: "实时成交",
      canUse: "--",
      canSell: "--",
      canBuy:"--",
      sellPrice: "",
      buyPrice: "",
      sellNumber: "",
      selected_price: "",
      buyNumber: "",
      buybar: 0,
      sellbar: 0,
      canUseQuote: "--",
      canUseBase: "--",
    };
  },
  props: ["tradeData"],
  computed: {
    setPrice() {
      console.log(1);
      return this.$store.state.count;
    },
    isLogin(){
          return this.$store.state.isLogin;
    },
    currentCoin() {
      return this.$store.state.currentCoin;
    },
    nowprice(){
      return this.$store.state.nowprice;
    },
    buyTrade: {
      get() {
        if (this.isLogin) {
          if (this.buyPrice != "" && this.buyNumber != "") {
            return (this.buyPrice * this.buyNumber).toFixed(2);
          }
        }
        return "0.00";
      },
      set() {
        if (this.isLogin) {
          this.buyPrice = this.buyPrice.toString().replace(/[^\d|\.]/g, "");
          this.buyNumber = this.buyNumber.toString().replace(/[^\d|\.]/g, "");
          if (Number(this.buyNumber) > this.canUse) {
            this.buyNumber = this.canUse;
          }
          this.buybar = this.buyNumber / this.canUse * 100;
        }
      }
    },
    sellTrade: {
      get() {
        if (this.isLogin) {
          if (this.sellPrice != "" && this.sellNumber != "") {
            return (this.sellPrice * this.sellNumber).toFixed(2);
          }
        }
        return "0.00";
      },
      set() {
        if (this.isLogin) {
          this.sellPrice = this.sellPrice.toString().replace(/[^\d|\.]/g, "");
          this.sellNumber = this.sellNumber.toString().replace(/[^\d|\.]/g, "");
          if (Number(this.sellNumber) > this.canSell) {
            this.sellNumber = this.canSell;
          }
          this.sellbar = this.sellNumber / this.canSell * 100;
        }
      }
    }
  },
  watch: {
    // buyNumber(val, oldval) {
    //   if (Number(val) > this.canUse) {
    //     val = this.canUse;
    //     this.buyNumber = val;
    //   }
    //   this.buybar = val / this.canUse * 100;
    // },
    // sellNumber(val, oldval) {
    //   if (Number(val) > this.canSell) {
    //     val = this.canSell;
    //     this.sellNumber = val;
    //   }
    //   this.sellbar = val / this.canUse * 100;
    // },
    setPrice(val, oldval) {
      this.buy_price = this.$store.state.selectedPrice;
    }
  },
  methods: {
    getData() {
      this.$ajax
        .get("/wap/market/assest/" + this.currentCoin.toLowerCase())
        .then(res => {
          if (res.data.code <= 200) {
            this.canUseQuote = method.floorNumber(
              res.data.data.quote.available,
              6
            );
            this.canUseBase = method.floorNumber(
              res.data.data.base.available,
              6
            );
            this.canBuy = method.floorNumber(
              res.data.data.quote.available / this.nowprice,
              6
            );
            this.canSell = method.floorNumber(
              res.data.data.base.available * this.nowprice,
              6
            );
          }
        });
    },
    sellFun() {
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
          message: "请输入价格和数量。",
          type: "warning"
        });
        return;
      }
      this.$ajax
        .post("/web/api/market/order", data)
        .then(function(response) {
          if (response.data.code == 200) {
            alert("success");
          } else {
            alert(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    buyFun() {
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
          message: "请输入价格和数量。",
          type: "warning"
        });
        return;
      }
      this.$confirm(
        `您将买入 ${this.buyNumber} 个 ${data.coinName}, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$ajax
            .post("/web/api/market/order", data)
            .then(response => {
              console.log(response);
              if (response.data.code == 200) {
                this.$message({
                  showClose: true,
                  message: "买入成功！",
                  type: "success"
                });
              } else alert(response.data.msg);
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            showClose: false,
            message: "取消买入！",
            type: "info"
          });
        });
    },
    dragBar(val, type) {
      if (this.isLogin) {
        if (type == 0) {
          this.buyNumber = val / 10;
        } else {
          this.sellNumber = val / 10;
        }
      }
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    console.log(this);
  }
};
</script>

<style scoped lang="less">
@buyer-color :#FB5555;
@seller-color: #269253;
.form-subline .control-label {
  font-family: "Microsoft YaHei";
  margin-bottom: 4px;
  color: #6d7b82;
  position: absolute;
  left: 10px;
  top: 8px;
  z-index: 90;
}
.control-label {
  text-align: left;
  font-weight: normal;
  padding-top: 0;
  margin-bottom: 5px;
}

.form-subline {
  margin-bottom: 15px;
  position: relative;
}
.Abtn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  border: 0 none;
  outline: 0 none;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 44px;
  margin-top: 10px;
  max-width: 260px;
  border-radius: 5px;
}
.btn-primary {
  background: linear-gradient(to right, #fb5555, #ffb144);
}
.btn-second {
  background: linear-gradient(to right, #27ae60, #97e54b);
  color: #fff;
}
.range {
  width: 100%;
  height: 17px;
  margin: 20px 0 15px 0;
  background: none !important;
  position: relative;
}
.buy_area,
.sell_area {
  color: #666;
  width: 260px;
  padding: 10px;
  float: left;
}
.canUse {
  height: 20px;
  line-height: 20px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  .canUse_left {
    margin-right: 20px;
  }
}
.input-group input.form-control {
  background: #222432;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px !important;
  text-align: right;
  padding: 6px 12px;
  width: 240px;
}
.bk-buy-form {
  color: #fb5555;
  font-weight: bold;
}

.bk-sell-form {
  color: #269253;
  font-weight: bold;
}
.range_buy .el-slider__bar {
  background-color: #fb5555;
}
.range_sell .el-slider__bar {
  background-color: #269253;
}
.range .el-slider__runway {
  background-color: #666666;
}
.text-buy {
  color: #fb5555;
}
.text-sell {
  color: #269253;
}
</style>
