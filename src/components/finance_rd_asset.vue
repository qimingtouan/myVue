<template>  
    <div class="finance-rd">
        <div class="bk-tabList">
            <div class="user-asset row" style="display:none">图形区</div>
            <div class="bk-tabList-bd" style="display:none">
                <div id="asset-tabs" class="tab-group clearfix">
                    <div class="tab-item">
                        <a class="active" href="#userAssetList">
                            <span>现货账户</span>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 表格：币种 -->
            <div class="bk-tabList-bd">
                <div class="bk-asset">
                    <div id="userAssetList" class="table-wrapper active">
                        <div class="asset-convert row">
                            <div class="col-sm-7">
                                <div class="asset-title">
                                    <h6>资产折合</h6>
                                </div>
                                <div class="asset-amount">
                                    <div class="amount">
                                        <span id="totalSpotAsset" class="num">{{assetAmount}}</span>
                                        <span id="Munit" class="unit aunit">CNY</span>
                                    </div>
                                    <div class="action">
                                        <a href="javascript:void(0);" onclick="changeMunit()">
                                            <i></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="searchcoin">
                                    <i class="fa fa-search" style="display:inline"></i>
                                    <input placeholder="请输入币种简称" id="searCoinName" v-model="searCoinName">
                                </div>
                            </div>
                            <div class="col-sm-5">
                                <div class="hidecoin2">
                                    <h6 style="display:inline-block; font-size:12px; vertical-align:top; margin-top: 2px;">
                                        <span>隐藏资产数量</span> 
                                        <select id="select-asset-choose" v-model="selectHideNum">
                                            <option value="">请选择</option>
                                            <option value="0">为0</option>
                                            <option value="0.001">小于0.001</option>
                                            <option value="1">小于1</option>
                                            <option value="10000">小于10000</option>
                                        </select>   
                                        <span>的币种</span>
                                    </h6>
                                    <!-- <a class="coinonoff"></a> -->
                                </div>
                            </div>
                        </div>
                        <div id="hidecoinz" class="hcoin-0">
                            <div class="asset-table table-grid">
                                <div class="thead">
                                    <div class="tr showdiv">
                                        <div class="td"><div class="cell">币种</div></div>
                                        <div class="td"><div class="cell">可用</div></div>
                                        <div class="td percentage"><div class="cell">冻结</div></div>
                                        <div class="td"><div class="cell">操作</div></div>
                                    </div>
                                </div>
                                <!-- 加载图标 Loading -->
                                <div class="caption loading" style="display: none;">
                                    <div class="bk-norecord">
                                        <p>
                                            <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i><br>
                                            <span>Loading...</span>
                                        </p>
                                    </div>
                                </div>

                                <div class="tbody">
                                    <div class="tr sdiv-0 showdiv" v-for="item in coinList" :key="item.index">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i :class="'icon-' + item.enName"></i>
                                                <span>{{item.enName}}</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">{{Number(item.available)}}</span>{{item.enName}}
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">{{Number(item.freez)}}</span>{{item.enName}}
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a :class="{ 'btn-gray': !item.isCanRecharge }" class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a :class="{ 'btn-gray': !item.isCanWithdraw }" class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                                <a v-if="item.canLoan" class="btn btn-sm btn-loan" href="#" target="_self"><i class="bk-ico loan fa fa-balance-scale"></i>交易</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 最近资金记录 -->
            <div class="bk-tabList-bd">
                <div class="bk-pageTit">
                    <h4 class="pull-left">
                        <i class="bk-ico assetRecord fa fa-list"></i>
                        最近资金记录
                    </h4>
                    <div class="table-responsive">
                        <table id="billDetail" class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="15%">时间</th>
                                    <th width="30%" style="text-align:left;">类别</th>
                                    <th width="40%" style="text-align:left;">发生金额</th>
                                    <th width="15%">状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="4">
                                        <div class="bk-norecord">
                                            <p>暂时没有相关记录。</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr></tr>
                            </tbody>
                        </table>
                        <input type="hidden" id="pageIndex" value="1">
                        <input type="hidden" id="currency" value="all">
                        <div class="bk-moreBtn">
                            <button id="morebtn" class="btn btn-outline" type="button" style="display: none;"><i class="fa fa-angle-down fa-fw"></i>更多</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
    export default {
        name: 'financeRD',
        data(){
            return {
                searCoinName: '',
                selectHideNum: '',
                assetAmount: '',
                coins: []
            }
        },
        computed: {
            coinList: function() {
                var coins = JSON.parse(JSON.stringify(this.coins));

                // 搜索过滤
                if (this.searCoinName !== '') {
                    coins = coins.filter(function(item){
                        return item.enName.toUpperCase().indexOf(this.searCoinName.toUpperCase()) !== -1;
                    }.bind(this))

                }

                // 隐藏小额资产
                if (this.selectHideNum !== '') {
                    coins = coins.filter(function(item){
                        return Number(item.available) > Number(this.selectHideNum);
                    }.bind(this))

                }

                console.log(coins)
                return coins;
            }      
        },
        filters: {
            // number: function(value) {
            //     return !value || value == '' ? '--' : value;
            // },
            // fixNumber: function(value, unit) {
            //     var unit = typeof unit == 'undefined' ? 2 : unit;
            //     return !value || value == '' ? '--' : method.fixNumber(value, unit);
            // },
            // // 两位数补全
            // supplement: function(value) {
            //     return ('0' + value).slice(-2);
            // }
        },
        methods: {
            

        },
        watch: {

        },
        created() {
            let _this = this;
            $.ajax({
                url: './../../../static/mock/coinListMock.json',
                // type: "POST",
                type: "GET",
                dataType: "json",
                success: function(res) {
                    _this.coins = res.coins;
                    _this.assetAmount = res.total;
                },
                error: function(err){
                    console.log(err);
                }
            });
        },
        mounted() {
          console.log(this.coins)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
