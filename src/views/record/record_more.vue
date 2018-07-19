<template>
<div class="wrapper">
	<header>
		<div class="header_img">
		<header-nav :activeItem = 'activeItem'></header-nav>
		</div>
	</header>
    <section >
        <div class="moveup">
        <div class="container">
         <div class="bk-band clearfix" >
            <tab-nav></tab-nav>
		</div>
            <div class="bk-tabList">
                <div class="nowcoin-show">
                    <span>当前交易对：<b>{{currentCoin}}</b></span>
                    <div style="display:inline-block;margin-left:50px">
                       <button @click="onBack" class="back_btn">返回交易</button>
                    </div>
                </div>
                <div class="search_more">
                    <el-form :inline="true" :model="searchInfo" size="small" class="border_line">
                        <div class="btn_choose">
                            <span class="btn_entrust" :class="{activeBtn:btnIsActive[0]}" @click="changeTab(0)">限价委托</span>
                            <span class="btn_entrust" :class="{activeBtn:btnIsActive[1]}" @click="changeTab(1)">历史委托</span>
                        </div>
                        <el-form-item label="时间">
                            <el-date-picker
                                v-model="searchInfo.time"
                                type="daterange"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions" >
                            </el-date-picker>
                        </el-form-item>
                            <el-form-item label="交易状态">
                                <!-- <el-select v-model="searchInfo.status"  class="entrust_input">
                                    <el-option label="不限" value="0"></el-option>
                                    <el-option label="完成" value="1"></el-option>
                                    <el-option label="未完成" value="3"></el-option>
                                    <el-option label="已撤单" value="2"></el-option>
                                </el-select> -->
                            </el-form-item>
                            <el-form-item label="交易类型">
                                <el-select v-model="searchInfo.trade"  class="trade_input">
                                    <el-option label="不限" value="0"></el-option>
                                    <el-option label="买入" value="1"></el-option>
                                    <el-option label="卖出" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button  @click="onReset" icon="el-icon-refresh">重置</el-button>
                            </el-form-item>
                    </el-form>            
            <el-table :data="tableData" style="width: 100%" @expand-change = "expandChange" ref="tableList" height="600px" row-key="id" :expand-row-keys="expandRows">
                <el-table-column type="expand">
                <template slot-scope="props">
                        <el-table
                            :data="detailData"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="date"
                            label="成交时间"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="amount"
                            label="成交数量"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="price"
                            label="成交价格">
                            </el-table-column>
                            <el-table-column
                            prop="tradeMoney"
                            label="成交总额">
                             </el-table-column>
                            <el-table-column
                            prop="fees"
                            label="手续费">
                            </el-table-column>
                        </el-table>          
                </template>
                </el-table-column>
                <el-table-column label="委托时间" prop="time">
                </el-table-column>
                <el-table-column label="委托数量/已成交" prop="amount_trade">
                <template slot-scope="scope">
                 <div :class="[scope.row.tradeType =='1'?buy_color:sell_color]"><img src="../../assets/img/sell_01.png" alt="" v-if="scope.row.tradeType =='2'" class="trade_img"><img src="../../assets/img/buy_01.png" alt="" v-else class="trade_img"><span>{{scope.row["amount_trade"]}}</span></div>
                </template>
                </el-table-column>
                <el-table-column label="委托价格/成交均价" prop="price_average">

                </el-table-column>
                <el-table-column label="成交总额" prop="tradeMoney">
                </el-table-column>
               <el-table-column label="状态" prop="isFinish">
                </el-table-column>
                <el-table-column label="订单来源" prop="from">
                </el-table-column>
                <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="showDetail(scope.row.id)" type="text" size="small" v-if="scope.row.status == '1'" :class="[scope.row.tradeType =='1'?buy_color:sell_color]">明细</el-button>
                    <el-button type="text" size="small" v-if="scope.row.status == '0'" :class="[scope.row.tradeType =='1'?buy_color:sell_color]"  @click="cancelTrade(scope.row.id)">撤单</el-button>
                </template>
                </el-table-column>
                <div slot="empty">
                    <div class="bk-norecord" v-if="!isLogin">
                        <p class="notLogin"><i class="bk-ico info"></i>您还没有登录 
                        </p>
                        <div>
                            <a class="notLogin_btn" href="/views/login/login.html">登录</a> |<a class="notLogin_btn" href="/views/register/register.html">注册</a> 
                        </div>
                    </div>
                    <div class="bk-norecord" v-if="tableData.length == 0 && isLogin">
                        <p class="notLogin"><i class="bk-ico info"></i>暂时没有相关记录 
                        </p>
                    </div>
                </div>
            </el-table>
            </div>
        </div>
    </div>
    <div style="margin-top:40px">
        <footer-nav></footer-nav>
    </div>
        
    </div>

</section>
</div>
</template>
<script>
import tabNav from "@/components/tabNav";
import footerNav from "@/components/footerNav";
import formatTime from "@/assets/js/formatTime";
import headerNav from "@/components/trade_header.vue";
export default {
  name: "more",
  components: { tabNav, footerNav,headerNav },
  data() {
    return {
      btnIsActive: [true, false],
      searchInfo: {
        time: [],
        trade: "0",
        status: "0",
        base: "",
        qoute: ""
      },
      activeItem:[false,false,true,false],
      expandRows: [],
      status: ["未成交", "已成交"],
      isCancel: ["已完成", "已撤单"],
      buy_color: "buy_color",
      sell_color: "sell_color",
      showData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      detailData: []
    };
  },
  props: [],
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    currentCoin() {
      return this.$store.state.currentCoin;
    },
    tableData() {
      let showData = JSON.parse(JSON.stringify(this.showData));
      showData = showData.filter(item => {
        let flag = true;
        if (this.searchInfo.status != 0) {
          flag = item.isFinish == this.searchInfo.status;
        }
        if (this.searchInfo.time.length != 0) {
          flag =
            item.time <= this.searchInfo.time[1].getTime() &&
            item.time >= this.searchInfo.time[0].getTime();
        }
        if (this.searchInfo.trade != 0) {
          flag = flag && item.tradeType == this.searchInfo.trade;
        }
        item.time = formatTime(new Date(item.time));
        return flag;
      });
      console.log(this.searchInfo);

      return showData;
    }
  },
  methods: {
    expandChange(row, expandRows) {
      console.log(row);
      // if(expandRows.length>1){
      //     expandRows.forEach((element,index) => {
      //         if(index < expandRows.length - 1){
      //             this.$refs.tableList.toggleRowExpansion(element,false)
      //         }
      //     });
      // }
      this.showDetail(row.id);
    },
    showDetail(id) {
      if (this.expandRows.indexOf(id) < 0) {
        this.expandRows = [];
        this.expandRows.push(id);
      } else {
        this.expandRows = [];
      }
      let url = "/wap/market/orderDetails/" + id;
      this.$ajax.get(url).then(
        function(res) {
          let detailData = [];
          if (res.data.code <= 200) {
            detailData = res.data.data.map(function(item) {
              let temp = {};
              temp.date = item.time;
              temp.amount = item.amount;
              temp.price = item.price;
              temp.tradeMoney = item.vol;
              temp.fees = item.fee;
              return temp;
            });
          }
          this.detailData = detailData;
        }.bind(this)
      );
    },
    cancelTrade(orderid) {
      let url = `/wap/market/cancel/${orderid}`;
      this.$confirm("此操作将撤销未成交的部分, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$ajax.get(url).then(
            function(res) {
              let detailData = [];
              if (res.data.code <= 200) {
                this.$message({
                  type: "success",
                  message: "撤销成功!"
                });
                // this.refresh()
              }
              this.detailData = detailData;
            }.bind(this)
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消撤销，再考虑一下。"
          });
        });
    },
    onReset(){
        this.searchInfo.status = "0";
        this.searchInfo.time = [];
        this.searchInfo.trade = "0";
    },
    onBack(){
        let url = "/views/goods/goods_trade.html#"+this.currentCoin
        window.location.href = url;
    },
    getData(index) {
      let url = "/wap/market/getOrderAll/" + this.currentCoin+"/0/"+index;
      if(!this.isLogin){
          console.log(`未登录，不发请求.url:${url}`)
          return
      }
      this.$ajax.get(url).then(
        function(res) {
          console.log(res.data.data);
          let showData = [];
          if (res.data.code <= 200 && res.data.data) {
            for (let i = 0; i < res.data.data.length; i++) {
              let temp = {},
                item = res.data.data[i];
              //status = 1;交易完成->已成交(type =1)，已撤单(type = 2
              temp.time = item.time * 1000;
              temp["amount_trade"] = item.totalAmount + "/" + item.tradeAmount;
              temp["price_average"] =
                item.tradeAmount == 0
                  ? item.price + "/" + 0
                  : item.price + "/" + item.getPrice / item.tradeAmount;
              temp.tradeMoney = item.getPrice;
              temp.from = item.sources;
              temp.tradeType = item.tradeType;
              temp.id = item.id;
              temp.status = item.status;
              if (item.status == "1") {
                temp.isFinish = item.type;
              } else {
                temp.isFinish = 3;
              }
              showData.push(temp);
            }
            this.showData = showData;
          }
        }.bind(this)
      );
    },
    changeTab(index){
        this.btnIsActive = [false,false];
        this.btnIsActive[index] = true;
        this.getData(index)
    }
  },
  watch: {},
  created() {
    this.$store.commit("checkLogin");
    this.getData(0);
  },
  mounted() {}
};
</script>

<style  lang="less">
@buyer-color :#FB5555;
@seller-color:#27AE60;
@dark-color:#1f1d1d;
@dark-btn:#2f2c2c;
@light-color:#fff;
.buy_color{
    color: #FB5555;
}
.sell_color{
    color: @seller-color;
}
a {
  text-decoration: none;
  color: #fff;
  &:hover {
    text-decoration: none;
  }
}

.wrapper {
  background-color: #f5f5f5;
}
.moveup {
  top: 116px;
  border-radius: 10px;
  position: relative;
}
.bk-band {
  position: relative;
}
.bk-tabList {
  background-color: #fff;
  margin-top: 40px;
}
.search_more {
  padding: 10px;
}
.nowcoin-show {
  text-align: left;
  font-size: 14px;
  padding: 10px 40px 50px 40px;
  color: #666;
}

.nowcoin-show b {
  font-size: 18px;
  font-weight: bold;
  color: #e00;
  text-transform: uppercase;
}

.hide {
  display: none !important;
}

.regbtn {
  position: relative;
}
.btn_choose {
  position: relative;
  top: 0;
  display: inline-block;
  margin-right: 20px;
  span{
      cursor: pointer
  }
}
.btn_entrust {
  background-color: #f5f5f5;
  display: inline-block;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  color: #4353d0;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
}
.activeBtn {
  color: #fff;
  background-color: #4353d0;
}
.entrust_input,
.trade_input {
  width: 110px;
}
.border_line {
  border-bottom: 1px solid #ddd;
}
.coin_input {
  width: 60px;
}
.roof {
  height: 80px;
  line-height: 80px;
  background: rgba(0, 0, 0, 0.1);
}
header {
  background: linear-gradient(to bottom, #3a4ac6, #586af4);
  position: absolute;
  width: 100%;
}
.header_img {
  height: 520px;
  position: relative;
  background-repeat: no-repeat;
  background-image: url(./../../assets/img/pic_01.png);
  background-position: 90% center;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0;
}
.el-form--inline .el-form-item {
  vertical-align: unset;
}
.el-form--inline .el-form-item__content {
  vertical-align: unset;
}
.bk-norecord a{
    color: #4353d0
}
.back_btn{
    width: 90px;
    height: 40px;
    background-color: #FFB72B;
    border: 0 none;
    color: #A87614;
    border-radius: 5px;
    font-size: 14px;
    &:hover{
        color: #fff;
    }
}
.trade_img{
    margin-top: -3px;
    margin-right: 5px;
}
</style>
