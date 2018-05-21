<template>
    <div class="deal_wrapper">
        <div class="buy">
            <h3>买入</h3>
            <div class="canUse">
                <span class="trade_left">可用:
                    <span class="coin">10 BTC</span>
                </span>
                <span class="trade_right">可买:
                    <span class="coin">10 BTC</span>
                </span>
            </div>
            <div>
                <p style="color:#6d7b82;">
                    <label>
                        买入价:
                        <input type="text" placeholder="" class="input_price" v-model="buy_price">
                    </label>
                    <div class="buyprice-cny" id="computedbuyPrice">≈ ￥5.45</div>
                </p>
                <p>
                    <label>
                        买入量:
                        <input type="text" placeholder="" class="input_amount" v-model="buy_amount">
                    </label>
                </p>
            </div>
            <div class="range_wrap" tabindex="0" @click="showProgress" ref="progressbar">
                <div class="range_paths_wrap">
                    <div class="range_path"></div>
                </div>
                <div class="range_track_wrap">
                    <div class="range_track" :style="{width: range_width}"></div>
                    <div class="range_handle" :style="{left: range_width}"></div>
                </div>
                <div class="range_points_wrap">
                    <div class="range_point" :class="{active:isActive[0]}" data-point-ratio="0" style="left: 0%;"></div>
                    <div class="range_point" :class="{active:isActive[1]}" data-point-ratio="25" style="left: 25%;"></div>
                    <div class="range_point" :class="{active:isActive[2]}"  data-point-ratio="50" style="left: 50%;"></div>
                    <div class="range_point" :class="{active:isActive[3]}" data-point-ratio="75" style="left: 75%;"></div>
                    <div class="range_point" :class="{active:isActive[4]}" data-point-ratio="100" style="left: 100%;"></div>
                </div>

            </div>
                <div class=" has-feedback">
                    <label class="control-label" for="realBuyAccount" style="position:static;">预计交易额：
                        <b class="text-primary" id="realBuyAccount">0.00</b> QC</label>
                </div>
                <div class="btn_buy">
                    <button id="buyBtn" type="button" data-loading-text="Loading..." class="btn btn-primary btn-block btn-hg" @click="buyFun">
                        
                        <i class="bk-ico buycart"></i>立即买入
                    </button>
                </div>
        </div>
        <div class="line"></div>
        <div class="sell">
                <h3>卖出</h3>
                <div class="canUse">
                    <span class="trade_left">可用:
                        <span class="coin">10 BTC</span>
                    </span>
                    <span class="trade_right">可买:
                        <span class="coin">10 BTC</span>
                    </span>
                </div>
                <div>
                    <p>
                        <label>
                            卖出价:
                            <input type="text" placeholder="" class="input_price" v-model="sell_price">
                        </label>
                        <div class="buyprice-cny" id="computedbuyPrice">≈ ￥5.45</div>
                    </p>
                    <p>
                        <label>
                            卖出量:
                            <input type="text" placeholder="" class="input_amount" v-model="sell_amount">
                        </label>
                    </p>
                </div>
                <div class="range_wrap" data-ratio="75" tabindex="0">
                    <div class="range_paths_wrap">
                        <div class="range_path"></div>
                    </div>
                    <div class="range_track_wrap">
                        <div class="range_track"></div>
                        <div class="range_handle"></div>
                    </div>
                    <div class="range_points_wrap">
                        <div class="range_point" :class="{active:isActive[0]}" style="left: 0%;" ></div>
                        <div class="range_point" :class="{active:isActive[1]}" data-point-ratio="25" style="left: 25%;" ></div>
                        <div class="range_point" :class="{active:isActive[2]}"  data-point-ratio="50" style="left: 50%;" ></div>
                        <div class="range_point" :class="{active:isActive[3]}" data-point-ratio="75" style="left: 75%;" ></div>
                        <div class="range_point" :class="{active:isActive[4]}" data-point-ratio="100" style="left: 100%;" ></div>
                    </div>
                    <div class=" has-feedback">
                        <label class="control-label" for="realBuyAccount" style="position:static;">预计交易额：
                            <b class="text-primary" id="realBuyAccount">0.00</b> QC</label>
                    </div>
                    <div class="btn_buy">
                        <button id="buyBtn" type="button" data-loading-text="Loading..." class="btn btn-second  btn-block btn-hg" @click="sellFun">
                            <i class="bk-ico buycart"></i>立即卖出
                        </button>
                    </div>
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
      base:"zb",
      quote:"qc",
      sell_price:"",
      sell_amount:"",
      buy_price:"",
      buy_amount:"",
      bar:1,
      isActive:[false,false,false,false,false]
    };
  },
  props: ["tradeData"],
  computed: {
      range_width:{
        get: function () {
            return this.bar;
        },
        set: function (newValue) {
            this.bar = newValue
        }
      }
    
  },
  methods: {
     showProgress(evt){
         console.log(evt.target.className)
         if(evt.target.className == "range_point" || evt.target.className == "range_point active"){
             this.range_width = evt.target.dataset.pointRatio +"%";
         }else if(evt.target.className == "range_wrap"|| evt.target.className == "range_track" || evt.target.className == "range_path"){
            this.range_width = (evt.offsetX/2.5)+"%";    
         }
         let temp = this.range_width.substr(0,this.range_width.length-1);
         this.buy_amount = 10*temp/100;
         this.isActive = this.isActive.map(function(val,index){
            if(index < Math.floor(temp/25)+1){
                val = true;
            }else{
                val = false;
            }
            return val
        })
     },
      sellFun(){
        let data= {
            "baseCurrency": this.base,
            "price": this.sell_price,
            "quoteCurrency": this.quote,
            "totalMoney": this.sell_price*this.sell_amount,
            "type": 0,
            "userId": 0
        };
        this.$ajax.post('/trade/api/market/sale', data).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    },
    buyFun(){
            let data= {
            "baseCurrency": this.base,
            "price": this.buy_price,
            "quoteCurrency": this.quote,
            "totalMoney": this.buy_price*this.buy_amount,
            "type": 0,
            "userId": 0
        };
        this.$ajax.post('/trade/api/market/buy', data).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    }
  },
  created() {
  },
  mounted() {
      console.log(this)
  }
};
</script>

<style scoped lang="less">
@buyer-color :#de211d;
@seller-color: #0ebb74;
        .deal_wrapper {
            width: 300px;
            padding: 0 20px;
            background-color: #f1f1f1;
        //    height: 979px;
        }

        .deal_wrapper h3 {
            text-align: center;
            color: #333;
            padding:20px 0 20px 0 ;
            margin: 0;
        }

        .canUse {
            line-height: 40px;
            font-size: 14px;
            color: #333;
            margin-right: 24px;
            height: 40px;
        }

        .trade_left {
            float: left;

        }

        .trade_right {
            float: right;
        }

        .range_wrap {
            -moz-user-select: -moz-none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            outline: 0;
            cursor: pointer;
            padding: 7px 0 8px;
            width: 250px;
        }

        .range_wrap .range_paths_wrap {
            position: relative;
            z-index: 1
        }

        .range_wrap .range_path {
            position: absolute;
            left: 0;
            top: 0;
            height: 2px;
            width: 100%;
            background: #ccc;
            transition: all .05s;
            -moz-transition: all .05s;
            -webkit-transition: all .05s;
            -o-transition: all .05s
        }

        .range_wrap .range_track_wrap {
            position: relative
        }

        .range_wrap .range_track {
            z-index: 2;
            position: absolute;
            left: 0;
            top: 0;
            height: 2px;
            width: 0;
            background: #090;
            transition: all .05s;
            -moz-transition: all .05s;
            -webkit-transition: all .05s;
            -o-transition: all .05s
        }

        .range_wrap .range_handle {
            position: absolute;
            width: 14px;
            height: 14px;
            border: 1px solid #ccc;
            background: #FFF;
            border-radius: 50%;
            top: -7px;
            z-index: 4;
            margin-left: -4px;
            cursor: col-resize;
            cursor: -webkit-grab;
            transition: left .05s;
            -moz-transition: left .05s;
            -webkit-transition: left .05s;
            -o-transition: left .05s;
        }

        .range_wrap .range_points_wrap {
            position: relative;
            top: -3px
        }

        .range_wrap .range_point {
            z-index: 3;
            position: absolute;
            top: 0;
            left: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin: -4px 0 0 -4px;
            text-align: center
        }

        .range_wrap .range_point:after {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #ccc;
            border-radius: 50%;
            vertical-align: top;
            margin-top: 4px
        }

        .range_wrap .range_point:hover:after {
            width: 16px;
            height: 16px;
            margin-top: 0;
            transition: all .05s;
            -moz-transition: all .05s;
            -webkit-transition: all .05s;
            -o-transition: all .05s
        }

        .range_wrap .range_point.active:after {
            background: #090
        }

        .range_wrap.click {
            cursor: -webkit-grabbing
        }

        .range_wrap.click .range_handle {
            cursor: -webkit-grabbing
        }

        .range_wrap.focus .range_handle {
            border-color: #090
        }

        .range_wrap .range_handle {
            background: #fff;
            border-color: #d6d2d2
        }

        .range_wrap .range_point:after {
            background: #d5d5d5
        }

        .range_wrap .range_path {
            background: #d5d5d5
        }

        .control-label {
            display: block;
            font-family: "Microsoft YaHei";
            margin-bottom: 4px;
            color: #6d7b82;
            padding: 20px 0;
        }
        .btn-block {
            display: block;
            width: 100%
        }

        .btn-block+.btn-block {
            margin-top: 5px
        }

        .btn.btn-hg {
            height: auto;
            font-size: 18px;

            line-height: 30px;
            border-radius: 5px
        }

        .btn-primary {
            background-color: #de211d;
            border-color: #de211d;
            color: #FFF;
        }
        .btn-second {
            background-color: #3dc18e;
            border-color: #3dc18e;
            color: #fff
        }

        label {
            font-size: 16px;
            color: #666;
        }

        .input_price, .input_amount {

            width: 200px;
            height: 36px;
            line-height: 36px;
            border: solid #e5e5e5 1px;
            border-radius: 4px;
            font-size: 14px;
            color: #999;
            padding-left: 20px;
        }

        .btn_buy {
            margin: 60px 10px;
            
        }
        .line{
            widows: 100%;
            border: 1px dashed #ddd;
            margin-right: 24px;
        }
        .buyprice-cny,.sellprice-cny {
    margin-top: -10px;
    text-align: right;
    margin-right: 15px;
    color: #666;
    margin-bottom: 10px
}
</style>
