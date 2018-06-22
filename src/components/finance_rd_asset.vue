<template>  
    <div class="finance-rd">
        <div class="bk-tabList">
            <!-- 页面标题 -->
            <div class="bk-tabList-hd">
                <div class="btn-group bk-btn-group mt10 pull-left" role="group">
                    <h6 style="color:#353d41; font-size:16px; font-weight: bold;">
                        <i class="icon_asset_all"></i>账户资产
                    </h6>
                </div>
            </div>

            <!-- 表格：币种 -->
            <div class="bk-tabList-bd">
                <div class="bk-asset">
                    <div id="userAssetList" class="table-wrapper active">
                        <div class="asset-convert row">
                            <div class="col-sm-6">
                                <div>
                                    <div class="asset-title">
                                        <h6>现货资产折合</h6>
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
                                </div>
                                <div>
                                    <div class="asset-title">
                                        <h6>净资产折合</h6>
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
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="hidecoin2">
                                    <h6 style="display:inline-block; font-size:12px; vertical-align:top; margin-top: 2px;">
                                        <span class="text_gray paddingRight10">隐藏资产数量</span> 
                                        <el-select id="select-asset-choose" class="hide_coin_select" placeholder="请选择" size="mini" v-model="selectHideNum">
                                            <el-option v-for="item in hideCoinOptions" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>  
                                        <span>的币种</span>
                                    </h6>
                                </div>
                                
                                <div class="search_coin_wrap">
                                    <span class="text_gray paddingRight10">资产币种搜索</span>
                                    <div class="searchcoin ">
                                        <!-- <input placeholder="请输入币种简称" id="searCoinName" v-model="searCoinName">
                                        <i class="fa fa-search" style="display:inline"></i> -->
                                        <el-input placeholder="请输入币种简称" id="searCoinName" size="mini" v-model="searCoinName">
                                            <i class="el-icon-search el-input__icon" slot="suffix"></i>
                                        </el-input>
                                    </div>
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
                                                <span class="num">{{M.fixDecimal(item.available, item.unitDecimal)}}</span>{{item.enName}}
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">{{M.fixDecimal(item.freez, item.unitDecimal)}}</span>{{item.enName}}
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <!-- <a :class="{'btn-gray': !item.isCanRecharge}" class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a> -->
                                                <router-link :to="'/payin/'+item.key" :class="{'btn-gray': !item.isCanRecharge}" class="btn btn-sm btn-primary">
                                                    <i class="bk-ico incoin" aria-hidden="true"></i>充值
                                                </router-link>
                                                <a :class="{'btn-gray': !item.isCanWithdraw}" class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                                <!-- <a v-if="item.canLoan" class="btn btn-sm btn-loan" href="#" target="_self"><i class="bk-ico loan fa fa-balance-scale"></i>交易</a> -->
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
                            <!-- 资金记录表格无数据 -->
                            <tbody v-if="billDetailData.list.length == 0">
                                <tr>
                                    <td colspan="4">
                                        <div class="bk-norecord">
                                            <p>暂时没有相关记录。</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr></tr>
                            </tbody>
                            <tbody v-if="false">
                                <tr>
                                    <td>2018-06-04 09:29:06</td>
                                    <td>
                                        <div class="td_purple">买入EOS手续费</div>
                                        <div class="td_wrap">流水号:312886559</div>
                                    </td>
                                    <td>-0.01344=21.50302 EOS</td>
                                    <td>成功</td>
                                </tr>
                                <tr >
                                    <td>2018-06-04 09:29:06</td>
                                    <td>
                                        <div class="td_purple">买入EOS</div>
                                        <div class="td_wrap">流水号:312886558</div>
                                    </td>
                                    <td>
                                        <div>-638.6352=0.85078234 QC</div>
                                        <div class="td_wrap">+6.720=21.51646 EOS</div>
                                    </td>
                                    <td>成功</td>
                                </tr>
                                <tr></tr>
                            </tbody>

                            <tbody>
                                <tr v-for="item in billDetailData.list" :key="item.index">
                                    <td>{{item.showDate}}</td>
                                    <td>
                                        <div class="td_purple">{{item.typeName}}</div>
                                        <div class="td_wrap">流水号:{{item.id}}</div>
                                    </td>
                                    <td>
                                        <div>{{item.showRmb}}</div>
                                        <div class="td_wrap" v-if="item.showDaos != '…'">{{item.showDaos}}</div>
                                    </td>
                                    <td><i i class="fa fa-check success" aria-hidden="true"></i>成功</td>
                                </tr>
                                
                                <tr></tr>
                            </tbody>
                        </table>
                        <input type="hidden" id="pageIndex" v-model="billDetailData.pageIndex">
                        <input type="hidden" id="currency" v-model="currency">
                        <div class="bk-moreBtn">
                            <button id="morebtn" class="btn btn-outline" type="button" style="display: none;" @click="billDetail(billDetailData.pageIndex+1)"><i class="fa fa-angle-down fa-fw"></i>更多</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
    import M from './../assets/js/common_method'
    export default {
        name: 'financeRD',
        data(){
            return {
                searCoinName: '',
                selectHideNum: '',
                hideCoinOptions: [{
                    value: '',
                    label: '请选择'
                }, {
                    value: '0',
                    label: '为0'
                }, {
                    value: '0.01',
                    label: '小于0.001'
                }, {
                    value: '1',
                    label: '小于1'
                }, {
                    value: '10000',
                    label: '小于10000'
                }],
                assetAmount: '',
                coins: [],
                billDetailData: {
                    list: [], 
                    pageIndex: 1
                },
                currency: 'all'
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
            // 查询最近资金记录
            billDetail(pageIndex) {
                console.log(pageIndex);
                let _this = this;
                let currency = _this.currency;
                $.ajax({
                    url: './../../../static/mock/billDetailMock.json',
                    type: 'GET',
                    data: {pageIndex : pageIndex, currency : currency},
                    dataType: 'json',
                    success: function(json) {
                        if (json.isSuc) {
                            // _this.billDetailData.pageIndex = json.datas.pageIndex;
                            _this.billDetailData.pageIndex += 1;

                            if ((!json.datas.list || json.datas.list.length <= 0)) {
                                if (pageIndex == 1) {
                                    _this.billDetailData.list = [];
                                }
                                $('#morebtn').hide();
                            } else {
                                _this.billDetailData.list = _this.billDetailData.list.concat(json.datas.list);
                                $('#morebtn').show();
                            }
                        } else {
                            alert(json.des);
                        }
                    },
                    error: function() {
                        alert('网络访问出错，请稍后重试。');
                    }
                });
            }

        },
        watch: {

        },
        created() {
            let _this = this;
            _this.M = M;
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

            _this.billDetail(1);
        },
        mounted() {
          console.log(this.coins)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .table>tbody+tbody {
        border-top: 0;
    }
    .td_purple {
        color: #aeb1d0;
    }
    .td_wrap {
        padding: 5px 0 0;
    }
    .hide_coin_select {
        width: 120px;
        height: 30px;
        border-color: rgba(230,230,230,1);
        border-radius: 4px;
        color: rgba(153,153,153,1);
    }
    .search_coin_wrap {
        text-align: right;
    }
</style>
