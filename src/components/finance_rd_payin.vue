<template>  
    <div class="finance-rd">
        <div class="bk-tabList">
            <div class="bk-tabList-hd clearfix">
                <div class="btn-group bk-btn-group" role="group">
                    <a href="javascript:;" class="btn sinspan" role="button">
                        <i class="fa fa-sign-in icon_sin"></i>充币
                    </a>
                </div>
            </div>
            
            <!-- 选择币种充值 -->
            <div class="bk-tabList-bd payin">
                <div class="bk-onekey-form">
                    <form role="form" id="buyForm" class="form-horizontal row" method="post" action autocomplete="off">
                        <div class="sel-coin-row">
                            <div class="col-sm-9">
                                <div class="col-sm-5">
                                    <h6>选择币种充值</h6>
                                    <div class="dropdown">
                                        <a id="sel-coin" class="dropdown-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span id="current-sel">{{currentCoin}}</span>
                                            <span class="caret"></span>
                                        </a>
                                        <div class="dropdown-menu" aria-labelledby="sel-coin">
                                            <ul id="d-coins" class="coin-list">
                                                <div class="search-coin">
                                                    <input placeholder="搜索充值币种" id="searCoinName" v-model="searCoinName">
                                                    <a><i class="fa fa-search"></i></a>
                                                </div>
                                                <li v-for="item in coinList" :key="item.index" :class="{'not-open': !item.canRecharge}" :data-coin="item.coinNameEn" @click="switchCoin(item.coinNameEn, currentCoin, item.canRecharge)">{{item.coinNameEn}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- 自选记录 -->
                                <div class="col-sm-7 optional-record">
                                    <h6>
                                        自选记录
                                        <a class="act" @click="toggleOptional(true)">
                                            <i class="fa fa-cog"></i>编辑
                                        </a>
                                    </h6>
                                    <div id="optional-list" class="optional-list">
                                        <a v-for="item in userCoinList" :key="item.index" :data-coin="item.coinNameEn" v-if="item.status == 1" 
                                            :class="{'coin_selected': item.coinNameEn.toUpperCase() == currentCoin.toUpperCase()}" 
                                            @click="switchCoin(item.coinNameEn, currentCoin, true)">{{item.coinNameEn.toUpperCase()}}
                                        </a>
                                    </div>
                                </div>
                                
                                <!-- 钱包地址 -->
                                <div class="col-sm-12 mt10 mb10">
                                    <h6>钱包地址</h6>
                                    <div class="address-field">
                                        <span id="keyPreCopy" class="key-pre">{{coinAddress}}</span>
                                        <a v-if="!coinAddress" id="getAddr" class="btn-copy" @click="getCoinAddr(currentCoin)">获取地址</a>
                                        <a v-if="coinAddress" id="copyadd" class="btn-copy" 
                                            v-clipboard:copy="coinAddress" 
                                            v-clipboard:success="onCopySuccess" 
                                            v-clipboard:error="onCopyError">复制地址</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <img id="keyPreImg" src="../assets/img/user/qrcode.png" style="width: 150px; height: 150px;">
                                <p class="textCenter keyPreImgText">扫码充币</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- 自选币种弹出框 -->
            <div id="optional-popup">
                <div class="popup-box">
                    <a class="close" @click="toggleOptional(false)"><i class="fa fa-close"></i></a>
                    <h5><span class="popup_title">自选币种设置</span><span class="popup_subtitle"></span></h5>
                    <div class="separate_line mb10"></div>
                    <ul id="popup-coins" class="coin-list">
                        <li v-for="item in userCoinList" :key="item.index">
                            <label @click="editUserCoins(item.coinNameEn, item.coinId, coinFlags[item.coinNameEn])" 
                                    :class="{'choosed': coinFlags[item.coinNameEn]}">
                                <img :src="item.iconPath"/>{{item.coinNameEn}}
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 安全提示 -->
            <div class="ctips user_main_title3">
                <div style="position:absolute; top:18px; left:30px;">
                    <a href="#" style="display: block;" title="充币教程">
                        <img src="../assets/img/tipicon_payin.png">
                    </a>
                </div>
                <p class="nb_ctips_text">
                    <span>安全提示</span><br>
                    <b class="ft14 text_red">禁止充值除<span class="text_uppercase text_red ft14">{{currentCoin}}</span>之外的其他资产，任何非<span class="text_uppercase text_red ft14">{{currentCoin}}</span>资产充值将不可找回</b><br>
                    <em>* 1. 往该地址充值，汇款完成，等待网络自动确认（{{confirmRecharge}} 个确认）后系统自动到账</em><br>
                    <em>* 2. 为了快速到账，充值时可以适当提高网络手续费</em><br>
                </p>
                <div class="close" title="关闭">×</div>
            </div>

            <!-- 表格：充币记录 -->
            <div class="bk-onelist recordlistcont">
                <div id="shopslist" class="table-responsive">
                    <input type="hidden" id="lastRecordId" v-model="lastRecordId">
                    <input type="hidden" id="coint" v-model="currentCoin">
                    <!-- 当前价格（隐藏） -->
                    <input type="hidden" id="currentPrice" value="">
                    <table id="ListTable" class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th width="20%">时间</th>
                                <th width="20%">类型</th>
                                <th width="30%">金额<span class="text_uppercase">({{currentCoin}})</span></th>
                                <th width="15%">确认次数</th>
                                <th width="15%">状态</th>
                            </tr>
                        </thead>

                        <!-- 充币记录表格无数据 -->
                        <tbody v-if="listTableData.length == 0">
                            <tr>
                                <td colspan="7">
                                    <div class="bk-norecord">
                                        <p>暂时没有相关记录。</p>
                                    </div>
                                </td>
                            </tr>
                            <tr></tr>
                        </tbody>

                        <tbody>
                            <tr v-for="item in listTableData" :key="item.index">
                                <td>{{item.time}}</td>
                                <td>
                                    <div class="td_purple">{{item.type}}</div>
                                </td>
                                <td>
                                    <div>{{M.fixDecimal(item.amount, item.scale)}}</div>
                                </td>
                                <td>{{item.confirmation}}</td>
                                <td v-if="item.status == 1"><i class="fa fa-check success" aria-hidden="true"></i>成功</td>
                                <td v-if="item.status == 0"><i class="el-icon-loading mr5" aria-hidden="true"></i>进行中</td>
                                <td v-if="item.status == -1"><i class="fa fa-times fail" aria-hidden="true"></i>失败</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="bk-moreBtn" style="display: none;" id="moreBtnWrap">
                        <button id="morebtn" class="btn btn-outline" type="button" @click="initListTable(currentCoin, lastRecordId)">
                            <i class="fa fa-angle-down fa-fw"></i>更多
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import M from './../assets/js/common_method'
    export default {
        name: 'finance_rd_payin',
        data() {
            return {
                searCoinName: '',
                coins: [],
                coinFlags: {},
                userCoinList: [],
                currentCoin: 'USDT',
                lastRecordId: '',
                listTableData: [],
                coinAddress: '',
                confirmRecharge: '--',
                confirmList: {}
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
            getCoinList(currentCoin) {
                let _this = this;
                $.ajax({
                    url: '/web/asset/getAllDetail',
                    type: "GET",
                    dataType: "json",
                    success: function(res) {
                        if (res.code == 200) {
                            if (res.data && res.data.assets) {
                                _this.coins = res.data.assets;
                                // _this.assetAmount = res.data.total; 
                            }
                            for (var i = 0; i <_this.coins.length; i++) {
                                _this.$set(_this.coinFlags, _this.coins[i].coinNameEn, false);
                                _this.$set(_this.confirmList, _this.coins[i].coinNameEn, _this.coins[i].sysRechargeBlock);
                            }

                            if (_this.confirmList && _this.confirmList[currentCoin]) {
                                _this.confirmRecharge = _this.confirmList[currentCoin];
                            } else {
                                _this.confirmRecharge = '--';
                            }
                        } else {
                            _this.msgConfirm(res.msg, '', 'error');
                        }

                    },
                    error: function(err){
                       _this.msgConfirm('呀，出错啦。。。', '', 'error');
                    },
                    complete: function(XHR, TS) {
                        _this.getUserCoinList(); // 查询用户自选币种
                    }
                });
            },

            // 选择充值币种
            switchCoin(clickCoin, currentCoin, isCanRecharge) {
                let _this = this;
                if(clickCoin == currentCoin || false == isCanRecharge) {
                    return;
                }
                window.location.hash = "#/payin/"+clickCoin;

                _this.currentCoin = clickCoin;
                _this.lastRecordId = '';
                _this.listTableData = [];

                if (_this.confirmList && _this.confirmList[currentCoin]) {
                    _this.confirmRecharge = _this.confirmList[currentCoin];
                } else {
                    _this.confirmRecharge = '--';
                }

                // 查询该点击币种的钱包地址
                _this.queryCoinAddr(clickCoin);

                // 查询该点击币种的充值记录
                _this.initListTable(clickCoin);
            },

            // 查询当前币种的钱包地址
            queryCoinAddr(coinName) {
                let _this = this;
                $.ajax({
                    type: "GET",
                    url: "/web/rechange/getCionAddressByCoinName/"+ coinName,
                    dataType: "json",
                    success: function(res) {
                        if(res.code == 200) {
                            if (res.data && res.data.cryptoAddress) {
                                _this.coinAddress = res.data.cryptoAddress;   
                            } else {
                                _this.coinAddress = '';
                            }

                        // } else {
                        //     _this.msgConfirm(res.msg, '', 'error');
                        }
                    },
                    error: function(err) {
                        _this.msgConfirm('呀，出错啦。。。', '', 'error');
                    }
                });
            },

            // 获取当前币种充值地址
            getCoinAddr(coinName) {
                let _this = this;
                $.ajax({
                    type: "GET",
                    url: "/web/rechange/allotCionAddress/" + coinName,
                    dataType: "json",
                    success: function (res) {
                        if (res.code == 200) {
                            _this.$alert('获取钱包地址成功', {
                                confirmButtonText: '确定',
                                type: 'success',
                                callback: action => {
                                    if (res.data && res.data.address) {   
                                        _this.coinAddress = res.data.address; 
                                    }
                                }
                            });
                        } else {
                            _this.$alert(res.msg, {
                                confirmButtonText: '确定',
                                type: 'error',
                                callback: action => {
                                    
                                }
                            });
                        }
                    }
                });
            },

            // 地址复制成功
            onCopySuccess(e) {
                this.$alert('复制成功！', {
                    confirmButtonText: '确定',
                    type: 'success',
                    callback: action => {

                    }   
                });
            },
            // 地址复制失败
            onCopyError(e) {
                this.$alert('无法复制文本', {
                    confirmButtonText: '确定',
                    type: 'error',
                    callback: action => {

                    }
                });
            },

            // 当前币种充值记录
            initListTable(currentCoin, lastRecordId){
                let _this = this;
                let payInRecordUrl = "/web/rechange/getAssetRecharge?coinName="+encodeURIComponent(currentCoin);
                if (lastRecordId) {
                    payInRecordUrl += "&lastId=" + encodeURIComponent(lastRecordId);
                }

                $.ajax({
                    type: "GET",
                    url: payInRecordUrl,
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
                                _this.lastRecordId = _this.listTableData[_length-1].id;

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
            },

            // 自选币种设置弹窗显示/影藏
            toggleOptional(boolean) {
                if(boolean){
                    $("#optional-popup").show();
                }else{
                    $("#optional-popup").hide();
                    this.getUserCoinList();
                }
            },

            // 查询自选币种
            getUserCoinList() {
                let _this = this;
                $.ajax({
                    type: "GET",
                    url: "/web/optional/getOptionalRecoid",
                    dataType: "json",
                    success: function(res) {
                        if(res.code == 200 && res.data.length) {
                            res.data.map(function(coin) {
                                var coinName = coin.coinNameEn.toUpperCase();
                                if (coin.status == 1) {
                                    _this.coinFlags[coinName] = true;
                                } else {
                                    _this.coinFlags[coinName] = false;
                                }
                                
                            });
                            _this.userCoinList = res.data;
                        }
                    }
                })
            },

            // 自选币种编辑(选中/去选中)
            editUserCoins(coinName, coinId, isChoose) {
                let _this = this;
                let _addUrl = "/web/optional/addOptionalRecoid/" + encodeURIComponent(coinId);
                let _delUrl = "/web/optional/updateOptionalRecoid/" + encodeURIComponent(coinId);
                
                let _url = (isChoose == true)? _delUrl : _addUrl;
                _this.coinFlags[coinName] = !isChoose;
                
                $.ajax({
                    type: "POST",
                    url: _url,
                    dataType: "json",
                    success: function(res){
                        if(res.code == 200){
                            _this.msgConfirm(res.msg, '', 'success');
                        } else {
                            _this.coinFlags[coinName] = isChoose;
                            _this.msgConfirm(res.msg, '', 'error');
                        }
                    },
                    error: function(err){
                        _this.coinFlags[coinName] = isChoose;
                        _this.msgConfirm('自选币种编辑失败！', '', 'error');
                    }
                })
            }
        },
        watch: {

        },
        created() {
            let _this = this;
            _this.M = M;

            let _routerCoin = _this.$route.params[0];
            
            if (_routerCoin) {
                _this.currentCoin = _routerCoin.toUpperCase();
            } else {
                _this.currentCoin = 'USDT';
            }

            let _currentCoin = _this.currentCoin;

            _this.getCoinList(_currentCoin); // 查询所有币种和用户自选币种
            _this.queryCoinAddr(_currentCoin); // 查询当前币种地址
            _this.initListTable(_currentCoin); // 当前币种充值记录
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .payin .bk-onekey-form .address-field{
        margin-top: 20px;
        height: 42px;
    }
    .payin .bk-onekey-form .address-field .address-field-title{
        width: 60px;
        color: #999;
        float: left;
    }

    .popup-box .coin-list li label.choosed {
        border-color: #ffa338;
    }

    .nb_ctips_text {
        margin-left: 180px;
    }

    .text_red {
        color: rgba(251,85,85,1);
    }

    .td_purple {
        color: #aeb1d0;
    }

</style>
