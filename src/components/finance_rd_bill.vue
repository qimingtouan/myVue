<template>  
    <div class="finance-rd bk-bill">
        <div class="bk-tabList">
            <div class="bk-tabList-hd clearfix mt10 paddingLeft0">
                <div class="btn-group bk-btn-group" role="group">
                    <h6 style="color:#353d41; font-size:16px; font-weight: bold;">
                        <i class="bk-ico billgray"></i>综合账单
                    </h6>
                </div>
            </div>

            <!-- 筛选条件 -->
            <div class="bk-tabList-hd clearfix" style=" overflow:visible; padding-bottom:10px; padding-top:10px; padding-left: 0;">
                <div class="btn-group bk-btn-group" role="group" style="width: 100%;">
                    <div class="dropdown dropdown-coin bk-onekey-form">
                        <a id="sel-coin" class="dropdown-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="height:44px;">
                            <span id="current-sel">{{currentCoin}}</span>
                            <span class="caret"></span>
                        </a>
                        <div class="dropdown-menu firsttype" aria-labelledby="sel-coin">
                            <div class="search-coin">
                                <input placeholder="搜索币种" id="searCoinName" class="bill_sear_coin" v-model="searCoinName">
                                <!-- <i class="fa fa-search"></i> -->
                                <i class="el-icon-search"></i>
                            </div>
                            <a class="btn" :class="{active: currentCoin == '所有币种'}" role="button" data-value="all" 
                                @click="switchCoin('所有币种', currentCoin)">所有币种</a>

                            <a v-for="item in coinList" :key="item.index" :data-coin="item.coinNameEn" 
                                :class="{active: currentCoin == item.coinNameEn}" class="btn" role="button" 
                                @click="switchCoin(item.coinNameEn, currentCoin)">{{item.coinNameEn}}
                            </a>
                        </div>
                    </div>

                    <!-- 所有类型  充值  提现  买入 卖出 买入手续费  卖出手续费 -->
                    <div class="second" style="display:inline-block;">
                        <a v-for="typeItem in typeList" :key="typeItem.key" :data-value="typeItem.value" 
                            :class="{active: currentType == typeItem.value}" class="btn" role="button" 
                            @click="switchType(typeItem.value, typeItem.label, currentType)">{{typeItem.label}}
                        </a>
                    </div>
                </div>
                <div class="pull-right mt10"></div>
            </div>

            <!-- 账单 -->
            <div class="bk-tabList-bd">
                <!-- 时间段选择 -->
                <div class="bk-search">
                    <form autocomplete="off" class="form-inline text-left" name="searchForm" id="searchContaint">
                        <div class="clearfix mb20"></div>

                        <div class="form-group form-group-sm ml20">
                            <label for="startDate">起止时间：</label>
                            <el-date-picker v-model="dateTimeData" type="datetimerange" value-format="timestamp" size="small"
                                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" 
                                            :picker-options="pickerOptions" 
                                            @change="selectDateTime()">
                            </el-date-picker>
                        </div>
                        <button id="idSearch" type="button" class="btn btn-sm btn-primary ml10 hide"  style="min-width:75px;" 
                                onclick="javascript:zb.list.search();"><i class="fa fa-search mr5"></i>筛选</button>
                        <button id="idReset" type="reset" class="btn btn-sm btn-default ml10 hide"  style="min-width:75px;" 
                                onclick="javascript:zb.list.resetForm();"><i class="fa fa-repeat mr5"></i>重置</button>
                    
                        <div class="clearfix mb20"></div>
                    </form>
                </div>

                <!-- 表格 -->
                <div id="shopslist" class="bk-onelist table-responsive">
                    <input type="hidden" id="lastRecordId" v-model="lastRecordId">
                    <table class="table table-striped table-bordered table-hover" id="billDetail">
                        <thead>
                            <tr>
                                <th width="20%;">时间</th>
                                <th width="25%;">类型</th>
                                <th width="40%;">金额</th>
                                <th width="15%;">状态</th>
                            </tr>
                        </thead>
                        <!-- 账单记录表格无数据 -->
                        <tbody  v-if="listTableData.length == 0">
                            <tr>
                                <td colspan="7">
                                    <div class="bk-norecord">
                                        <p>暂时没有相关记录。</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr v-for="item in listTableData" :key="item.index">
                                <td>{{item.time}}</td>
                                <td>
                                    <div class="td_purple">{{item.type}}</div>
                                </td>
                                <td>
                                    <div>{{item.sumDesc}}</div>
                                </td>
                                <td v-if="item.status == 1"><i i class="fa fa-check success" aria-hidden="true"></i>成功</td>
                                <td v-if="item.status == 0"><i class="el-icon-loading mr5" aria-hidden="true"></i>进行中</td>
                                <td v-if="item.status == -1"><i i class="fa fa-times fail" aria-hidden="true"></i>失败</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="bk-moreBtn"  style="display: none;" id="moreBtnWrap">
                        <button id="morebtn" class="btn btn-outline" type="button" @click="initListTable()">
                            <i class="fa fa-angle-down fa-fw"></i>更多
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../static/My97DatePicker/My97DatePicker/WdatePicker.js'
    export default {
        name: 'finance_rd_bill',
        data() {
            return {
                searCoinName: '',
                coins: [],
                currentCoin: '所有币种',
                currentType: '', // 类型- 1.充值，2.提现，3.买入，4.卖出，5.买入手续费，6.卖出手续费 (''表示所有)
                typeList: [
                    {
                        label: '所有类型',
                        value: ''
                    },
                    {
                        label: '充值',
                        value: 1
                    },
                    {
                        label: '提现',
                        value: 2
                    },
                    {
                        label: '买入',
                        value: 3
                    },
                    {
                        label: '卖出',
                        value: 4
                    },
                    {
                        label: '买入手续费',
                        value: 5
                    },
                    {
                        label: '卖出手续费',
                        value: 6
                    }
                ],
                dateTimeData: '',
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
                listTableData: [],
                lastRecordId: ''
            }
        },
        computed: {
            // 币种选择下拉选项
            coinList: function() {
                var coins = JSON.parse(JSON.stringify(this.coins));

                // 搜索过滤
                if (this.searCoinName !== '') {
                    coins = coins.filter(function(item){
                        return item.coinNameEn.toUpperCase().indexOf(this.searCoinName.toUpperCase()) !== -1;
                    }.bind(this))

                }
                return coins;
            }    
        },
        filters: {

        },
        methods: {
            // 提示弹窗
            msgConfirm(msg, msgTitle, msgType) {
                this.$confirm(msg, msgTitle, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: msgType
                }).then(() => {

                }).catch(() => {

                });
            },

            // 查询所有币种
            getCoinList() {
                let _this = this;
                $.ajax({
                    url: '/web/asset/getAllDetail',
                    type: "GET",
                    dataType: "json",
                    success: function(res) {
                        if (res.code == 200) {
                            if (res.data && res.data.assets) {
                                _this.coins = res.data.assets;
                            }

                        } else {
                            _this.msgConfirm(res.msg, '', 'error');
                        }
                    },
                    error: function(err){
                        _this.msgConfirm('呀，出错啦。。。', '', 'error');
                    }
                });
            },

            // 选择币种
            switchCoin(clickCoin, currentCoin) {
                let _this = this;
                if(clickCoin == currentCoin) {
                    return;
                }

                _this.currentCoin = clickCoin;
                _this.lastRecordId = '';
                _this.listTableData = [];

                // 查询该点击币种的账单记录
                _this.initListTable();
            },

            // 选择类型
            switchType(clickTypeValue, clickTypeLabel, currentType) {
                let _this = this;
                if(clickTypeValue == currentType) {
                    return;
                }

                _this.currentType = clickTypeValue;
                _this.lastRecordId = '';
                _this.listTableData = [];

                // 查询该点击类型的账单记录
                _this.initListTable();
            },

            // 选择时间段
            selectDateTime() {
                let _this = this;

                _this.lastRecordId = '';
                _this.listTableData = [];

                // 查询该点击类型的账单记录
                _this.initListTable();
            },

            // 查询当前筛选条件账单记录
            initListTable() {
                let _this = this;

                let _currentCoin = this.currentCoin;
                let _currentType = this.currentType;
                let _dateTimeData = this.dateTimeData;
                let _lastRecordId = this.lastRecordId;
                let _startTime = "";
                let _endTime = "";

                if ("所有币种" == _currentCoin) {
                    _currentCoin = "";
                }

                if (_dateTimeData) {
                    _startTime = _dateTimeData[0].toString().substring(0, 10);
                    _endTime = _dateTimeData[1].toString().substring(0, 10);
                }

                let billData = {
                    "coinName": _currentCoin,
                    "type": _currentType,
                    "startTime": _startTime,
                    "endTime": _endTime,
                    "lastRecordId": _lastRecordId
                };

                $.ajax({
                    type: "POST",
                    url: "/web/asset/getGeneralRecord",
                    contentType : "application/json",
                    data: JSON.stringify(billData),
                    dataType: "json",
                    success: function(res){
                        if (res.code == 200) {
                            if ((!res.data || res.data.length <= 0)) {
                                if (!lastRecordId) {
                                    _this.listTableData = [];
                                }
                                $('#moreBtnWrap').hide();
                            } else {
                                _this.listTableData = _this.listTableData.concat(res.data);

                                let _length = _this.listTableData.length;
                                _this.lastRecordId = _this.listTableData[_length-1].recordId;

                                $('#moreBtnWrap').show();
                            }
                        } else {
                            _this.msgConfirm(res.msg, '', 'error');
                        }
                    },
                    error: function(err) {
                        _this.msgConfirm('呀，出错啦。。。', '', 'error');
                    }
                });

            }
        },
        watch: {

        },
        created() {
            let _this = this;
            _this.getCoinList(); // 查询所有币种
            _this.initListTable(); // 查询账单记录
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    html, body {
        min-width: 1000px;
    }
    .bk-tabList-hd .btn-group .btn {
        padding: 15px 5px;
        font-size: 12px;
        font-weight: normal;
    }
    .finance-rd .clearfix.mb20 {
        height: 1px;
    }

    #shopslist {
        margin: 20px;
    }
    .bk-tabList-bd {
        padding-bottom: 1px;
    }

    .dropdown-menu.firsttype {
        max-height: 300px;
        overflow-y: auto;
    }

    .dropdown-coin {
        width:160px;
        height: 44px;
        position: relative;
        display: inline-block;
        margin-right: 10px;
        vertical-align: bottom;
        padding: 0;

        .dropdown-menu {
            a {
                display: block;
                text-align: left;
                padding: 5px 12px!important;
                cursor: pointer;
            }
            a.active:before {
                display: none!important;
                background: none;
            }
            a:hover {
                border-bottom: none;
                background: #F5F5F5;
            }
            a:hover:before {
                display: none!important;
            }
        }
    }

    .search-coin .bill_sear_coin {
        width: 83%;
    }
    .search-coin i {
        cursor: pointer;
        position: absolute;
        top: 8px;
        right: 5px;
        color: #ccc;
        font-weight: bold;
    }

    #current-sel {
        font-size: 12px;
    }

    .bk-onekey-form .dropdown-button {
        width: 100%;
    }

    .bk-ico.billgray {
        vertical-align: middle;
        color: #61727C;
    }

    #billDetail th {
        background: #f6f6f6;
    }

    .td_purple {
        color: #aeb1d0;
    }
</style>
