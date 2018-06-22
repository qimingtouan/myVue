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
                                                <li v-for="item in coinList" :key="item.index" :class="{'not-open': !item.isCanRecharge}" :data-coin="item.key" 
                                                    :data-unittag="item.unitTag" @click="switchCoin(item.key, currentCoin, item.isCanRecharge)">{{item.enName}}</li>
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
                                        <a v-for="item in userCoinList" :key="item.index" :data-coin="item.currency" 
                                            :class="{'coin_selected': item.currency==currentCoin}" 
                                            @click="switchCoin(item.currency, currentCoin, true)">{{item.currency.toUpperCase()}}
                                        </a>
                                    </div>
                                </div>
                                
                                <!-- 钱包地址 -->
                                <div class="col-sm-12 mt10 mb10">
                                    <h6>钱包地址</h6>
                                    <div class="address-field">
                                        <span id="keyPreCopy" class="key-pre">{{coinAddress}}</span>
                                        <a v-if="!coinAddress" id="getAddr" class="btn-copy" @click="getCoinAddr()">获取地址</a>
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
                    <h5><span class="popup_title">自选币种设置</span><span class="popup_subtitle">( 最多选择5个 )</span></h5>
                    <div class="separate_line mb10"></div>
                    <ul id="popup-coins" class="coin-list">
                        <li v-for="item in coins" :key="item.index" :class="{'not-open': !item.isCanRecharge}">
                            <label @click="editUserCoins(item.key, coinFlags[item.key])" :class="{'choosed': coinFlags[item.key]}">
                                <!-- <input type="checkbox" :data-name="item.key"> -->
                                <i :class="'icon-'+ item.key"></i>{{item.enName}}
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 安全提示 -->
            <div class="ctips user_main_title3">
                <div style="position:absolute; top:2px; right:10px;">
                    <a href="#">
                        <img src="https://s.zb.com/statics/img/v2/common/techpic_payin2.png" style="width:120px;">
                    </a>
                </div>
                <p>
                    <span>安全提示</span><br>
                    <b class="ft14 text_red">禁止充值除<span class="text_uppercase text_red font14">{{currentCoin}}</span>之外的其他资产，任何非<span class="text_uppercase text_red ft14">{{currentCoin}}</span>资产充值将不可找回</b><br>
                    <em>* 1. 往该地址充值，汇款完成，等待网络自动确认（1个确认）后系统自动到账</em><br>
                    <em>* 2. 为了快速到账，充值时可以适当提高网络手续费</em><br>
                </p>
                <div class="close" title="关闭">×</div>
            </div>

            <!-- 表格：充币记录 -->
            <div class="bk-onelist recordlistcont">
                <div id="shopslist" class="table-responsive">
                    <input type="hidden" id="currentPage" v-model="currentPage">
                    <input type="hidden" id="currentTab" v-model="currentTab">
                    <input type="hidden" id="coint" v-model="currentCoin">
                    <!-- 当前价格（隐藏） -->
                    <input type="hidden" id="currentPrice" value="">
                    <table id="ListTable" class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th width="170px">时间</th>
                                <th width="240px">类型</th>
                                <th width="78px">金额<span class="text_uppercase">({{currentCoin}})</span></th>
                                <th width="80px">确认次数</th>
                                <th width="105px">状态</th>
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
                                <td>{{item.showDate}}</td>
                                <td>
                                    <div class="td_purple">{{item.typeName}}</div>
                                </td>
                                <td>
                                    <div>{{item.chargeAmount}}</div>
                                </td>
                                <td>{{item.confirmTimes}}</td>
                                <td v-if="item.chargeStatus == 0">
                                    <i i class="fa fa-check success" aria-hidden="true"></i>成功
                                </td>
                                <td v-if="item.chargeStatus == 1">
                                    <i i class="fa fa-times fail" aria-hidden="true"></i>失败
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <script type="text/javascript">
                        formatNum();
                    </script> -->
                    <div class="bk-moreBtn" style="display: none;" id="moreBtnWrap">
                        <button id="morebtn" class="btn btn-outline" type="button" @click="initListTable(currentPage.pageIndex+1, currentCoin)"><i class="fa fa-angle-down fa-fw"></i>更多</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'finance_rd_payin',
        data() {
            return {
                searCoinName: '',
                coins: [],
                coinFlags: {},
                userCoinList: [],
                currentPage: 1,
                currentTab: 'all',
                currentCoin: 'usdt',
                listTableData: [],
                coinAddress: ''
            }
        },
        computed: {
            // 币种选择下拉选项
            coinList: function() {
                var coins = JSON.parse(JSON.stringify(this.coins));

                // 搜索过滤
                if (this.searCoinName !== '') {
                    coins = coins.filter(function(item){
                        return item.enName.toUpperCase().indexOf(this.searCoinName.toUpperCase()) !== -1;
                    }.bind(this))

                }
                return coins;
            }    
        },
        filters: {

        },
        methods: {
            // 查询所有币种
            getCoinList() {
                let _this = this;
                $.ajax({
                    url: './../../../static/mock/coinListMock.json',
                    // type: "POST",
                    type: "GET",
                    dataType: "json",
                    success: function(res) {
                        _this.coins = res.coins;
                        for (var i = 0; i <_this.coins.length; i++) {
                            _this.$set(_this.coinFlags, _this.coins[i].key, false);
                        }
                    },
                    error: function(err){
                        console.log(err);
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
                _this.currentPage = 1;
                _this.listTableData = [];

                // 查询该点击币种的钱包地址
                _this.queryCoinAddr(clickCoin);

                // 查询该点击币种的充值记录
                _this.initListTable(1, clickCoin);
            },

            // 查询当前币种的钱包地址
            queryCoinAddr(coinName) {
                let _this = this;
                $.ajax({
                    type: "GET",
                    url: "./../../../static/mock/userCoinAddrMock.json",
                    dataType: "json",
                    success: function(res) {
                        if(res.isSuc) {
                            _this.coinAddress = coinName+ "_" + res.data;
                        } else {
                            alert(res.des);
                        }
                    },
                    error: function(err) {
                        //alert('网络访问出错，请稍后重试。');
                        console.log(err);
                    }
                });
            },

            // 获取当前币种充值地址
            getCoinAddr(coinName) {
                let _this = this;
                _this.coinAddress = coinName + "_ABCDefGHijkLMnOpQrStuvWxyZ";
            },

            // 地址复制成功
            onCopySuccess(e) {
                console.log(e);
                alert("复制成功：" + e.text);
            },
            // 地址复制失败
            onCopyError(e) {
                alert("无法复制文本");
                console.error(e);
            },

            // 当前币种充值记录
            initListTable(currentPage, currentCoin){
                let _this = this;
                let currentTab = _this.currentTab;
                $.ajax({
                    // url: "https://vip.zb.com/u/payin/chargerecord/coinAjax?tab=" + currentTab + "&page=" + currentPage + "&pageSize=10&coint=" + currentCoin,
                    url: "./../../../static/mock/payinDetailMock.json",
                    type: "GET",
                    dataType: "json",
                    success: function(json){
                        if (json.isSuc) {
                            _this.currentPage = json.datas.pageIndex;

                            if ((!json.datas.list || json.datas.list.length <= 0)) {
                                if (currentPage == 1) {
                                    _this.listTableData = [];
                                }
                                $('#moreBtnWrap').hide();
                            } else {
                                _this.listTableData = _this.listTableData.concat(json.datas.list);
                                $('#moreBtnWrap').show();
                            }
                        } else {
                            alert(json.des);
                        }
                    },
                    error: function(err) {
                        // alert('网络访问出错，请稍后重试。');
                        console.log(err);
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
                    url: "./../../../static/mock/userCoinListMock.json",
                    //contentType: "application/json",
                    dataType: "json",
                    success: function(res) {
                        if(res.isSuc && res.datas.length) {
                            res.datas.map(function(coin) {
                                var coinName = coin.currency;
                                _this.coinFlags[coinName] = true;
                            });
                            _this.userCoinList = res.datas;
                        }
                    }
                })
            },

            // 自选币种编辑(选中/去选中)
            editUserCoins(coinName, isChoose) {
                let _this = this;
                let status = (isChoose == true)? '2' : '1';
                _this.coinFlags[coinName] = !isChoose;
                
                var data = {
                    coinName: coinName,
                    status: status
                }
                $.ajax({
                    type: "POST",
                    url: "https://vip.zb.com/user/doEditUserCoin",
                    dataType: "jsonp",
                    data: data,
                    success: function(res){
                        if(res.isSuc){
                            // JuaBox.showRight('操作成功');
                            alert('操作成功');
                        }
                    },
                    error: function(err){
                        // check.attr("checked", false);
                        // JuaBox.showRight(JSON.parse(err.responseText).des);
                        _this.coinFlags[coinName] = isChoose;
                        alert("自选币种编辑失败！");
                        console.log(err);
                    }
                })
            }
        },
        watch: {

        },
        created() {
            let _this = this;
            let _routerCoin = _this.$route.params[0];
            console.log(_this.$route.params);
            if (_routerCoin) {
                _this.currentCoin = _routerCoin;
            } else {
                _this.currentCoin = 'usdt';
            }

            let _currentCoin = _this.currentCoin;

            _this.getCoinList(); // 查询所有币种和用户自选币种
            _this.queryCoinAddr(_currentCoin); // 查询当前币种地址
            _this.initListTable(1, _currentCoin); // 当前币种充值记录
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

</style>
