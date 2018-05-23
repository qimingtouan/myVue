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
                    <div class="col-sm-8 optional-record paddingRight0">
                        <h6>
                            自选记录
                            <a onclick="toggleOptional(true)" class="act"><i class="fa fa-cog"></i>编辑</a>
                        </h6>
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

                <!-- 添加地址 -->
                <div class="bk-address">
                    <ul class="row">
                        <!-- 添加地址按钮 -->
                        <li class="empty col-xs-6 col-md-4">
                            <div class="inner" id="addBlock_usdt">
                            <span class="add"><i class="fa fa-plus-circle ft18"></i><br>添加地址</span>
                        </div>
                        </li>
                        <!-- 提币地址 -->
                        <li class="item col-xs-6 col-md-4">
                            <div class="inner">
                                <div class="head">
                                    <p style="color:#999;">地址昵称：<a href="javascript:void(0);" style="color:#E00;" class="remark" data-id="12111">usdt_payout </a></p>
                                </div>
                                <div class="body">
                                    <p class="card">
                                        <a data-content="<img src='https://vip.zb.com/service/qrcode?code=1HS3jKWaP9VA2RBoQAPYbZUsneBFDcS9UJ&amp;width=110&amp;height=110' style='height:110px;'>" role="button" data-toggle="popover" data-placement="right" data-html="true" data-trigger="hover" data-original-title="" title=""><i class="fa fa-qrcode ft14"></i></a>
                                        1HS3jKWaP9VA2RBoQAPYbZUsneBFDcS9UJ
                                    </p>
                                </div>
                                <div class="foot">
                                    <a href="http://127.0.0.1:8080/views/asset/asset.html#/payout" class="mr15" data-id="12111" target="_blank">提币</a>
                                    <span class="auth text-second">已认证</span>
                                </div>
                                <span class="delete" data-id="12111" title="删除"><i class="fa fa-trash-o ft14"></i></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'finance_rd_account'
    }
</script>

<script>
    $(function () { 
        $("[data-toggle='popover']").popover();
    });
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
</style>
