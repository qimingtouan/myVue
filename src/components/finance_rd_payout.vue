<template>  
    <div class="finance-rd">
        <div class="bk-tabList">
            <div class="bk-tabList-hd clearfix">
                <div class="btn-group bk-btn-group" role="group">
                    <a href="javascript:;" class="btn sinspan" role="button">
                        <i class="fa fa-sign-out icon_sin"></i>提币
                    </a>
                </div>
            </div>
            
            <input type="hidden" id="googleAuth" value="0">
            <input type="hidden" id="payGoogleAuth" value="false">
            <input type="hidden" id="mobileStatu" value="2">
            <input type="hidden" id="emailStatu" value="2">
            <input type="hidden" id="payMobileAuth" value="true">
            <input type="hidden" id="payEmailAuth" value="false">

            <!-- 选择提币币种  费率规则-->
            <div id="downloadForm" class="bk-tabList-bd payout">
                <div class="bk-tabList-bd">
                    <div id="stepOneForm" class="table-responsive">
                        <div class="bk-onekey-form">
                            <form role="form" id="downloadForm" class="form-horizontal" method="post" action="" autocomplete="off">
                                <input type="hidden" id="opUnique" name="opUnique" value="1526894861513">
                                <input type="hidden" id="price" name="price" v-model="price">
                                <input type="hidden" id="canWithdraw" name="canWithdraw" v-model="canWithdraw">
                                <input type="hidden" id="coint" name="coint" v-model="currentCoin">

                                <!-- 选择提币币种 -->
                                <div class="sel-coin-row clearfix">
                                    <!-- 选择提币币种 -->
                                    <div class="col-sm-5">
                                        <h6>选择提币币种</h6>
                                        <div class="dropdown">
                                            <a id="sel-coin" class="dropdown-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span id="current-sel">{{currentCoin}}</span>
                                                <span class="caret"></span>
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="sel-coin">
                                                <ul id="d-coins" class="coin-list">
                                                    <div class="search-coin">
                                                        <input placeholder="搜索提币币种" id="searCoinName" v-model="searCoinName">
                                                        <a><i class="fa fa-search"></i></a>
                                                    </div>
                                                    <li v-for="item in coinList" :key="item.index" :class="{'not-open': !item.canRecharge}" 
                                                        :data-coin="item.coinNameEn" 
                                                        @click="switchCoin(item.coinNameEn, item.canRecharge)">{{item.coinNameEn}}
                                                    </li>
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

                                <!-- 初级实名认证 -->
                                <div id="needSimpleAuthDiv"  v-if="authLevel ==0" class="form-group has-feedback line-2">
                                    <div class="shimingpoper">
                                        <p><img src="/static/img/shimingtopicon.png"></p>
                                        <div class="notice">
                                            根据您在本站的资金综合状况，为了您的资产安全，您需要进行实名认证，才能继续相关资金操作。
                                            <p>
                                                <a href="/views/auth/auth.html#/idcard" class="btn btn-blue btn-help">
                                                    <i class="bk-ico btn-blue-send"></i>立即认证
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <!-- 高级实名认证 -->
                                <div id="needDepthAuthDiv" class="form-group has-feedback line-2 hide">
                                    <div class="shimingpoper">
                                        <p><img src="https://s.zb.com/statics/img/v2/user/shimingtopicon.png"></p>
                                        <div class="notice">
                                            根据您在本站的资金综合状况，为了您的资产安全，您需要进行高级实名认证，才能继续相关资金操作。
                                            <p><a href="/u/auth/depth" class="btn btn-blue btn-help"><i class="bk-ico btn-blue-send"></i>立即高级认证</a></p>
                                        </div>
                                    </div>
                                </div>
                                <!-- 初级实名认证正在审核中 -->
                                <div id="waitSimpleAuthDiv" class="form-group has-feedback line-2 shimingpoper hide">
                                    <div class="morerz ">
                                        <div class="auditpic">
                                            <img src="https://s.zb.com/statics/img/v2/user/audit_icon.gif">
                                        </div>
                                        <div class="noticetext">
                                            <h3>初级实名认证正在审核中</h3>
                                            <h4>等待通过后再尝试</h4>
                                        </div>
                                    </div>
                                </div>
                                <!-- 高级实名认证正在审核中 -->
                                <div id="waitDepthAuthDiv" class="form-group has-feedback line-2 shimingpoper hide">
                                    <div class="morerz">
                                        <div class="auditpic">
                                            <img src="https://s.zb.com/statics/img/v2/user/audit_icon.gif">
                                        </div>
                                        <div class="noticetext">
                                            <h3>高级实名认证正在审核中</h3>
                                            <h4>等待通过后再尝试</h4>
                                        </div>
                                    </div>
                                </div>

                                <!-- 提币地址 -->
                                <div id="stepOneFormWrapper" v-if="authLevel !=0">
                                    <div class="form-group has-feedback">
                                        <label class="control-label col-sm-12" for="receiveAddress">提币至：
                                            <router-link :to="'/account/'+currentCoin" id="historyAddr" target="_blank">地址管理</router-link>
                                        </label>
                                        <div id="addressGroup">
                                            <div class="col-sm-12">
                                                <div class="drop-group dropdown">
                                                    <div class="dropdown-toggle clearfix" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <input type="text" name="receiveAddress" id="receiveAddress" v-model="receiveAddress"
                                                                readonly="readonly" 
                                                                class="form-control form-second smallfont" 
                                                                errmsg="请输入正确的提现钱包地址" 
                                                                aria-describedby="receiveAddress_error">
                                                    </div>
                                                                
                                                    <div class="input-drop  dropdown-menu" aria-labelledby="addressGroup">
                                                        <ul id="ul_myBanks">   
                                                            <li id="addBlock_btc" class="firstChild" @click="addDialogVisible = true">
                                                                <span class="text-second">+ 快速添加接收地址</span>
                                                            </li>
                                                            <li v-for="item in coinAddress" :key="item.key" @click="addrClick(item.address)">
                                                                <p class="mb0 text-second">{{item.addressTab}}</p>
                                                                <span>{{item.address}}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- 提币数量   网络手续费 -->
                                    <div class="row">
                                        <div class="col-sm-6 paddingRight0">
                                            <div class="form-group has-feedback">
                                                <label class="control-label col-sm-12" for="cashAmount">提币数量：</label>
                                                <div class="col-sm-12">
                                                    <input type="text" id="cashAmount" name="cashAmount"  v-model="cashAmount"
                                                            class="form-control form-second pull-left inputlong smallfont" 
                                                            :placeholder="payoutDisable?'可提现金额不足'+cashLimitMin+currentCoin: ''"  :disabled="payoutDisable">
                                                    <div class="pull-left" style="margin-top:15px; margin-left:5px;  ">
                                                        <em class="bigfont" style="font-style: normal;">扣除手续费后实际到账：</em>
                                                        <span id="paymentCny" class="bkNum">0.00</span>{{currentCoin}}
                                                    </div>
                                                </div>
                                                <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                                                <span id="cashAmount_error" class="help-block text-danger"></span>
                                            </div>
                                        </div>
                                                        
                                        <div class="col-sm-6 paddingLeft0">
                                            <div class="form-group has-feedback">
                                                <label class="control-label col-sm-12 fees_title" for="fees">
                                                    <span class="bluepopover" role="button" style="display:inline-block; border-bottom:1px dashed #999;" 
                                                        data-toggle="popover" data-placement="top" data-html="true" data-trigger="hover" 
                                                        data-content="<p>该费用用于网络确认，一般情况下手续费越高网络确认速度越快，网络拥堵时，会优先处理手续费高的提币。</p>"
                                                        data-original-title="" title="">网络手续费
                                                    </span>：
                                                </label>
                                                <div class="col-sm-12">
                                                    <div class="drop-group " id="feeGroup">
                                                        <div class="dropdown-toggle clearfix" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <input type="text" id="fees" name="fees" v-model="fees" 
                                                                class="form-control form-second inputlong fees" 
                                                                aria-describedby="fees_error" readonly="readonly">
                                                        </div>
                                                        <!-- <div class="input-drop dropdown-menu" aria-labelledby="feeGroup">
                                                            <ul id="ulFees">
                                                                <li v-for="itemFee in feeList" :key="itemFee.key"><span>{{itemFee}}</span></li>
                                                            </ul>
                                                        </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-sm-12 text-left clearfix">
                                                    <label style="font-weight:normal; ">网络手续费从提币数量中扣除</label>  
                                                 </div>
                                            </div>   
                                        </div>    
                                    </div>

                                    <!-- 资金安全密码   短信验证 -->
                                    <div class="row">
                                        <div class="col-sm-6 paddingRight0">
                                            <div id="safePwdDiv" class="form-group has-feedback">
                                                <label class="control-label col-sm-12" for="safePwd">资金安全密码：</label>
                                                <div class="col-sm-12">
                                                    <input type="password" id="safePwd" name="safePwd" v-model="safePwd"
                                                        class="form-control form-second pull-left inputlong smallfont"  
                                                        errmsg="请输入资金安全密码">
                                                </div>
                                                <span id="safePwd_error" class="help-block text-danger"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 paddingLeft0">
                                             <div id="validPhoneCode">
                                                <div class="form-group has-feedback">
                                                    <label class="control-label col-sm-12" for="mobileCode">短信验证码：</label>
                                                    <div class="col-sm-12">
                                                        <input type="text" id="mobileCode" name="mobileCode" v-model="mobileCode" 
                                                                class="form-control form-second" 
                                                                pattern="limit(4,6)" 
                                                                errmsg="您填写正确的短信/邮件验证码!" aria-describedby="mobileCode_error">
                                                        <input type="button" name="sendCodeBtn" id="sendCodeBtn" v-model="sendCodeText" 
                                                                @click="sendCode()" 
                                                                :disabled="payoutDisable">
                                                    </div>
                                                    <span id="mobileCode_error" class="help-block text-danger"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 提币按钮 -->
                                    <div class="form-group col-sm-12">
                                        <span class="separate_line_gray col-sm-4"></span>
                                        <div class="col-sm-4 paysendbtn newpopover">
                                            <button id="payoutSubmitBtn" type="button" data-loading-text="Loading..." 
                                                    class="btn btn-lg ft18 nb_btn_payout" 
                                                    @click="payoutSubmit()" :disabled="payoutDisable">
                                                    提 币
                                            </button>
                                        </div>
                                        <span class="separate_line_gray col-sm-4"></span>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </form>
                        </div>
                    </div>      
                </div>

                <!-- 费率规则 -->
                <div class="ctips user_main_title3" style="margin:0 30px 10px 30px;">
                    <div style="position:absolute; top:25px; left:30px;">
                        <a style="display: block;">
                            <img src="../assets/img/tipicon_payout.png">
                        </a>
                    </div>
                    <p class="nb_ctips_text">
                        <span class="text_uppercase">{{currentCoin}}</span>
                        <span>提现<a href="/views/service/service.html#/fees"  target="_blank"> 费率规则：</a></span><br>
                        <em style="color:rgba(251,85,85,1);">* 为了用户资金安全，平台可能会电话确认您的提币操作，请注意接听；</em><br>
                        <em style="color:rgba(251,85,85,1);">* <span class="text_uppercase text_red font_w_normal">{{currentCoin}}</span>充值经过 {{confirmRecharge}} 个确认后，才允许提现；</em><br>
                        <em style="color:rgba(251,85,85,1);">* 可提现金额≤账户可用资产-未经确认的数字资产。</em><br>
                    </p>
                    <div class="close" title="关闭">×</div>
                </div>
            </div>
        </div>

        <!-- 表格：提币记录 -->
        <div class="bk-onelist recordlistcont">
            <div id="shoplist" class="table-responsive">
                <input type="hidden" id="lastRecordId" v-model="lastRecordId">

                <el-table id="ListTable" :data="listTableData" style="width:100%; font-size:12px; text-align:left;" tooltip-effect="light" stripe 
                            empty-text="暂时没有相关记录">
                    <el-table-column prop="applyTime" label="提交时间" show-overflow-tooltip  width="160"></el-table-column>
                    <el-table-column prop="cashAddress" label="接收地址" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="handlingTime" label="处理时间" show-overflow-tooltip width="160"></el-table-column>
                    <el-table-column label="状态" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div v-if="scope.row.status == 2"><i class="fa fa-check success"></i>成功</div>
                            <div v-if="scope.row.status == 1"><i class="el-icon-loading mr5"></i>处理中</div>
                            <div v-if="scope.row.status == 0"><i class="el-icon-loading mr5"></i>待确认</div>
                            <div v-if="scope.row.status == -1"><i class="fa fa-times fail"></i>失败</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="actualAmount" :label="'实到金额('+currentCoin+')'" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="withdrawFee" :label="'手续费('+currentCoin+')'" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="80" align='center'>
                        <template slot-scope="scope">
                            <a class="operate_delete" @click="delRecord(scope.row.withdrawId)"><i class="fa fa-trash-o ft13 delete"></i>删除</a>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="bk-moreBtn" style="display: none;" id="moreBtnWrap">
                    <button id="morebtn" class="btn btn-outline" type="button" @click="initListTable(currentCoin, lastRecordId)">
                        <i class="fa fa-angle-down fa-fw"></i>更多
                    </button>
                </div>
            </div>
        </div>

        <!-- 添加地址对话框 -->
        <el-dialog :visible.sync="addDialogVisible" :before-close="handleClose" width="640px" center class="add_address_dialog borderRadius10">
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
</template>

<script>
    import M from './../assets/js/common_method'
    import formatTime from "@/assets/js/formatTime"
    export default {
        name: 'finance_rd_payout',
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
                authLevel: 1,
                searCoinName: '',
                coins: [],
                coinFlags: {},
                coinObjects: {},
                userCoinList: [],
                currentCoin: 'USDT',
                currentCoinId: '',
                price: '',
                confirmRecharge: '--',
                confirmList: {},
                lastRecordId: '',
                listTableData: [],

                receiveAddress: '',
                coinAddress: [],
                canWithdraw: 0,
                cashLimitMin: 0,
                cashLimitMax: '',
                scale: 18,
                coinAvailable: {},
                cashAmount: '',
                fees: '',
                coinFees: {},
                feeList: [],
                payoutDisable: false,
                safePwd: '',
                mobileCode: '',
                countdown: 60,
                sendCodeText: '点击获取',

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
            // 校验提币数量
            checkCashAmount(_cashAmount) {
                let _this = this;
                let _scale = this.scale;

                // _cashAmount = M.fixDecimal(_cashAmount, _scale);

                let _canWithdraw = this.canWithdraw;
                if (!_canWithdraw) {
                    _canWithdraw = 0;
                }

                let _cashLimitMin = this.cashLimitMin;
                if (!_cashLimitMin) {
                    _cashLimitMin = 0;
                }
                var _fees = this.fees;

                let callBackMsg = '';

                if (_canWithdraw < _cashLimitMin) {
                    callBackMsg = "可提现金额不足"+ this.cashLimitMin + this.currentCoin;
                    return callBackMsg;
                }

                if (_cashAmount == '') {
                    callBackMsg = "请输入提币数量";
                    return callBackMsg;
                }
                if (!M.isFloat(_cashAmount)) {
                    $("#cashAmount").focus();
                    callBackMsg = "请输入正确的提币数量";
                    return callBackMsg;
                }
                if (_cashAmount < _cashLimitMin) {
                    callBackMsg = "提现金额不能小于"+ this.cashLimitMin + this.currentCoin;
                    return callBackMsg;
                }
                if (_cashAmount > _canWithdraw) {
                    callBackMsg = "您的最大提现金额是：" + _canWithdraw + this.currentCoin +"，请重新输入。";
                    return callBackMsg;
                }
                
                return '';
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
                                _this.$set(_this.coinFlags, coin.coinNameEn, false);
                                _this.$set(_this.confirmList, coin.coinNameEn, coin.sysCashBlock); // 提现确认次数

                                if (_this.coins[i].available) {
                                    _this.$set(_this.coinAvailable, coin.coinNameEn, M.fixDecimal(coin.available, coin.scale)); // 可提现金额
                                } else {
                                    _this.$set(_this.coinAvailable, coin.coinNameEn, 0); 
                                }

                                if (_this.coins[i].cashRate) {
                                    _this.$set(_this.coinFees, coin.coinNameEn, M.fixDecimal(coin.cashRate, coin.scale)); // 提现手续费
                                } else {
                                    _this.$set(_this.coinFees,coin.coinNameEn, ''); 
                                }

                                let _limitMin = coin.cashLimitMin;
                                if (!_limitMin) {
                                    _limitMin = 0;
                                }

                                if(currentCoin == coin.coinNameEn) {
                                    _this.currentCoinId = coin.coinId;
                                    _this.cashLimitMin = M.fixDecimal(_limitMin, coin.scale);
                                    _this.cashLimitMax = M.fixDecimal(coin.cashLimitMax, coin.scale);
                                    _this.canWithdraw = M.fixDecimal(coin.available, coin.scale);
                                    _this.scale = coin.scale;
                                }

                                coinObjs[coin.coinNameEn] = {
                                    "coinId": coin.coinId,
                                    "coinNameEn": coin.coinNameEn,
                                    "cashLimitMin": M.fixDecimal(_limitMin, coin.scale),
                                    "cashLimitMax": M.fixDecimal(coin.cashLimitMax, coin.scale),
                                    "scale": coin.scale
                                };
                            }

                            _this.coinObjects = coinObjs;

                            if (_this.confirmList && _this.confirmList[currentCoin]) { // 提现确认次数
                                _this.confirmRecharge = _this.confirmList[currentCoin];
                            } else {
                                _this.confirmRecharge = '--';
                            }

                            if (_this.canWithdraw < _this.cashLimitMin || _this.canWithdraw == 0) {
                                _this.payoutDisable = true;
                            }

                            if(_this.coinFees && _this.coinFees[currentCoin]) { // 提现手续费
                                _this.fees = _this.coinFees[currentCoin];
                            } else {
                                _this.fees = '';
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

            // 选择提币币种
            switchCoin(clickCoin, isCanRecharge) {
                let _this = this;
                let currentCoin = this.currentCoin;
                if(clickCoin == currentCoin || false == isCanRecharge) {
                    return;
                }
                window.location.hash = "#/payout/"+clickCoin;
                _this.currentCoin = clickCoin;

                $("#sendCodeBtn").attr("disabled", false);
                this.sendCodeText = '点击获取';
                this.countdown = 60;
                if (this.payoutTimeout) {
                    clearTimeout(this.payoutTimeout);
                }

                if(_this.coinObjects && _this.coinObjects[clickCoin]){
                    _this.currentCoinId = _this.coinObjects[clickCoin].coinId;
                    _this.cashLimitMin = _this.coinObjects[clickCoin].cashLimitMin;
                    _this.cashLimitMax = _this.coinObjects[clickCoin].cashLimitMax;
                    _this.scale = _this.coinObjects[clickCoin].scale;
                } else {
                    _this.currentCoinId = '';
                    _this.cashLimitMin = 0;
                    _this.cashLimitMax = '';
                    _this.scale = '';
                }

                if(_this.coinAvailable[clickCoin]){
                    _this.canWithdraw = _this.coinAvailable[clickCoin];
                } else {
                    _this.canWithdraw = 0;
                }

                if (_this.canWithdraw < _this.cashLimitMin || _this.canWithdraw == 0) {
                    _this.payoutDisable = true;
                } else {
                    _this.payoutDisable = false;
                }

                if (_this.coinFees && _this.coinFees[clickCoin]) {
                    _this.fees = _this.coinFees[clickCoin];
                } else {
                    _this.fees = '';
                }

                if (_this.confirmList && _this.confirmList[clickCoin]) {
                    _this.confirmRecharge = _this.confirmList[clickCoin];
                } else {
                    _this.confirmRecharge = '--';
                }

                _this.lastRecordId = '';
                _this.listTableData = [];

                // 查询该点击币种的提币地址
                _this.queryCoinAddr(clickCoin);

                // 查询该点击币种的提币记录
                _this.initListTable(clickCoin);
            },

            // 查询当前币种的提币地址
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

                                _this.receiveAddress = res.data[0].address.replace(/\s+/g, ""); 
                                
                                let _routerCoinId = _this.$route.query.addrId;
                                if (_routerCoinId) {
                                    for (var i = 0; i< _this.coinAddress.length; i++) {
                                        if(_routerCoinId == _this.coinAddress[i].addrId) {
                                            _this.receiveAddress = _this.coinAddress[i].address;
                                            break;
                                        }
                                    }
                                } 

                            } else {
                                _this.receiveAddress = '',
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

            // 选择提币地址
            addrClick(coinAddress) {
                let _this = this;
                _this.receiveAddress = coinAddress.replace(/\s+/g, "");
            },

            // 当前币种提币记录
            initListTable(currentCoin, lastRecordId){
                let _this = this;
                let _scale = this.scale;
                let payOutRecordUrl = "/web/withdraw/withdrawRecord?coinName="+encodeURIComponent(currentCoin);
                if (lastRecordId) {
                    payOutRecordUrl += "&lastRecordId=" + encodeURIComponent(lastRecordId);
                }

                $.ajax({
                    url: payOutRecordUrl,
                    type: "GET",
                    dataType: "json",
                    success: function(res){
                        if (res.code == 200) {
                            if ((!res.data || res.data.length <= 0)) {
                                if (!lastRecordId) {
                                    _this.listTableData = [];
                                }
                                $('#moreBtnWrap').hide();
                            } else {
                                let detailData = [];
                                detailData = res.data.map(function(item){
                                    let temp = {};
                                    temp.withdrawId = item.withdrawId;
                                    temp.applyTime = item.applyTime;
                                    temp.cashAddress = item.cashAddress;
                                    temp.handlingTime = item.handlingTime;
                                    temp.status = item.status;
                                    temp.actualAmount = M.fixDecimal(item.actualAmount, _scale);
                                    temp.withdrawFee = M.fixDecimal(item.withdrawFee, _scale);
                                    return temp;
                                })

                                _this.listTableData = _this.listTableData.concat(detailData);

                                let _length = _this.listTableData.length;
                                _this.lastRecordId = _this.listTableData[_length-1].withdrawId;

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

            // 删除选中提币记录
            delRecord(recordId) {
                let _this = this;
                let _currentCoin = this.currentCoin;

                this.$confirm('此操作将永久删除该记录, 是否继续?', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.ajax({
                        type: 'POST',
                        url: '/web/withdraw/delWithdrawRecord/'+ encodeURIComponent(recordId),
                        dataType: 'json',
                        success: function(res) {
                            if (res.code == 200) {
                                _this.lastRecordId = '';
                                _this.listTableData = [];
                                _this.initListTable(_currentCoin);

                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                 _this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        },
                        error: function(err) {
                            _this.msgConfirm('删除失败！', '', 'error');
                        }
                    });
                }).catch(() => {

                });
            },

            // 提币发送短信验证码
            sendCode() {
                let _this = this;

                let _currentCoin = this.currentCoin;

                $.ajax({
                    type: "POST",
                    url: '/web/withdraw/sendWithdrawMsg/'+ encodeURIComponent(_currentCoin),
                    dataType: "json",
                    success: function (res) {
                        if (res.code == 200) {
                            _this.settime($('#sendCodeBtn'));
                            _this.msgConfirm(res.msg, '', 'success');
                        } else {
                            _this.msgConfirm(res.msg, '', 'error');
                        }
                    },
                    error: function (err) {
                        _this.msgConfirm('呀，出错啦。。。', '', 'error');
                    }
                });
            },

            // 发送短信验证码倒计时
            settime(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdown == 0) {
                    _obj.removeAttr("disabled");
                    _this.sendCodeText = "点击获取";
                    _this.countdown = 60;
                } else {
                    _obj.attr("disabled", true);
                    _this.sendCodeText = "已发送"+"(" + _this.countdown + ")";
                    _this.countdown--;
                    _this.payoutTimeout = setTimeout(function() {
                        _this.settime(_obj)
                    }, 1000);
                }
            },

            // 提币
            payoutSubmit() {
                let _this = this;

                let _currentCoin = this.currentCoin;
                let _receiveAddress = this.receiveAddress; // 提币地址
                let _cashAmount = this.cashAmount.trim(); // 提币数量
                let _fees = this.fees; // 手续费
                let _safePwd = this.safePwd; // 资金安全码
                let _mobileCode = this.mobileCode.trim(); // 短信验证码

                if(!_receiveAddress) {
                    _this.msgConfirm('请填写正确的接收地址', '', 'error');
                    return;
                }

                if (!_fees) {
                     _this.msgConfirm('请选择正确的矿工费', '', 'error');
                    return;
                }

                let checkCashAmountMsg = this.checkCashAmount(_cashAmount);
                if (checkCashAmountMsg != '') {
                    _this.msgConfirm(checkCashAmountMsg, '', 'error');
                    return;
                }

                if (!_safePwd) {
                    _this.msgConfirm('请输入资金安全密码', '', 'error');
                    return;
                }

                if (!_mobileCode) {
                    _this.msgConfirm('请输入您收到的短信验证码', '', 'error');
                    return;
                }

                var payoutData = {
                    "token": _currentCoin,
                    "receiveAddr": _receiveAddress,
                    "amount": _cashAmount,
                    "safePwd": _safePwd,
                    "msg": _mobileCode
                };

                $("#payoutSubmitBtn").button("loading");

                $.ajax({
                    url: '/web/withdraw/withdraw',
                    type: "POST",
                    contentType : "application/json",
                    data: JSON.stringify(payoutData),
                    dataType: "json",
                    complete: function() {
                        $("#payoutSubmitBtn").button("reset");
                    },
                    success: function(res) {
                        if (res.code == 200) {
                            _this.$alert(res.msg, {
                                confirmButtonText: '确定',
                                type: 'success',
                                callback: action => {
                                    window.location.reload();
                                }
                            });
                        } else {
                            _this.msgConfirm(res.msg, '', 'error');
                        }
                    }
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
                            _this.msgConfirm(res.msg, "", "success");
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
                                            // window.location.reload();
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
            let _this = this;
            _this.M = M;

            let _routerCoin = _this.$route.params[0];

            if (_routerCoin) {
                _this.currentCoin = _routerCoin.toUpperCase();
            } else {
                _this.currentCoin = 'USDT';
            }

            let _currentCoin = _this.currentCoin;

            $(function () { 
                $("[data-toggle='popover']").popover();
            });

            let _authLevel = this.$cookie.get("BCKJ_authLevel");
            if (_authLevel) {
                _this.authLevel = _authLevel;
            } else {
                _this.authLevel = 0;
            }

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
    #stepOneForm {
        width: 80%;
        margin: 0 auto;
    }
    .bk-onekey-form {
        .line-2 input.form-control {
            width: 70.4%;
        }
        .dropdown-button {
            width: 100%;
        }
        .dropdown-menu {
            width: 100%;
            margin: 0;
        }
    }
    .fees {
        cursor: pointer;
    }
    #mobileCode {
        padding-right: 40%;
    }
    .bk-onekey #sendCodeBtn {
        position: absolute;
        right: 15px;
        top: 0;
        cursor: pointer;
        padding-left: 8px;
        padding-right: 8px;
        margin: 5px;
        height: 30px;
        line-height: 28px;
        border-radius: 15px;
        background: #ffa338;
        color: #ffffff;
        text-align: center;
        border: none;
    }
    #sendCodeBtn:hover {
        background: #F8932C;
    }
    #sendCodeBtn[disabled] {
        background: #ffa338;
        cursor: not-allowed;
        opacity: 0.65;
    }
    .btn-group-lg>.btn, .btn-lg {
        padding: 10px 0px;
        width: 100%;
    }
    .nb_btn_payout {
        color: #7280e8;
        background: #fff;
        border-radius: 25px;
        border: 3px solid #7280e8;
        font-weight: bold;
        outline: none !important;
    }
    .nb_btn_payout:hover {
        color: #fff;
        background-color: #7280E8;
    }
    .nb_btn_payout[disabled] {
        cursor: not-allowed;
        opacity: 0.65;
        color: #7280e8;
        background: #fff;
    }

    .pic_info .txt2 {
        min-width: 80px;
    }

    .popup-box .coin-list li label.choosed {
        border-color: #ffa338;
    }

    .font_w_normal {
        font-weight: normal;
    }
    .success {
        color: rgba(75,187,123,1);
        padding-right: 5px;
    }
    .fail {
        color: rgba(251,85,85,1);
        padding-right: 5px;
    }
    .delete {
        padding-right: 5px;
    }
    .separate_line_gray {
        border: 1px dashed #c0c5ef;
        margin-top: 29px;
    }
    
    .operate_delete {
        padding: 5px 10px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
        cursor: pointer;
        display: inline-block;
        text-decoration: none;
    }
    .operate_delete:hover {
        color: #fff;
        background-color: #ffa338;
        border-color: #ffa338;
        text-decoration: none;
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
