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
                                    <li v-for="item in coinList" :key="item.index"
                                        :data-coin="item.coinNameEn" 
                                        @click="switchCoin(item.coinNameEn, item.isCanRecharge)">{{item.coinNameEn}}
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
                            <a v-for="item in userCoinList" :key="item.index" :data-coin="item.coinNameEn" v-if="item.status == 1" 
                                :class="{'coin_selected': item.coinNameEn.toUpperCase() == currentCoin.toUpperCase()}"  
                                @click="switchCoin(item.coinNameEn, true)">{{item.coinNameEn.toUpperCase()}}
                            </a>
                        </div>
                    </div>
                </div>

                <!-- 自选币种弹出框 -->
                <div id="optional-popup">
                    <div class="popup-box">
                        <a class="close" @click="toggleOptional(false)"><i class="fa fa-close"></i></a>
                        <h5><span class="popup_title">自选币种设置</span><span class="popup_subtitle"></span></h5>
                        <div class="separate_line"></div>
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
                                        <span data-id="itemAddr.addrId" title="删除" class="address_delete" @click="delAddress(itemAddr.addrId)">
                                            <i class="fa fa-trash-o ft16"></i>
                                        </span>
                                    </p>
                                </div>
                                <div class="address_body">
                                    <p class="address_title_wrap">
                                        <a data-id="12111" class="address_title">{{itemAddr.addressTab}}</a>
                                    </p>
                                    <p class="address">{{itemAddr.address}}</p>
                                </div>
                                <div class="address_foot">
                                    <router-link :to="'/payout/'+currentCoin+'?addrId='+itemAddr.addrId" :data-id="itemAddr.addrId" target="_blank" class="btn_payout">提币</router-link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- 添加地址对话框 -->
                <el-dialog :visible.sync="addDialogVisible"  :before-close="handleClose" width="640px" center class="add_address_dialog borderRadius10">
                    <div slot="title" class="dialog-title">
                        <h5><span class="popup_title">添加{{currentCoin.toUpperCase()}}地址</span></h5>
                        <div class="separate_line"></div>
                    </div>
                    <el-form :model="addAddressForm" ref="addAddressForm" :rules="addAddressRules" class="add_address_form">
                        <el-form-item prop="address">
                            <el-input v-model="addAddressForm.address" placeholder="接收地址" auto-complete="off" class="borderRadius10"></el-input>
                        </el-form-item>
                        <el-form-item prop="addressNick">
                            <el-input v-model="addAddressForm.addressNick" placeholder="地址昵称" auto-complete="off" class="borderRadius10"></el-input>
                        </el-form-item>
                        <el-form-item prop="safePwd">
                            <el-input v-model="addAddressForm.safePwd" placeholder="资金安全码" auto-complete="off" type="password" class="borderRadius10"></el-input>
                        </el-form-item>
                        <el-form-item prop="msgCode">
                            <el-input v-model="addAddressForm.msgCode" placeholder="短信验证码" auto-complete="off" class="borderRadius10"></el-input>
                            <input type="button" name="addSendCodeBtn" id="addSendCodeBtn" class="send_code_btn" v-model="addAddressForm.addSendCodeText" @click="addAddrSendCode()"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" id="addAddressBtn" @click="addAddressSubmit('addAddressForm')" class="add_address_btn">确 定</el-button>
                        </el-form-item>
                    </el-form>
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
            var checkSafePed = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入资金安全密码'));
                } else {
                    var regSafePwd = /^\d{6}$/;

                    if (!regSafePwd.test(value)) {
                        callback(new Error('资金安全密码为6位数字'));
                    }
                    callback();
                }
            };

            return {
                searCoinName: '',
                coins: [],
                coinFlags: {},
                userCoinList: [],
                coinAddress: [],
                coinObjects: {},
                currentCoin: 'usdt',
                currentCoinId: '',

                addDialogVisible: false,
                addAddressForm: {
                    address: '',
                    addressNick: '',
                    safePwd: '',
                    msgCode: '',
                    countdown2: 60,
                    addSendCodeText: '点击获取',
                },
                formLabelWidth: '0px',

                addAddressRules: {
                    address: [
                        { required: true, message: '请填写正确的接收地址', trigger: ['blur', 'change']}
                    ],
                    safePwd: [
                        { required: true, message: '请输入资金安全密码', trigger: 'blur'},
                        { validator: checkSafePed, trigger: ['blur', 'change'] }
                    ],
                    msgCode: [
                        { required: true, message: '请输入验证码', trigger: ['blur', 'change']}
                    ]
                }
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
        filter: {

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
                            }
                            let coinObjs = {};

                            for (var i = 0; i <_this.coins.length; i++) {
                                let coin = _this.coins[i];

                                _this.$set(_this.coinFlags, coin.coinNameEn, false); // 用于标记当前选择币种是否和自选中一致

                                if(currentCoin == coin.coinNameEn) {
                                    _this.currentCoinId = coin.coinId;
                                }

                                coinObjs[coin.coinNameEn] = {
                                    "coinId": coin.coinId,
                                    "coinNameEn": coin.coinNameEn
                                };
                            }

                            _this.coinObjects = coinObjs;

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
            },

            // 选择充值币种
            switchCoin(clickCoin, isCanRecharge) {
                let _this = this;
                let currentCoin = this.currentCoin;

                if(clickCoin == currentCoin) {
                    return;
                }
                window.location.hash = "#/account/"+clickCoin;
                _this.currentCoin = clickCoin;

                if(_this.coinObjects && _this.coinObjects[clickCoin]){
                    _this.currentCoinId = _this.coinObjects[clickCoin].coinId;
                } else {
                    _this.currentCoinId = '';
                }

                // 查询该点击币种的账户地址
                _this.queryCoinAddr(clickCoin);

            },

            // 查询当前币种的账户地址
            queryCoinAddr(coinName) {
                let _this = this;

                $.ajax({
                    type: "GET",
                    url: '/web/address/getAddress/'+ coinName,
                    dataType: "json",
                    success: function(res) {
                        if (res.code == 200) {
                            if (res.data && res.data.length > 0) {
                                _this.coinAddress = res.data;
                            } else {
                                _this.coinAddress = [];
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
            
            // 删除地址
            delAddress(addrId) {
                let _this = this;
                let _currentCoin = this.currentCoin;

                this.$confirm('此操作将永久删除该地址, 是否继续?', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type: 'GET',
                        url: '/web/address/delAddress/'+encodeURIComponent(addrId),
                        dataType: 'json',
                        success: function(res) {
                            if (res.code == 200) {
                                _this.queryCoinAddr(_currentCoin);
                                _this.$message({
                                    type: 'success',
                                    message: '删除地址成功!'
                                });
                            } else {
                                 _this.$message({
                                    type: 'error',
                                    message: '删除地址失败!'
                                });
                            }
                        },
                        error: function(err) {
                            _this.msgConfirm('删除地址失败！', '', 'error');
                        }
                    });
                }).catch(() => {

                });
            },

            // 添加地址：发送短信验证码
            addAddrSendCode() {
                let _this = this;

                $.ajax({
                    type: 'POST',
                    url: '/web/address/sendAddAddrMsg/'+this.currentCoin,
                    dataType: "json",
                    success: function (res) {
                        if (res.code == 200) {
                            _this.addSetTime($('#addSendCodeBtn'));
                        } else {
                            _this.msgConfirm(res.msg, "", "error");
                        }
                    },
                    error: function (err) {
                        _this.msgConfirm('呀，出错啦。。。', '', 'error');
                    }
                });
            },

            // 添加地址：发送验证码倒计时
            addSetTime(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.addAddressForm.countdown2 == 0) {
                    _obj.removeAttr("disabled");
                    _this.addAddressForm.addSendCodeText = "点击获取";
                    _this.addAddressForm.countdown2 = 60;
                } else {
                    _obj.attr("disabled", true);
                    _this.addAddressForm.addSendCodeText = "已发送"+"(" + _this.addAddressForm.countdown2 + ")";
                    _this.addAddressForm.countdown2--;
                    _this.addAddrTimeout = setTimeout(function() {
                        _this.addSetTime(_obj);
                    }, 1000);
                }
            },

            // 添加地址: 提交
            addAddressSubmit(formName) {
                let _this = this;
                let _addAddressForm = this.addAddressForm;

                let _address = _addAddressForm.address;
                var _addressNick = _addAddressForm.addressNick;
                var _safePwd = _addAddressForm.safePwd ;
                var _msgCode  = _addAddressForm.msgCode ;

                var _coinName  = this.currentCoin.toUpperCase();
                var _codeId = this.currentCoinId;

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        $("#addAddressBtn").button("loading");

                        let addAddressData = {
                            "coinId": _codeId,
                            "coinName": _coinName,
                            "addressNick": _addressNick,
                            "receiveAddress": _address,
                            "safePwd": _safePwd,
                            "msgCode": _msgCode
                        };

                        $.ajax({
                            url: '/web/address/addAddress',
                            type: "POST",
                            contentType : "application/json",
                            data: JSON.stringify(addAddressData),
                            dataType: "json",
                            complete: function() {
                                $("#addAddressBtn").button("reset");
                            },
                            success: function(res) {
                                if (res.code == 200) {
                                    _this.$alert('提币地址添加成功', {
                                        confirmButtonText: '确定',
                                        type: 'success',
                                        callback: action => {
                                            _this.resetField();
                                            _this.addDialogVisible = false;
                                            _this.queryCoinAddr(_coinName);
                                        }
                                    });
                                } else {
                                    _this.msgConfirm(res.msg, '', 'error');
                                }
                            }
                        });
                    }
                });
            },

            // 添加地址弹窗关闭
            handleClose(done) {
                this.resetField();
                done();
            },

            // 重置添加地址弹窗
            resetField() {
                this.$refs.addAddressForm.resetFields();
                $("#addSendCodeBtn").attr("disabled", false);
                this.addAddressForm.addSendCodeText = '点击获取';
                this.addAddressForm.countdown2 = 60;
                if (this.addAddrTimeout) {
                    clearTimeout(this.addAddrTimeout)
                }
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

            _this.getCoinList(_currentCoin); // 查询所有币种和用户自选币种
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

    input.send_code_btn {
        position: absolute;
        top: 0px;
        right: 0;
        cursor: pointer;
        padding-left: 10px;
        padding-right: 10px;
        margin: 10px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #ffa338;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        border: none;
        text-decoration: none;
        outline: none;
    }
    input.send_code_btn:hover {
        background-color: #F8932C;
    }

    button[disabled], input[disabled] {
        cursor: not-allowed;
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
    .add_address_btn:hover {
        color: #fff;
        background: #7280e8;
    }
</style>
