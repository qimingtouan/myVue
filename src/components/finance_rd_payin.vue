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
                                            <span id="current-sel">btc</span>
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
                                <div class="col-sm-7 optional-record">
                                    <h6>
                                        自选记录
                                        <a class="act" onclick="toggleOptional(true)">
                                            <i class="fa fa-cog"></i>编辑
                                        </a>
                                    </h6>
                                    <div id="optional-list" class="optional-list">
                                        <a href="#">ZB</a>
                                        <a href="#">USDT</a>
                                    </div>
                                </div>
                                <div class="col-sm-12 mt10 mb10">
                                    <h6>钱包地址</h6>
                                    <div class="address-field">
                                        <span id="keyPreCopy" class="key-pre">QSDRz3pGzDx6wViXycPxqNYH5MznXQAXTT</span>
                                        <a id="copyadd" class="btn-copy" data-clipboard-action="copy" data-clipboard-target="#keyPreCopy">复制地址</a>
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

            <!-- 安全提示 -->
            <div class="ctips user_main_title3">
                <div style="position:absolute; top:2px; right:10px;">
                    <a href="#">
                        <img src="https://s.zb.com/statics/img/v2/common/techpic_payin2.png" style="width:120px;">
                    </a>
                </div>
                <p>
                    <span>安全提示</span><br>
                    <b style="font-size:14px; color:#E00;">禁止充值除USDT之外的其他资产，任何非USDT资产充值将不可找回</b><br>
                    <em>* 1. 往该地址充值，汇款完成，等待网络自动确认（1个确认）后系统自动到账</em><br>
                    <em>* 2. 为了快速到账，充值时可以适当提高网络手续费</em><br>
                </p>
                <div class="close" title="关闭">×</div>
            </div>

            <!-- 表格：充币记录 -->
            <div class="bk-onelist recordlistcont">
                <div id="shoplist" class="table-responsive">
                    <input type="hidden" id="currentPage" value="1">
                    <input type="hidden" id="currentTab" value="all">
                    <input type="hidden" id="coint" value="usdt">
                    <table id="ListTable" class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th width="170px">时间</th>
                                <th width="240px">类型</th>
                                <th width="78px">金额(USDT)</th>
                                <th width="80px">确认次数</th>
                                <th width="105px">状态</th>
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

        <!-- 当前价格（隐藏） -->
        <input type="hidden" id="currentPrice" value="">
    </div>
</template>

<script>
    export default {
        name: 'finance_rd_payin'
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .payin .bk-onekey-form .address-field{
        margin-top: 20px;
    }
    .payin .bk-onekey-form .address-field .address-field-title{
        width: 60px;
        color: #999;
        float: left;
    }
</style>
