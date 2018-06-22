<template>  
    <div class="finance-rd">
        <div class="bk-tabList">
            <div class="bk-tabList-hd">
                <div class="btn-group bk-btn-group mt10 pull-left" role="group">
                    <h6 style="color:#353d41; font-size:16px; font-weight: bold;">
                        <i class="icon_asset_all"></i>资金账户管理
                    </h6>
                </div>
            </div>

            <!-- 选择资金账户管理币种    自选记录 -->
            <div class="bk-tabList-bd" style="padding:20px;">
                <div class="bk-onekey-form fund-account sel-coin-row">
                    <!-- 选择资金账户管理币种 -->
                    <div class="col-sm-4 paddingRight0">
                        <h6>选择资金账户管理币种</h6>
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
                                    <li v-for="item in coinList" :key="item.index" :class="{'not-open': !item.isCanRecharge}" 
                                        :data-coin="item.key" 
                                        :data-unittag="item.unitTag" 
                                        @click="switchCoin(item.key, currentCoin, item.isCanRecharge)">{{item.enName}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 自选记录 -->
                    <div class="col-sm-8 optional-record paddingRight0">
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
                </div>

                <!-- 自选币种弹出框 -->
                <div id="optional-popup">
                    <div class="popup-box">
                        <a class="close" @click="toggleOptional(false)"><i class="fa fa-close"></i></a>
                        <h5><span class="popup_title">自选币种设置</span><span class="popup_subtitle">( 最多选择5个 )</span></h5>
                        <div class="separate_line"></div>
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

                <!-- 地址 -->
                <div class="bk-address">
                    <ul class="row">
                        <!-- 添加地址按钮 -->
                        <li class="empty col-xs-6 col-md-4">
                            <div class="inner" id="addBlock_usdt" @click="addDialogVisible = true">
                                <div class="add">
                                    <i class="fa fa-plus-circle ft24"></i>
                                    <p style="margin-top: 10px;">添加地址</p>
                                </div>
                            </div>
                        </li>

                        <!-- 提币地址 -->
                        <li class="item col-xs-6 col-md-4" v-for="itemAddr in coinAddress" :key="itemAddr.key">
                            <div class="inner">
                                <div class="address_head">
                                    <p class="address_delete_wrap">
                                        <span data-id="12111" title="删除" class="address_delete"><i class="fa fa-trash-o ft16"></i></span>
                                    </p>
                                </div>
                                <div class="address_body">
                                    <p class="address_title_wrap">
                                        <a data-id="12111" class="address_title">{{currentCoin}}_{{itemAddr.memo}}</a>
                                    </p>
                                    <p class="address">{{itemAddr.address}}</p>
                                </div>
                                <div class="address_foot">
                                    <router-link :to="'/payout/'+currentCoin" data-id="12111" target="_blank" class="btn_payout">提币</router-link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- 添加地址对话框 -->
                <el-dialog :visible.sync="addDialogVisible" width="640px" center class="add_address_dialog borderRadius10">
                    <div slot="title" class="dialog-title">
                        <h5><span class="popup_title">添加{{currentCoin.toUpperCase()}}地址</span></h5>
                        <div class="separate_line"></div>
                    </div>
                    <el-form :model="addAddressForm" class="add_address_form">
                        <el-form-item label=" " :label-width="formLabelWidth">
                            <el-input v-model="addAddressForm.address" placeholder="接收地址" auto-complete="off" class="borderRadius10"></el-input>
                        </el-form-item>
                        <el-form-item label=" " :label-width="formLabelWidth">
                            <el-input v-model="addAddressForm.memo" placeholder="地址昵称" auto-complete="off" class="borderRadius10"></el-input>
                        </el-form-item>
                        <el-form-item label=" " :label-width="formLabelWidth">
                            <el-input v-model="addAddressForm.safepwd" placeholder="资金安全码" auto-complete="off" type="password" class="borderRadius10"></el-input>
                        </el-form-item>
                        <el-form-item label=" " :label-width="formLabelWidth">
                            <el-input v-model="addAddressForm.mobileCode" placeholder="短信验证码" auto-complete="off" class="borderRadius10"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addDialogVisible = false" class="add_address_btn">确 定</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- <div slot="footer" class="add_address_footer">
                        <el-button @click="addDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
                    </div> -->
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    $(function () { 
        $("[data-toggle='popover']").popover();
    });
    export default {
        name: 'finance_rd_account',
        data() {
            return {
                searCoinName: '',
                coins: [],
                coinFlags: {},
                userCoinList: [],
                coinAddress: [],
                currentCoin: 'usdt',
                addDialogVisible: false,
                addAddressForm: {
                    address: '',
                    memo: '',
                    safepwd: '',
                    mobileCode: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '0px'
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
        filter: {

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
                window.location.hash = "#/account/"+clickCoin;
                _this.currentCoin = clickCoin;

                // 查询该点击币种的账户地址
                _this.queryCoinAddr(clickCoin);

            },

            // 查询当前币种的账户地址
            queryCoinAddr(coinName) {
                let _this = this;

                $.ajax({
                    type: "GET",
                    url: "./../../../static/mock/payoutCoinHistoryAddr.json",
                    dataType: "json",
                    success: function(res) {
                        if (res.datas && res.datas.length > 0) {
                            _this.coinAddress = res.datas;
                        } else {
                            _this.coinAddress = [];
                        }
                    },
                    error: function(err) {
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
            $(function () { 
                $("[data-toggle='popover']").popover();
            });

            let _this = this;

            let _routerCoin = _this.$route.params[0];
            if (_routerCoin) {
                _this.currentCoin = _routerCoin;
            } else {
                _this.currentCoin = 'usdt';
            }

            let _currentCoin = _this.currentCoin;

            _this.getCoinList(); // 查询所有币种和用户自选币种
            _this.queryCoinAddr(_currentCoin); // 查询当前币种地址
        },
        mounted() {
            
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .fund-account {
        text-align: left;
        padding-left: 0;
        padding-top: 0;
        height: 100px;
        border-bottom: 1px dotted #eee;
        margin-bottom: 10px;
    }

    .address_head {
        color: #333;

        .address_delete_wrap {
            color: rgb(153, 153, 153);
            text-align: right;
            margin-bottom: 0;
            cursor: pointer;

            .address_delete:hover {
                color: #ffa338;
            }
        }
    }

    .address_body {
        color: #333;
        margin-bottom: 18px;

        .address_title_wrap {
            color: rgb(153, 153, 153);
            text-align: center;

            .address_title {
                color: RGBA(102, 102, 102, 1);
                display: inline-block;
                max-width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
                text-decoration: none;
                font-weight: bold;
                cursor: pointer;
            }
        }

        .address {
            color: rgba(102,102,102,1);
            word-break: break-all;
        }
    }

    .address_foot {
        text-align: center;
        .btn_payout {
            display: inline-block;
            width: 60px;
            height: 30px;
            line-height: 28px;
            text-decoration: none;
            border: 1px solid rgba(230, 230, 230, 1);
            border-radius: 3px;
            background: rgba(250,250,250,1);
            color: rgba(102,102,102,1);
        }

        .btn_payout:hover {
            color: #ffa338;
            border-color: #ffa338;
            background: #fff;
        }
    }
    
    .bk-address .inner a.address_title:hover {
        color: #ffa338;
    }
    .popup-box .coin-list li label.choosed {
        border-color: #ffa338;
    }

    /* 重写 Element 对话框样式 */
    .add_address_form {
        padding: 0 75px;
    }
    .add_address_btn {
        color: #7280e8;
        background: #fff;
        border-radius: 25px;
        border: 3px solid #7280e8;
        font-weight: bold;
        width: 280px;
        font-size: 20px;
        margin-left: 80px;
        margin-top: 10px;
    }
</style>
