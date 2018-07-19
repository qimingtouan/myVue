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
                                        <h6>账户资产折合</h6>
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
                                <div class="caption loading" v-if="coinListLoading">
                                    <div class="bk-norecord">
                                        <p>
                                            <!-- <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i><br> -->
                                            <i class="el-icon-loading fa-spin fa-2x fa-fw"></i><br>
                                            <span>Loading...</span>
                                        </p>
                                    </div>
                                </div>

                                <div class="caption" v-if="coinList.length == 0 && !coinListLoading">
                                    <div class="bk-norecord"><p><i class="bk-ico info"></i>暂时没有相关记录。</p></div>    
                                </div>
                                <div class="tbody">
                                    <div class="tr sdiv-0 showdiv" v-for="item in coinList" :key="item.index">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <!-- <i :class="'icon-' + item.enName"></i> -->
                                                <img :src="item.iconPath" class="asset_coin_img"/>
                                                <span>{{item.coinNameEn}}</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">{{M.fixDecimal(item.available, item.scale)}}</span>{{item.coinNameEn}}
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">{{M.fixDecimal(item.freez, item.scale)}}</span>{{item.coinNameEn}}
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell" :id="item.coinId">
                                                <router-link :to="'/payin/'+item.coinNameEn" :class="{'btn-gray': !item.canRecharge}" class="btn btn-sm btn-primary">
                                                    <i class="bk-ico incoin" aria-hidden="true"></i>充值
                                                </router-link>
                                                <router-link :to="'/payout/'+item.coinNameEn" :class="{'btn-gray': !item.canWithdraw}" class="btn btn-sm btn-second">
                                                    <i class="bk-ico outcoin" aria-hidden="true"></i>提现
                                                </router-link>
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
                                    <th width="20%">时间</th>
                                    <th width="25%" style="text-align:left;">类别</th>
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
                            <!-- <tbody v-if="false">
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
                            </tbody> -->

                            <tbody>
                                <tr v-for="item in billDetailData.list" :key="item.index">
                                    <td>{{item.time}}</td>
                                    <td>
                                        <div class="td_purple">{{item.type}}</div>
                                        <!-- <div class="td_wrap">流水号:{{item.id}}</div> -->
                                    </td>
                                    <td>
                                        <div>{{item.sumDesc}}</div>
                                    </td>
                                    <td v-if="item.status == 1"><i class="fa fa-check success" aria-hidden="true"></i>成功</td>
                                    <td v-if="item.status == 0"><i class="el-icon-loading mr5" aria-hidden="true"></i>进行中</td>
                                    <td v-if="item.status == -1"><i class="fa fa-times fail" aria-hidden="true"></i>失败</td>
                                </tr>
                                
                                <tr></tr>
                            </tbody>
                        </table>
                        <input type="hidden" id="lastRecordId" v-model="billDetailData.lastRecordId">
                        <div class="bk-moreBtn"  style="display: none;" id="moreBtnWrap">
                            <button id="morebtn" class="btn btn-outline" type="button" @click="billDetail(billDetailData.lastRecordId)">
                                <i class="fa fa-angle-down fa-fw"></i>更多
                            </button>
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
                assetAmount: '--',
                coins: [],
                coinListLoading: true,
                billDetaiLoading: true,
                billDetailData: {
                    list: [], 
                    lastRecordId: ''
                }
            }
        },
        computed: {
            coinList: function() {
                var coins = JSON.parse(JSON.stringify(this.coins));

                // 搜索过滤
                if (this.searCoinName !== '') {
                    coins = coins.filter(function(item){
                        return item.coinNameEn.toUpperCase().indexOf(this.searCoinName.toUpperCase()) !== -1;
                    }.bind(this))

                }

                // 隐藏小额资产
                if (this.selectHideNum !== '') {
                    coins = coins.filter(function(item){
                        return Number(item.available) > Number(this.selectHideNum);
                    }.bind(this))

                }

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
            billDetail(lastRecordId) {
                let _this = this;
                let billDetailUrl = "/web/asset/getRecord";
                if (lastRecordId) {
                    billDetailUrl += "?lastRecordId=" + encodeURIComponent(lastRecordId);
                }

                $.ajax({
                    type: 'GET',
                    url: billDetailUrl,
                    dataType: 'json',
                    success: function(res) {
                        if (res.code == 200) {
                            if ((!res.data || res.data.length <= 0)) {
                                if (!lastRecordId) { // 第一次查询，表格为空
                                    _this.billDetailData.list = [];
                                }
                                $('#moreBtnWrap').hide();
                            } else {
                                _this.billDetailData.list = _this.billDetailData.list.concat(res.data);

                                let _length = _this.billDetailData.list.length;
                                _this.billDetailData.lastRecordId = _this.billDetailData.list[_length-1].recordId;

                                $('#moreBtnWrap').show();
                            }
                        } else {
                            alert(res.msg);
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

            _this.coinListLoading = true;
            $.ajax({
                url: '/web/asset/getAllDetail',
                type: "GET",
                dataType: "json",
                 complete: function() {
                    _this.coinListLoading = false;
                },
                success: function(res) {
                    if (res.code == 200) {
                        if (res.data) {
                            _this.coins = res.data.assets;
                            // _this.assetAmount = res.data.total; 
                        }
                    }
                },
                error: function(err){
                    console.log(err);
                }
            });

            _this.billDetail();
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

    .asset-table .asset_coin_img {
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
        margin-top: -2px
    }
</style>
