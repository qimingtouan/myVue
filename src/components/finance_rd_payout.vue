<template>  
    <div class="finance-rd">
        <div class="bk-tabList">
            <div class="bk-tabList-hd clearfix">
                <div class="btn-group bk-btn-group" role="group">
                    <a href="javascript:;" class="btn sinspan" role="button">
                        <i class="fa fa-sign-in icon_sin"></i>提币
                    </a>
                </div>
            </div>
            
            <input type="hidden" id="googleAuth" value="0">
            <input type="hidden" id="payGoogleAuth" value="false">
            <input type="hidden" id="mobileStatu" value="2">
            <input type="hidden" id="emailStatu" value="2">
            <input type="hidden" id="payMobileAuth" value="true">
            <input type="hidden" id="payEmailAuth" value="false">

            <!-- 选择提币币种 -->
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

                                <!-- 初级实名认证 -->
                                <div id="needSimpleAuthDiv" class="form-group has-feedback line-2 hide">
                                    <div class="shimingpoper">
                                        <p><img src="https://s.zb.com/statics/img/v2/user/shimingtopicon.png"></p>
                                        <div class="notice">
                                            根据您在本站的资金综合状况，为了您的资产安全，您需要进行初级实名认证，才能继续相关资金操作。如需更大额度，可直接进行高级实名认证
                                            <p><a href="/u/auth/simple" class="btn btn-blue btn-help"><i class="bk-ico btn-blue-send"></i>立即认证</a></p>
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
                                <!-- 视频认证 -->
                                <div id="needVideoAuthDiv" class="form-group has-feedback line-2 hide">
                                    <div class="shimingpoper">
                                        <p><img src="https://s.zb.com/statics/img/v2/user/video-need-audit.png"></p>
                                        <div class="notice">
                                            根据您在本站的资金综合状况，为了您的资产安全，您需要进行视频认证，才能继续相关资金操作。
                                            <p><a href="javascript:applyVideo();" class="btn btn-blue btn-help"><i class="bk-ico btn-blue-send"></i>申请视频认证</a></p>
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
                                <!-- 视频认证正在审核中 -->
                                <div id="waitVideoAuthDiv" class="form-group has-feedback line-2 shimingpoper hide">
                                    <div class="morerz">
                                        <div class="auditpic">
                                            <img src="https://s.zb.com/statics/img/v2/user/video-auditing.png">
                                        </div>
                                        <div class="noticetext">
                                            <h3>视频认证正在审核中</h3>
                                            <h4>等待通过后再尝试</h4>
                                        </div>
                                    </div>
                                </div>
                                <!-- <script>
                                    function applyVideo() {
                                        JuaBox.sure('请加QQ：705401963，完成视频认证。');
                                    }
                                </script> -->

                                <!-- 提币地址 -->
                                <div id="stepOneFormWrapper">
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
                                                                <p class="mb0 text-second">{{item.memo}}</p>
                                                                <span>{{item.address}}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 内部转账 -->
                                    <div class="form-group" style="display: none;">
                                        <label for="isInnerTransfer" class="control-label col-sm-12" style="padding-top:0;">内部转账：</label>
                                        <div class="col-sm-12 text-left clearfix">
                                            <input class="pull-left" type="checkbox" id="isInnerTransfer" name="isInnerTransfer" value="1" checked="">
                                            <label class="pull-left ml5" for="isInnerTransfer" style="margin-top:2px;font-weight:normal;">同意ZB和Bitbank账户之间的转账不走区块链，0手续费0确认，极速到账</label>
                                        </div>
                                    </div>

                                    <!-- 提币数量   网络手续费 -->
                                    <div class="row">
                                        <div class="col-sm-6 paddingRight0">
                                            <div class="form-group has-feedback">
                                                <label class="control-label col-sm-12" for="cashAmount">提币数量：</label>
                                                <div class="col-sm-12">
                                                    <input type="text" id="cashAmount" name="cashAmount"  v-model="cashAmount"
                                                            class="form-control form-second pull-left inputlong smallfont" pattern="limit(1,20)" 
                                                            errmsg="请输入正确的提币数量" aria-describedby="cashAmount_error" 
                                                            placeholder="扣除网络手续费后，可提现金额不足0.01USDT。" 
                                                            onblur="btcConvert(this.value)" disabled="disabled">
                                                    <!-- <div class="pull-left" style="margin-top:7px; margin-left:5px;  ">
                                                        <em class="bigfont">≈</em> <span id="paymentCny" class="bkNum">0.0</span>cny
                                                    </div> -->
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
                                                        <div class="input-drop dropdown-menu" aria-labelledby="feeGroup">
                                                            <ul id="ulFees">
                                                                <li v-for="itemFee in feeList" :key="itemFee.key"><span>{{itemFee}}</span></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-sm-12 text-left clearfix">
                                                    <label style="font-weight:normal; ">网络手续费优先从账户余额中扣除，当余额不足网络手续费时则从提币数量中扣除</label>  
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
                                                        pattern="limit(1,30)" 
                                                        errmsg="请输入资金安全密码">
                                                </div>
                                                <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                                                <span id="safePwd_error" class="help-block text-danger"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 paddingLeft0">
                                             <div id="validPhoneCode">
                                                <div class="form-group has-feedback">
                                                    <label class="control-label col-sm-12" for="mobileCode">短信验证码：</label>
                                                    <div class="col-sm-12">
                                                        <input type="text" class="form-control" id="mobileCode" name="mobileCode" pattern="limit(4,6)" 
                                                                errmsg="您填写正确的短信/邮件验证码!" aria-describedby="mobileCode_error">
                                                        <input type="button" name="sendCodeBtn" id="sendCodeBtn" value="点击获取" 
                                                                @click="sendCode()" 
                                                                disabled="disabled">
                                                    </div>
                                                    <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                                                    <span id="mobileCode_error" class="help-block text-danger"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Google验证码(无此功能，隐藏) -->
                                    <div id="validGoogleCode" class="hide">
                                        <div class="form-group has-feedback">
                                            <label class="control-label col-sm-12" for="googleCode">Google验证码：</label>
                                            <div class="col-sm-12">
                                                <input type="text" class="form-control form-second pull-left inputsmall" id="googleCode" name="googleCode" pattern="limit(4,6)" errmsg="您填写正确的Google验证码!" aria-describedby="googleCode_error">

                                            </div>
                                            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                                            <span id="googleCode_error" class="help-block text-danger"></span>
                                        </div>
                                    </div>

                                    <!-- 提币按钮 -->
                                    <div class="form-group col-sm-12">
                                        <span class="separate_line_gray col-sm-4"></span>
                                        <div class="col-sm-4 paysendbtn newpopover">
                                            <button id="btcConfirmBtn" type="button" data-loading-text="Loading..." 
                                                    class="btn btn-lg ft18 nb_btn_payout" 
                                                    onclick="submitStepOne();" disabled="disabled">
                                                    提币
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
                    <p>
                        <span class="text_uppercase">{{currentCoin}}</span><span>提现<a href="https://vip.zb.com/u/level"> 费率规则：</a></span><br>
                        <em style="color:rgba(251,85,85,1);">* 为了用户资金安全，平台可能会电话确认您的提币操作，请注意接听；</em><br>
                        <em style="color:rgba(251,85,85,1);">* <span class="text_uppercase text_red font_w_normal">{{currentCoin}}</span>充值经过1个确认后，才允许提现；</em><br>
                        <em style="color:rgba(251,85,85,1);">* 可提现金额≤账户可用资产-未经确认的数字资产。</em><br>
                    </p>
                    <div class="close" title="关闭">×</div>
                </div>
            </div>
        </div>

        <!-- 表格：提币记录 -->
        <div class="bk-onelist recordlistcont">
            <div id="shoplist" class="table-responsive">
                <input type="hidden" id="currentPage" v-model="currentPage">
                <input type="hidden" id="currentTab" v-model="currentTab">
                <table id="ListTable" class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th width="157px">时间</th>
                            <th width="278px">接收地址</th>
                            <th width="180px">处理时间</th>
                            <th width="100px">状态</th>
                            <th width="130px">实到金额<span class="text_uppercase">({{currentCoin}})</span></th>
                            <th width="130px">手续费<span class="text_uppercase">({{currentCoin}})</span></th>
                            <th width="80px">操作</th>
                        </tr>
                    </thead>

                    <!-- 充币记录表格无数据 -->
                    <tbody v-if="listTableData.length == 0">
                        <tr>
                            <td colspan="7">
                                <div class="bk-norecord" style="margin: -15px -9px;">
                                    <p>暂时没有相关记录。</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr v-for="item in listTableData" :key="item.index">
                            <td>
                                <div>{{item.date}}</div>
                            </td>
                            <td>
                                <div>{{item.receiveAddress}}</div>
                            </td>
                            <td>
                                <div>{{item.billDate}}</div>
                            </td>
                            <td v-if="item.status == 0">
                                <i i class="fa fa-check success" aria-hidden="true"></i>成功
                            </td>
                            <td v-if="item.status == 1">
                                <i i class="fa fa-times fail" aria-hidden="true"></i>失败
                            </td>
                            <td>{{item.realAmount}}</td>
                            <td>{{item.fees}}</td>
                            <td class="operation"><a class="operate_delete"><i class="fa fa-trash-o ft13 delete"></i>删除</a></td>
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
</template>

<script>
    import formatTime from "@/assets/js/formatTime"
    export default {
        name: 'finance_rd_payin',
        data() {
            return {
                searCoinName: '',
                coins: [],
                coinFlags: {},
                userCoinList: [],
                canWithdraw: 0,
                coinAvailable: {},
                currentPage: 1,
                currentTab: 'all',
                currentCoin: 'usdt',
                price: '',
                listTableData: [],
                receiveAddress: '',
                coinAddress: [],
                cashAmount: '',
                fees: '',
                coinFees: {},
                feeList: [],
                safePwd: '',
                countdown: 60,
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
        filters: {

        },
        methods: {
            // 查询所有币种
            getCoinList(currentCoin) {
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

                            if (_this.coins[i].available) {
                                _this.$set(_this.coinAvailable, _this.coins[i].key, _this.coins[i].available);
                            } else {
                                _this.$set(_this.coinAvailable, _this.coins[i].key, 0); 
                            }

                            if (_this.coins[i].fees) {
                                _this.$set(_this.coinFees, _this.coins[i].key, _this.coins[i].fees); 
                            } else {
                                _this.$set(_this.coinFees, _this.coins[i].key, []); 
                            }
                        }

                        if(_this.coinAvailable && _this.coinAvailable[currentCoin]) {
                            _this.canWithdraw = _this.coinAvailable[currentCoin];
                        } else {
                            _this.canWithdraw = 0;
                        }
                        if(_this.coinFees && _this.coinFees[currentCoin]) {
                            _this.feeList = _this.coinFees[currentCoin];
                        } else {
                            _this.feeList = [];
                        }

                        if (_this.feeList.length > 0) {
                            _this.fees = _this.feeList[0];
                        } else {
                            _this.fees = '';
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

            // 选择提币币种
            switchCoin(clickCoin, currentCoin, isCanRecharge) {
                let _this = this;
                if(clickCoin == currentCoin || false == isCanRecharge) {
                    return;
                }
                window.location.hash = "#/payout/"+clickCoin;
                _this.currentCoin = clickCoin;
                _this.canWithdraw = _this.coinAvailable[clickCoin];
                _this.feeList = _this.coinFees[clickCoin];
                _this.fees = _this.feeList[0];
                _this.currentPage = 1;
                _this.listTableData = [];

                // 查询该点击币种的提币地址
                _this.queryCoinAddr(clickCoin);

                // 查询该点击币种的提币记录
                _this.initListTable(1, clickCoin);
            },

            // 查询当前币种的提币地址
            queryCoinAddr(coinName) {
                let _this = this;

                $.ajax({
                    type: "GET",
                    url: "./../../../static/mock/payoutCoinHistoryAddr.json",
                    dataType: "json",
                    success: function(json) {
                        if (json.datas && json.datas.length > 0) {
                            _this.coinAddress = json.datas;
                            _this.receiveAddress = coinName+"_"+json.datas[0].address.replace(/\s+/g, "");
                        } else {
                            _this.receiveAddress = '',
                            _this.coinAddress = [];
                        }
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            },

            // 选择提币地址
            addrClick(coinAddress) {
                let _this = this;
                _this.receiveAddress = _this.currentCoin + "_" +coinAddress.replace(/\s+/g, "");
            },

            // 当前币种提币记录
            initListTable(currentPage, currentCoin){
                let _this = this;
                let currentTab = _this.currentTab;
                $.ajax({
                    // url: "https://vip.zb.com/u/payout/downloadRecord/coinAjax?tab=" + currentTab + "&page=" + currentPage + "&pageSize=10&coint=" + currentCoin,
                    url: "./../../../static/mock/payoutDetailMock.json",
                    type: "GET",
                    dataType: "json",
                    success: function(res){
                        if (res.isSuc) {
                            _this.currentPage = res.datas.pageIndex;

                            if ((!res.datas.list || res.datas.list.length <= 0)) {
                                if (currentPage == 1) {
                                    _this.listTableData = [];
                                }
                                $('#moreBtnWrap').hide();
                            } else {
                                // _this.listTableData = _this.listTableData.concat(res.datas.list);

                                let detailData = [];
                                detailData = res.datas.list.map(function(item){
                                    let temp = {};
                                    temp.date = formatTime(new Date(item.downTableDate));
                                    temp.receiveAddress = item.receiveAddres;
                                    temp.billDate = formatTime(new Date(item.billDate));
                                    temp.status = item.status;
                                    temp.realAmount = item.payoutAmount;
                                    temp.fees = item.fees;
                                    return temp;
                                })
                                
                                _this.listTableData = _this.listTableData.concat(detailData);

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
            },

            // 发送短信验证码
            sendCode() {
                let _this = this;

                let safePwd = _this.safePwd;
                let receiveAddress = _this.receiveAddress;

                // checkCashAmount();

                if (!receiveAddress) {
                    alert("请填写正确的接收地址!");
                    return;
                }
                if (!$('#safePwdDiv').hasClass('hide') && !safePwd) {
                    alert("请输入资金安全密码!");
                    return;
                }

                $.ajax({
                    // type: "POST",
                    // url: "https://vip.zb.com/user/userSendCode",
                    type : "GET",
                    url: './../../../static/mock/userSendCodeMock.json',
                    data: {
                        codeType: 400,
                        fundsType: 13,
                        safePwd: safePwd
                    },
                    dataType: "json",
                    error: function (err) {
                        /*JuaBox.sure(jsLan[1]);
                        inAjaxing = false;*/
                        console.log(err);
                        alert("sendCode Error !")
                    },
                    success: function (json) {
                        // inAjaxing = false;
                        if (json.isSuc) {
                            /*if (json.datas.isEmail) {
                                alert(json.des);
                            }*/
                            _this.settime($('#sendCodeBtn'));
                        } else if ('needMobileAuth' == json.des) {
                            alert("您未进行手机认证，请先进行手机认证");
                        } else {
                            alert(json.des);
                        }
                    }
                });
            },

            // 发送短信验证码倒计时
            settime(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdown == 0) {
                    _obj.removeAttr("disabled");
                    _obj.val("点击获取");
                    _this.countdown = 60;
                } else {
                    _obj.attr("disabled", true);
                    _obj.val("已发送"+"(" + _this.countdown + ")");
                    _this.countdown--;
                    setTimeout(function() {
                        _this.settime(_obj)
                    }, 1000);
                }
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

            $(function () { 
                $("[data-toggle='popover']").popover();
            });

            _this.getCoinList(_currentCoin); // 查询所有币种和用户自选币种
            _this.queryCoinAddr(_currentCoin); // 查询当前币种地址
            _this.initListTable(1, _currentCoin); // 当前币种充值记录
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
    .btn-group-lg>.btn, .btn-lg {
        padding: 10px 0px;
        width: 100%;
    }
    .nb_btn_payout {
        color: rgba(67,83,208,1);
        background: #fff;
        border-radius: 25px;
        border: 3px solid rgba(67,83,208,1);
        font-weight: bold;
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
        padding: 5px;
        font-size: 12px;
        line-height: 1.5;
        border-radius: 3px;
        cursor: pointer;
    }
    .operate_delete:hover {
        color: #fff;
        background-color: #ffa338;
        border-color: #ffa338;
        text-decoration: none;
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
