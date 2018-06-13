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
                                <input type="hidden" id="price" name="price" value="">
                                <input type="hidden" id="coint" name="coint" value="usdt">

                                <!-- 选择提币币种 -->
                                <div class="sel-coin-row clearfix">
                                    <!-- 选择提币币种 -->
                                    <div class="col-sm-5">
                                        <h6>选择提币币种</h6>
                                        <div class="dropdown">
                                            <a id="sel-coin" class="dropdown-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span id="current-sel">usdt</span>
                                                <span class="caret"></span>
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="sel-coin">
                                                <ul id="d-coins" class="coin-list">
                                                    <div class="search-coin">
                                                        <input placeholder="搜索充值币种" id="searCoinName">
                                                        <a><i class="fa fa-search"></i></a>
                                                    </div>
                                                    <li class="not-open" data-coin="zb">ZB</li>
                                                    <li class="" data-coin="usdt">USDT</li>
                                                    <li class="" data-coin="btc">BTC</li>
                                                    <li class="" data-coin="bcc">BCC</li>
                                                    <li class="" data-coin="ubtc">UBTC</li>
                                                    <li class="" data-coin="ltc">LTC</li>
                                                    <li class="" data-coin="eth">ETH</li>
                                                    <li class="" data-coin="etc">ETC</li>
                                                    <li class="" data-coin="eos">EOS</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 自选记录 -->
                                    <div class="col-sm-7 optional-record">
                                        <h6>自选记录<a onclick="toggleOptional(true)" class="act"><i class="fa fa-cog"></i>编辑</a></h6>
                                        <div id="optional-list" class="optional-list">
                                            <a href="#">ZB</a>
                                            <a href="#">BCC</a>
                                            <a href="#">BTC</a>
                                            <a href="#">ETH</a>
                                        </div>
                                    </div>
                                </div>

                                <!-- 自选币种弹出框 -->
                                <div id="optional-popup">
                                    <div class="popup-box">
                                        <a class="close" onclick="toggleOptional(false)"><i class="fa fa-close"></i></a>
                                        <h5>自选币种设置(最多选择15个)</h5>
                                        <ul id="popup-coins" class="coin-list">
                                            <li class="not-open">
                                                <label>
                                                    <input type="checkbox" data-name="zb">
                                                    <img src="../assets/img/coin/coin-zb.png"> ZB
                                                </label>
                                            </li>
                                            <li class>
                                                <label>
                                                    <input data-name="usdt" type="checkbox">
                                                    <img src="../assets/img/coin/coin-usdt.png"> USDT
                                                </label>
                                            </li>
                                            <li class>
                                                <label>
                                                    <input data-name="btc" type="checkbox">
                                                    <img src="../assets/img/coin/coin-btc.png"> BTC
                                                </label>
                                            </li>
                                            <li class>
                                                <label>
                                                    <input data-name="bcc" type="checkbox">
                                                    <img src="../assets/img/coin/coin-bcc.png"> BCC
                                                </label>
                                            </li>
                                            <li class>
                                                <label>
                                                    <input data-name="ubtc" type="checkbox">
                                                    <img src="../assets/img/coin/coin-ubtc.png"> UBTC
                                                </label>
                                            </li>
                                            <li class>
                                                <label>
                                                    <input data-name="ltc" type="checkbox">
                                                    <img src="../assets/img/coin/coin-ltc.png"> LTC
                                                </label>
                                            </li>
                                            <li class>
                                                <label>
                                                    <input data-name="eth" type="checkbox">
                                                    <img src="../assets/img/coin/coin-eth.png"> ETH
                                                </label>
                                            </li>
                                            <li class>
                                                <label>
                                                    <input data-name="etc" type="checkbox">
                                                    <img src="../assets/img/coin/coin-etc.png"> ETC
                                                </label>
                                            </li>
                                            <li class>
                                                <label>
                                                    <input data-name="eos" type="checkbox">
                                                    <img src="../assets/img/coin/coin-eos.png"> EOS
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
                                            <a id="historyAddr" href="/views/asset/asset.html#/account" target="_blank">地址管理</a>
                                        </label>
                                        <div id="addressGroup">
                                            <div class="col-sm-12">
                                                <div class="drop-group dropdown">
                                                    <div class="dropdown-toggle clearfix" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <input name="receiveAddress" id="receiveAddress" type="text" readonly="readonly" onkeyup="showqrCode()" errmsg="请输入正确的提现钱包地址" class="form-control form-second smallfont" aria-describedby="receiveAddress_error" value="">
                                                    </div>
                                                                
                                                    <div class="input-drop  dropdown-menu" aria-labelledby="addressGroup">
                                                        <ul id="ul_myBanks">   
                                                            <li id="addBlock_btc" class="firstChild">
                                                                <span class="text-second">+ 快速添加接收地址</span>
                                                            </li>
                                                            <li data-address="1HS3jKWaP9VA2RBoQAPYbZUsneBFDcS9UJ">
                                                                <p class="mb0 text-second">(usdt_payout)</p>
                                                                <span>1HS3jKWaP9VA2RBoQAPYbZUsneBFDcS9UJ</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 内部转账 -->
                                    <div class="form-group">
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
                                                    <input type="text" class="form-control form-second pull-left inputlong smallfont" id="cashAmount" name="cashAmount" pattern="limit(1,20)" errmsg="请输入正确的提币数量" aria-describedby="cashAmount_error" placeholder="扣除网络手续费后，可提现金额不足0.01USDT。" onblur="btcConvert(this.value)" disabled="disabled">
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
                                                <label class="control-label col-sm-12" for="fees">
                                                    <span class="bluepopover" role="button" style="display:inline-block; border-bottom:1px dashed #999;">网络手续费
                                                        <div class="popover fade top in" role="tooltip" style="left:-60px;top:-94px; padding:5px;width:200px; text-align:left;">
                                                            <div class="arrow" style="left: 50%;"></div>
                                                            <div class="popover-content" style="padding-left:0;padding-right:0;">
                                                                 <p>该费用用于网络确认，一般情况下手续费越高网络确认速度越快，网络拥堵时，会优先处理手续费高的提币。</p>
                                                             </div>
                                                         </div>
                                                    </span>：
                                                </label>
                                                <div class="col-sm-12">
                                                    <div class="drop-group " id="feeGroup">
                                                        <div class="dropdown-toggle clearfix" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <input type="text" class="form-control form-second inputlong" id="fees" name="fees" aria-describedby="fees_error" value="20" readonly="readonly">
                                                        </div>
                                                        <div class="input-drop dropdown-menu" aria-labelledby="feeGroup">
                                                            <ul id="ulFees">
                                                                <li><span>20</span></li>
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
                                                    <input type="password" class="form-control form-second pull-left inputlong smallfont" id="safePwd" name="safePwd" pattern="limit(1,30)" errmsg="请输入资金安全密码">
                                                </div>
                                                <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                                                <span id="safePwd_error" class="help-block text-danger"></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 paddingLeft0">
                                             <div id="validPhoneCode">
                                                <div class="form-group has-feedback">
                                                    <label class="control-label col-sm-12" for="mobileCode">短信验证码：</label>
                                                    <div class="col-sm-7">
                                                        <input type="text" class="form-control" id="mobileCode" name="mobileCode" pattern="limit(4,6)" errmsg="您填写正确的短信/邮件验证码!" aria-describedby="mobileCode_error">
                                                    </div>
                                                    <div class="col-sm-5">
                                                        <input type="button" name="sendCodeBtn" class="abtn-red" id="sendCodeBtn" value="点击获取" onclick="sendCode()" disabled="disabled">
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

                                    <div class="form-group col-sm-12">
                                        <label class="control-label col-sm-12"></label>
                                        <div class="col-sm-12 paysendbtn newpopover">
                                            <button id="btcConfirmBtn" type="button" data-loading-text="Loading..." class="btn btn-second btn-lg ft18" 
                                                    onclick="submitStepOne();" disabled="disabled">
                                                    提币
                                            </button>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </form>
                        </div>
                    </div>      
                </div>

                <!-- 费率规则 -->
                <div class="ctips user_main_title3" style="margin:0 30px 10px 30px;">
                    <p><span>BTC提现<a href="https://vip.zb.com/u/level"> 费率规则：</a></span><br>
                        <em style="color:#DE211D;">* 为了用户资金安全，平台可能会电话确认您的提币操作，请注意接听；</em><br>
                        <em style="color:#DE211D;">* BTC充值经过1个确认后，才允许提现；</em><br>
                        <em style="color:#DE211D;">* 可提现金额≤账户可用资产-未经确认的数字资产。</em><br>
                    </p>
                    <div class="close" title="关闭">×</div>
                </div>
            </div>
        </div>

        <!-- 表格：提币记录 -->
        <div class="bk-onelist recordlistcont">
            <div id="shoplist" class="table-responsive">
                <input type="hidden" id="currentPage" value="1">
                <input type="hidden" id="currentTab" value="all">
                <table id="ListTable" class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th width="157px">时间</th>
                            <th width="278px">接收地址</th>
                            <th width="180px">处理时间</th>
                            <th width="100px">状态</th>
                            <th width="130px">实到金额</th>
                            <th width="130px">手续费</th>
                            <th width="80px">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7">
                                <div class="bk-norecord" style="margin: -15px -9px;">
                                    <p>暂时没有相关记录。</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- <script type="text/javascript">
                    formatNum();
                </script> -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'finance_rd_payin'
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
    .bk-onekey #sendCodeBtn {
        display: block;
        border-radius: 0;
        font-size: 12px;
        margin-left: 0px;
        box-shadow: none;
        background: none;
        border: 1px solid #eee;
        color:#E00; width:100%;
    }
    .btn-group-lg>.btn, .btn-lg {
        padding: 10px 0px;
        width: 100%;
    }
    .pic_info .txt2 {
        min-width: 80px;
    }
</style>
