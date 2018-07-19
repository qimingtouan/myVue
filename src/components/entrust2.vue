<template>
<div class="bk-kMarket">
     <div class="bk-trans-form">
        <div class="bk-tabList">
                <div class="bk-tabList-hd clearfix">
                    <slot name="header"></slot>
                    <a class="pull-right" :href="'/views/record/record.html#'+currentCoin" target="_blank" role="button">更多<i class="fa fa-angle-right"></i></a>
                </div>
                <div class="bk-tabList-bd">
                    <div class="bk-entrust">
                            <table class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th v-for="item in title" :key="item.index" >
                                        <div class="">{{item}}</div>
                                     </th>
                                </tr>
                                </thead>
                                <tbody v-if="!isLogin">
                                    <tr >
                                        <td colspan="8">
                                            <div class="bk-norecord">
                                                <p class="notLogin"><i class="bk-ico info"></i>您还没有登录 
                                                </p>
                                                <div>
                                                    <a class="notLogin_btn" href="/views/login/login.html">登录</a> |<a class="notLogin_btn" href="/views/register/register.html">注册</a> 
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-if="isLogin" style="border-bottom:1px solid #eee">
                                    <tr v-for ="item in showData" v-if="showData.length>0" :key="item.index">
                                        <td>{{item.time}}</td>
                                        <td><div :class="[item.tradeType =='1'?buy_color:sell_color]"><img src="../assets/img/sell_01.png" alt="" v-if="item.tradeType =='2'" class="trade_img"><img src="../assets/img/buy_01.png" alt="" v-else class="trade_img"><span>{{item["amount/trade"]}}</span></div></td>
                                        <td><div :class="[item.tradeType =='1'?buy_color:sell_color]">{{item["price/average"]}}</div></td>
                                        <td>{{item.tradeMoney}}</td>
                                        <td>{{item.isFinish}}</td>
                                        <td>{{item.from}}</td>
                                        <td><a @click="showDetail(item.id)" v-if="item.status == '1'" :class="[item.tradeType =='1'?buy_color:sell_color]" role="button">明细</a><a v-if="item.status == '0'" :class="[item.tradeType =='1'?buy_color:sell_color]" role="button" @click="cancelTrade(item.id)">撤单</a></td>
                                        <td></td>
                                    </tr>
                                    <tr v-if="showData.length == 0">
                                        <td colspan="8">
                                            <div class="bk-norecord">
                                                <p class="notLogin"><i class="bk-ico info"></i>没有数据
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <el-dialog title="交易明细" :visible.sync="dialogTableVisible" center>
                <el-table :data="detailData">
                    <el-table-column property="time" label="成交时间" width="200"></el-table-column>
                    <el-table-column property="amount" :label="'成交数量'+currentCoin.split('/')[0]"></el-table-column>
                    <el-table-column property="price" :label="'成交价格'+currentCoin.split('/')[1]" ></el-table-column>
                    <el-table-column property="tradeMoney" :label="'成交额'+currentCoin.split('/')[1]"></el-table-column>
                    <el-table-column property="fees" :label="'费率'+currentCoin.split('/')[1]" width="120"></el-table-column>
                </el-table>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
                </span>
            </el-dialog>
	</div>
</div>

</template>
<script>
import formatTime from "@/assets/js/formatTime"
export default {
    name: "entrust",
    data() {
        return {
            isActive:[false,false,false],
            showData:[],
            status:["未成交","已成交"],
            isCancel:["已完成","已撤单"],
            detailData:[],
            dialogTableVisible:false,
            nowData:{},
            type:"0",
            buy_color:"buy_color",
            sell_color:"sell_color"
        };
    },
    props:["gettype"],
    computed: {
        interval(){
            return this.$store.state.time;
        },
        isLogin(){
            return this.$store.state.isLogin;
        },
        title(){
            let res = ["委托时间","委托数量/已成交","委托价格/成交均价","成交总额"+this.currentCoin.split("/")[1],"状态","订单来源","操作"];
            return res
        },
        currentCoin(){
           return this.$store.state.currentCoin;
        } ,    
        userId(){
            return this.$store.state.userId;
        }
            
    },
    methods: {
        changeData(type){
            this.isActive = [false,false,false];
            this.isActive[type] = true;
            this.type = type
            let url;
            let currentCoin = this.currentCoin.toLowerCase();
            switch(type){
                case "0":
                    url = "/wap/market/getOrderAll/"+currentCoin+"/0/0";
                break;
                case "1":
                    url = "/wap/market/getOrderAll/"+currentCoin+"/0/1";
                break;
                default :
                    url = "/wap/market/getOrderAll/"+currentCoin+"/0/0";      
            }
            if(!this.isLogin){
                console.log(`未登录，不发请求; url:${url}`)
                return 
            }
            this.$ajax.get(url).then(function(res){
                console.log(res.data.data)
                let showData = [],historyData = [];
                if(res.data.code <= 200 && res.data.data){
                    for(let i = 0 ; i < res.data.data.length;i++){
                        let temp = {},item = res.data.data[i];
                        //status = 1;交易完成->已成交(type =1)，已撤单(type = 2
                        temp.time =formatTime(new Date(item.time*1000));
                        temp["amount/trade"] = item.totalAmount+"/"+item.tradeAmount;
                        temp["price/average"] = item.tradeAmount == 0?item.price+"/"+0:item.price+"/"+item.getPrice/item.tradeAmount;
                        temp.tradeMoney = item.getPrice;
                        temp.from = item.sources;
                        temp.tradeType = item.tradeType;
                        temp.id = item.id;
                        temp.status = item.status;
                        if(item.status == 1 ){
                            temp.isFinish = this.isCancel[item.type - 1];
                            historyData.push(temp);
                        }else{
                            temp.isFinish = "未完成";
                            showData.push(temp);
                        }
                    }
                }
                type == '1'? this.showData = historyData:this.showData = showData;
            }.bind(this)).catch((res) => {
                console.log(res.data.msg)
            })
            
        },
        showDetail(id,type){
            console.log(window.location.hash)
            this.dialogTableVisible = true;
            let url = "/wap/market/orderDetails/"+id;
            this.$ajax.get(url).then(function(res){
                let detailData = [];
                if(res.data.code <= 200){
                    detailData = res.data.data.map(function(item){
                        let temp = {};
                        temp.time = item.time;
                        temp.amount = item.amount;
                        temp.price = item.price;
                        temp.tradeMoney = item.vol;
                        temp.fees = item.fee;
                        return temp;
                    })
                }
                this.detailData = detailData;
            }.bind(this))
        },
        cancelTrade(orderid){
            let url = `/wap/market/cancel/${orderid}`
            this.$confirm('此操作将撤销未成交的部分, 是否继续?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$ajax.get(url).then(function(res){
                    let detailData = [];
                    if(res.data.code <= 200){
                        this.$message({
                            type: 'success',
                            message: '撤销成功!'
                        });
                        this.refresh()
                    }
                    this.detailData = detailData;
                }.bind(this))  
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消撤销，再考虑一下。'
                });          
            });  
        },
        refresh(){
            this.changeData(this.type);
        }

    },
    watch:{
        currentCoin(val,old){
            this.changeData(this.type);
        },
        interval(val){
            this.changeData(this.type);
        }
    },
    created() {
       this.type = this.gettype||"0";
       this.changeData(this.type);
    },
    mounted() {

    }
};
</script>

<style scoped lang="less">
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
.bk-kMarket {
    height: 428px;
    overflow: hidden;
    background-color:#fff;
    margin-top: 0px;
    border-top: 0 none;
}

.bk-kMarket .bk-trans-form {
    padding-bottom: 20px;
    padding-top: 0;
    background-color: transparent;
    border-bottom: 0
}

.bk-kMarket .bk-entrust .bk-norecord {
    background-color: transparent!important;
    margin: 0!important
}

.bk-kMarket .table thead tr th {
    color: #666;
    background-color: transparent;
    height: auto;
    font-weight: 400;
}

.bk-kMarket .table tbody tr td {
    color: #6d7b82
}

.bk-kMarket .table-bordered,.bk-kMarket .table-bordered>tbody>tr>td,.bk-kMarket .table-bordered>tbody>tr>th,.bk-kMarket .table-bordered>tfoot>tr>td,.bk-kMarket .table-bordered>tfoot>tr>th,.bk-kMarket .table-bordered>thead>tr>td,.bk-kMarket .table-bordered>thead>tr>th {
    border: 1px solid transparent
}

.bk-kMarket .table-bordered>thead>tr>td,.bk-kMarket .table-bordered>thead>tr>th {
    border-bottom: 1px solid #E6E6E6;
    height: 60px;
    font-size: 14px;
    line-height: 14px;
    text-align: center;

}

.bk-kMarket .table-striped>tbody>tr:nth-of-type(even) {
    background-color: #fff;
}

.bk-kMarket .table-striped>tbody>tr:nth-of-type(odd) {
    background-color: #fafafa;
}

.bk-kMarket .table-hover>tbody>tr {
    -ms-transition: all .2s linear;
    -moz-transition: all .2s linear;
    -webkit-transition: all .2s linear;
    -o-transition: all .2s linear;
    transition: all .2s linear
}

.bk-kMarket .table-hover>tbody>tr:hover {
    background-color: #eee;
}

.bk-kMarket .table-hover>tbody>tr:last-child>td {
    border-bottom: 0
}

.bk-kMarket .bk-entrust .table tbody td {
    height: auto;
}

.bk-kMarket .bk-tabList {
    margin: 0 auto;
    width: 100%;
    overflow-x: auto;
    font-size: 12px;
    vertical-align: top;
}

.bk-kMarket .bk-tabList-hd a.pull-right {
    margin-right:25px;
    font-size: 16px;
    color: #fff;
    line-height: 52px;
}


.bk-kMarket .bk-tabList-hd .btn-group .btn {
    border-bottom: 0;
    margin: 0 10px 0 0;
    font-size: 16px;
    min-width: 100px;
    padding:10px 28px;
    height: 50px;
    line-height: 30px;
    color: #333;
    background-color: #fff;
}
.bk-kMarket .bk-tabList-hd .btn-group .Abtn {
    display: block;
    border-bottom: 0;
    margin: 0 10px 0 0;
    font-size: 16px;
    min-width: 100px;
    padding:10px 28px;
    height: 50px;
    line-height: 30px;
    color: #fff;
    background-color: #4353D0;
}

.bk-kMarket .btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle) {
    border-radius: 0
}

.bk-kMarket .bk-tabList-hd .btn-group .btn.active:before,.bk-kMarket .bk-tabList-hd .btn-group .btn:hover:before,.bk-kMarket .bk-tabList-hd .btn-group .btn:focus:before {
    display: none
}

@media(max-width: 768px) {
    .bk-kMarket .bk-btn-group.btn-group {
        display:table;
        table-layout: fixed;
        width: 100%
    }

    .bk-kMarket .bk-btn-group.btn-group .btn {
        font-size: 12px;
        float: none;
        display: table-cell;
        min-width: 1%
    }
}

.bk-kMarket .bk-tabList-hd {
    border-top:1px solid #E6E6E6;
    border-bottom:1px solid #E6E6E6;
    text-align: left;
    background: #4353D0;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    
}

.btn-group .btn {
    color: #6d7b82;
    background-color: #2f2c2c
}
.btn-group .selected{
    color: #fff;
    background-color:@buyer-color;
}
// .bk-kMarket .bk-tabList-hd .btn-group .btn.active,.bk-kMarket .bk-tabList-hd .btn-group .btn:hover,.bk-kMarket .bk-tabList-hd .btn-group .btn:focus {
//     color: #fff;
//     background-color: #de211d
// }

// .bk-kMarket .bk-tabList-hd .btn-group .btn.active:before,.bk-kMarket .bk-tabList-hd .btn-group .btn:hover:before,.bk-kMarket .bk-tabList-hd .btn-group .btn:focus:before {
//     background-color: #fa290f
// }
.bk-norecord {
    min-height: 100px;
    padding: 100px 0;
    line-height: 2em;
    background-color: #fdfdfd;
    text-align: center;
    color: #6d7b82
}
.notLogin{
    font-size: 12px;
    color: #666;
    margin-bottom: 0;
}
.notLogin_btn{
    color:#4353D0; 
    margin:0 5px;
    font-size:16px;
    cursor: pointer;
}
.trade_img{
    margin-top: -3px;
    margin-right: 5px;
}
</style>
