<template>
<div class="bk-kMarket" :style="{background:'#fff'}">
     <div class="bk-trans-form">
        <div class="bk-tabList">
                <div class="bk-tabList-hd clearfix">
                    <slot name="header"></slot>
                    <a class="pull-right" href="/views/record/record.html" target="_blank" role="button"><i class="fa fa-calendar fa-fw"></i>更多记录</a>
                </div>
                <div class="bk-tabList-bd">
                    <div class="bk-entrust">
                            <table class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th v-for="item in title" :key="item.index" >{{item}}</th>
                                </tr>
                                </thead>
                                <tbody >
                                    <tr v-if="!isLogin">
                                        <td colspan="8">
                                            <div class="bk-norecord">
                                                <p class="notLogin"><i class="bk-ico info"></i>您还没有登录 
                                                </p>
                                                <div>
                                                    <a style="color:#4353D0; margin:0 5px;font-size:16px" href="https://vip.zb.com/user/login">登录</a> |<a style="color:#4353D0; margin:0 5px;font-size:16px" href="">注册</a> 
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-for ="item in showData.depthAsks" v-if="isLogin" :key="item.index">
                                        <td>{{item.time}}</td>
                                        <td>{{item["amount/trade"]}}</td>
                                        <td>{{item["price/average"]}}</td>
                                        <td>{{item.tradeMoney}}</td>
                                        <td>{{item.status}}</td>
                                        <td>{{item.from}}</td>
                                        <td v-if="type !='2'"><a @click="showDetail(item.askId,'ask')">明细</a><a style="margin-left:15px;color:#0ebb74" role="button" @click="cancelTrade(item.askId,true)">撤单</a></td>
                                    </tr>
                                    <tr v-for ="item in showData.depthBids" v-if="isLogin" :key="item.index">
                                        <td>{{item.time}}</td>
                                        <td>{{item["amount/trade"]}}</td>
                                        <td>{{item["price/average"]}}</td>
                                        <td>{{item.tradeMoney}}</td>
                                        <td>{{item.status}}</td>
                                        <td>{{item.from}}</td>
                                        <td v-if="type != '2'"><a class="detail" @click="showDetail(item.bidId,'bid')">明细</a><a class="cancel" style="margin-left:15px;color:#de211d" role="button"  @click="cancelTrade(item.bidId,false)">撤单</a></td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <el-dialog title="交易明细" :visible.sync="dialogTableVisible" center>
                <el-table :data="detailData">
                    <el-table-column property="time" label="成交数量(ZB)" width="200"></el-table-column>
                    <el-table-column property="amount" label="成交数量(ZB)"></el-table-column>
                    <el-table-column property="price" label="成交价格(QC)" ></el-table-column>
                    <el-table-column property="tradeMoney" label="成交额(QC)"></el-table-column>
                    <el-table-column property="fees" label="费率(QC)" width="120"></el-table-column>
                </el-table>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
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
            showData:{},
            isLogin:true,
            status:["未成交","部分成交","撤销成功","全部成交"],
            detailData:[],
            dialogTableVisible:false,
            nowData:{},
            historyData:{},
            type:"0"
        };
    },
    props:["gettype"],
    computed: {
        title(){
            let res = ["委托时间","委托数量/已成交","委托价格/成交均价","成交总额(QC)","状态","订单来源","操作"];
            res = this.type == 1?["委托时间","委托量","触发价格","委托价格","真实触发价格","状态","订单来源","操作"]:res;
            
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
                    url = "/trade/api/market/price/now/"+currentCoin+"/"+this.userId;
                break;
                case "1":
                    url = "/trade/api/market/price/now/"+currentCoin+"/"+this.userId;
                break;
                case "2":
                    url = "/trade/api/market/order/"+this.userId+"/"+currentCoin;
                break; 
                default :
                    url = "/trade/api/market/price/now/"+currentCoin+"/"+this.userId;      
            }
            this.$ajax.get(url).then(function(res){
                console.log(res.data.data)
                let showData = {};
                if(res.data.code == 0){
                    showData.depthAsks = res.data.data.depthAsks.map(item =>{
                        let temp = {};
                        temp.time =formatTime(new Date(item.createdAt));
                        temp["amount/trade"] = item.totalAmount+"/"+item.tradeAmount;
                        temp["price/average"] = item.tradeAmount == 0?item.price+"/"+0:item.price+"/"+item.tradeMoney/item.tradeAmount;
                        temp.tradeMoney = item.tradeMoney;
                        temp.status = this.status[item.askStatus];
                        temp.from = item.source;
                        temp.askId = item.askId;
                        return temp;
                    })
                   
                    showData.depthBids = res.data.data.depthBids.map(item =>{
                        let temp = {};
                        temp.time = formatTime(new Date(item.createdAt));
                        temp["amount/trade"] = item.totalMoney/item.price+"/"+item.tradeAmount;
                        temp["price/average"] = item.tradeAmount == 0?item.price+"/"+0:item.price+"/"+item.tradeMoney/item.tradeAmount;
                        temp.tradeMoney = item.tradeMoney;
                        temp.status = this.status[item.bidStatus];
                        temp.from = item.source;
                        temp.bidId = item.bidId;
                        return temp;
                    })
                }
                this.showData = showData;
            }.bind(this))
            
        },
        showDetail(id,type){
            console.log(window.location.hash)
            this.dialogTableVisible = true;
            let url = "/trade/api/market/price/"+this.currentCoin.toLowerCase()+"/"+this.userId
            this.$ajax.get(url).then(function(res){
                let detailData = [];
                if(res.data.code == 0){
                    detailData = res.data.data.map(function(item){
                        let temp = {};
                        temp.time = formatTime(new Date(item.time));
                        temp.amount = item.tradeAmount;
                        temp.price = item.price;
                        temp.tradeMoney = item.tradeMoney;
                        temp.fees = type =="ask"?item.fees_ask:item.fees_bid;
                        return temp;
                    })
                }
                this.detailData = detailData;
            }.bind(this))
        },
        cancelTrade(orderid,type){
            let url = `/trade/api/market/order/cancel/${orderid}/${type}`
            this.$confirm('此操作将撤销未成交的部分, 是否继续?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$ajax.get(url).then(function(res){
                    let detailData = [];
                    if(res.data.code == 0){
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
@buyer-color :#de211d;
@seller-color:#0ebb74;
@dark-color:#1f1d1d;
@dark-btn:#2f2c2c;
@light-color:#fff;
.bk-kMarket {
    height: 280px;
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
    height: auto
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
    padding: 22px 0 14px 34px;
    line-height: 14px;

}

.bk-kMarket .table-striped>tbody>tr:nth-of-type(even) {
    background-color: #212020
}

.bk-kMarket .table-striped>tbody>tr:nth-of-type(odd) {
    background-color: #fff
}

.bk-kMarket .table-hover>tbody>tr {
    -ms-transition: all .2s linear;
    -moz-transition: all .2s linear;
    -webkit-transition: all .2s linear;
    -o-transition: all .2s linear;
    transition: all .2s linear
}

.bk-kMarket .table-hover>tbody>tr:hover {
    background-color: #fff;
}

.bk-kMarket .table-hover>tbody>tr:last-child>td {
    border-bottom: 0
}

.bk-kMarket .bk-entrust .table tbody td {
    height: auto;
    padding: 2px 8px
}

.bk-kMarket .bk-tabList {
    margin: 0 auto;
    width: 100%;
    overflow-x: auto;
    font-size: 12px;
    vertical-align: top;
}

.bk-kMarket .bk-tabList-hd a.pull-right {
    margin-top: 2px
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
    color: #333;
    background-color: #fbfbfb;
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
    background: #fbfbfb
    
}

.btn-group .btn {
    color: #6d7b82;
    background-color: #2f2c2c
}
.btn-group .selected{
    color: #fff;
    background-color: #de211d
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
    padding: 36px 0;
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
</style>
