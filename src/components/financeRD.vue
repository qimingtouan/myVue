<template>  
    <div class="finance-rd">
        <div class="bk-tabList">
            <div class="user-asset row" style="display:none">图形区</div>
            <div class="bk-tabList-bd" style="display:none">
                <div id="asset-tabs" class="tab-group clearfix">
                    <div class="tab-item">
                        <a class="active" href="#userAssetList">
                            <span>现货账户</span>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 表格：币种 -->
            <div class="bk-tabList-bd">
                <div class="bk-asset">
                    <div id="userAssetList" class="table-wrapper active">
                        <div class="asset-convert row">
                            <div class="col-sm-6">
                                <div class="asset-title">
                                    <h6>资产折合</h6>
                                </div>
                                <div class="asset-amount">
                                    <div class="amount">
                                        <span id="totalSpotAsset" class="num">--</span>
                                        <span id="Munit" class="unit aunit">CNY</span>
                                    </div>
                                    <div class="action">
                                        <a href="javascript:void(0);" onclick="changeMunit()">
                                            <i></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="searchcoin">
                                    <i class="fa fa-search" style="display:inline"></i>
                                    <input placeholder="请输入币种简称" id="searCoinName">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="hidecoin2">
                                    <h6 style="display:inline-block; font-size:12px; vertical-align:top; margin-top: 2px;">
                                        <span>隐藏资产数量</span> 
                                        <select id="select-asset-choose">
                                            <option value="0">为0</option>
                                            <option value="0.001">小于0.001</option>
                                            <option value="1">小于1</option>
                                            <option value="10000">小于10000</option>
                                        </select>   
                                        <span>的币种</span>
                                    </h6>
                                    <a class="coinonoff"></a>
                                </div>
                            </div>
                        </div>
                        <div id="hidecoinz" class="hcoin-0">
                            <div class="asset-table table-grid">
                                <div class="thead">
                                    <div class="tr showdiv">
                                        <div class="td"><div class="cell">币种</div></div>
                                        <div class="td"><div class="cell">可用</div></div>
                                        <div class="td percentage"><div class="cell">冻结</div></div>
                                        <div class="td"><div class="cell">操作</div></div>
                                    </div>
                                </div>
                                <!-- 加载图标 Loading -->
                                <div class="caption loading" style="display: none;">
                                    <div class="bk-norecord">
                                        <p>
                                            <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i><br>
                                            <span>Loading...</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="tbody">
                                    <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-ZB"></i>
                                                <span>ZB</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>ZB
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>ZB
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary btn-gray"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second btn-gray"><i class="bk-ico outcoin"></i>提现</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-ETH"></i>
                                                <span>ETH</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>ETH
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>ETH
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                                <a class="btn btn-sm btn-loan" href="#" target="_self"><i class="bk-ico loan fa fa-balance-scale"></i>交易</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-USDT"></i>
                                                <span>USDT</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>USDT
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>USDT
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                                <a class="btn btn-sm btn-loan" href="#" target="_self"><i class="bk-ico loan fa fa-balance-scale"></i>交易</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-BTC"></i>
                                                <span>BTC</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>BTC
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>BTC
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                                <a class="btn btn-sm btn-loan" href="#" target="_self"><i class="bk-ico loan fa fa-balance-scale"></i>交易</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-BCC"></i>
                                                <span>BCC</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>BCC
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>BCC
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary btn-gray" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second btn-gray" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                                <a class="btn btn-sm btn-loan" href="#" target="_self"><i class="bk-ico loan fa fa-balance-scale"></i>交易</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-UBTC"></i>
                                                <span>UBTC</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>UBTC
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>UBTC
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                            </div>
                                        </div>
                                    </div> -->
                                    <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-LTC"></i>
                                                <span>LTC</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>LTC
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>LTC
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-ETC"></i>
                                                <span>ETC</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>ETC
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>ETC
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                                <a class="btn btn-sm btn-loan" href="#" target="_self"><i class="bk-ico loan fa fa-balance-scale"></i>提现</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-BTS"></i>
                                                <span>BTS</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>BTS
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>BTS
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                                <a class="btn btn-sm btn-loan" href="#" target="_self"><i class="bk-ico loan fa fa-balance-scale"></i>提现</a>
                                            </div>
                                        </div>
                                    </div> -->
                                    <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-EOS"></i>
                                                <span>EOS</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>EOS
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>EOS
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                                <a class="btn btn-sm btn-loan" href="#" target="_self"><i class="bk-ico loan fa fa-balance-scale"></i>提现</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-QTUM"></i>
                                                <span>QTUM</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>QTUM
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>QTUM
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second btn-gray" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-HSR"></i>
                                                <span>HSR</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>HSR
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>HSR
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                                <a class="btn btn-sm btn-loan" href="#" target="_self"><i class="bk-ico loan fa fa-balance-scale"></i>提现</a>
                                            </div>
                                        </div>
                                    </div> -->
                                    <!-- <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-XRP"></i>
                                                <span>XRP</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>XRP
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>XRP
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary btn-gray" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second btn-gray" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                            </div>
                                        </div>
                                    </div> -->
                                    <!-- <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-BCD"></i>
                                                <span>BCD</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>BCD
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>BCD
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                            </div>
                                        </div>
                                    </div> -->
                                    <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-DASH"></i>
                                                <span>DASH</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>DASH
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>DASH
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="tr sdiv-0 showdiv">
                                        <div class="td coin-name">
                                            <div class="cell">
                                                <i class="icon-ZBBTC"></i>
                                                <span>ZBBTC</span>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>ZBBTC
                                            </div>
                                        </div>
                                        <div class="td">
                                            <div class="cell">
                                                <span class="num">0</span>ZBBTC
                                            </div>
                                        </div>
                                        <div class="td actions">
                                            <div class="cell">
                                                <a class="btn btn-sm btn-primary" href="#" target="_self"><i class="bk-ico incoin"></i>充值</a>
                                                <a class="btn btn-sm btn-second" href="#" target="_self"><i class="bk-ico outcoin"></i>提现</a>
                                            </div>
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 最近资金记录 -->
            <div class="bk-tabList-bd">
                <div class="bk-pageTit">
                    <h4 class="pull-left">
                        <i class="bk-ico assetRecord fa fa-list"></i>
                        最近资金记录
                    </h4>
                    <div class="table-responsive">
                        <table id="billDetail" class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="15%">时间</th>
                                    <th width="30%" style="text-align:left;">类别</th>
                                    <th width="40%" style="text-align:left;">发生金额</th>
                                    <th width="15%">状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="4">
                                        <div class="bk-norecord">
                                            <p>暂时没有相关记录。</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr></tr>
                            </tbody>
                        </table>
                        <input type="hidden" id="pageIndex" value="1">
                        <input type="hidden" id="currency" value="all">
                        <div class="bk-moreBtn">
                            <button id="morebtn" class="btn btn-outline" type="button" style="display: none;"><i class="fa fa-angle-down fa-fw"></i>更多</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
    export default {
        name: 'financeRD'
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
