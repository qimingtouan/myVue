<template>  
    <div class="finance-rd bk-bill">
        <div class="bk-tabList">
            <div class="bk-tabList-hd clearfix mt10 paddingLeft0">
                <div class="btn-group bk-btn-group" role="group">
                    <h6 style="color:#353d41; font-size:16px; font-weight: bold;">
                        <i class="bk-ico billgray"></i>综合账单
                    </h6>
                </div>
            </div>

            <!-- 筛选条件 -->
            <div class="bk-tabList-hd clearfix" style=" overflow:visible; padding-bottom:10px; padding-top:10px; padding-left: 0;">
                <div class="btn-group bk-btn-group" role="group" style="width: 100%;">
                    <div class="dropdown dropdown-coin bk-onekey-form">
                        <a id="sel-coin" class="dropdown-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="height:44px;">
                            <span id="current-sel">ZB</span>
                            <span class="caret"></span>
                        </a>
                        <div class="dropdown-menu firsttype" aria-labelledby="sel-coin">
                            <div class="search-coin">
                                <input placeholder="搜索币种" id="searCoinName" class="bill_sear_coin">
                                <i class="fa fa-search"></i>
                            </div>
                            <a class="btn" role="button" data-value="all">所有币种</a>
                            <a class="btn active" role="button" data-value="zb">ZB</a>
                            <a class="btn" role="button" data-value="usdt">USDT</a>
                            <a class="btn" role="button" data-value="btc">BTC</a>                           
                            <a class="btn" role="button" data-value="bcc">BCC</a>
                            <a class="btn" role="button" data-value="ubtc">UBTC</a>
                            <a class="btn" role="button" data-value="ltc">LTC</a>
                            <a class="btn" role="button" data-value="eth">ETH</a>
                            <a class="btn" role="button" data-value="etc">ETC</a>
                            <a class="btn" role="button" data-value="eos">EOS</a>
                        </div>
                    </div>

                    <!-- 所有类型  充值  提现  买入 卖出。。。 -->
                    <div class="second" style="display:inline-block;">
                        <a class="btn active" role="button" data-value="all">所有类型</a>
                        <a class="btn" role="button" data-value="charge">充值</a>
                        <a class="btn" role="button" data-value="withdraw">提现</a>
                        <a id="sbuy" class="btn" role="button" data-value="buy">买入</a>
                        <a id="ssell" class="btn" role="button" data-value="sell">卖出</a>
                        <a id="sxfbuy" class="btn" role="button" data-value="sxfbuy">买入手续费</a>
                        <a id="sxfsell" class="btn" role="button" data-value="sxfsell">卖出手续费</a>
                        <a class="btn" role="button" data-value="zs">系统赠送</a>
                    </div>
                </div>
                <div class="pull-right mt10"></div>
            </div>

            <!-- 账单 -->
            <div class="bk-tabList-bd">
                <!-- 时间段选择 -->
                <div class="bk-search">
                    <form autocomplete="off" class="form-inline text-left" name="searchForm" id="searchContaint">
                        <input type="hidden" id="type" name="type" value="0">
                        <input type="hidden" id="datatype" name="datatype" value="0">
                        <input type="hidden" id="currency" name="currency" value="zb">
                        <input type="hidden" id="coint" name="coint" value="zb">
                        <input type="hidden" id="operType" name="operType" value="all">
                        <div class="clearfix mb20"></div>
                        <div class="form-group ml20 dataType">
                            <a href="/u/bill?datatype=0" style="min-width:70px;" class="btn btn-primary btn-sm disabled">3天内</a>
                            <a href="/u/bill?datatype=1" style="min-width:70px;" class="ml10 btn btn-sm btn-default">3天前</a>
                        </div>
                        <div class="form-group form-group-sm ml15">
                            <label for="startDate">起止时间：从</label>
                            <input type="text" style="width:120px;" name="startDate" id="startDate" class="form-control" 
                                   onfocus="WdatePicker({el:this, dateFmt:'yyyy-MM-dd HH:mm',lang : 'cn' , minDate : '' , maxDate : ''})" >
                            <label for="endDate">到</label>
                            <input type="text" style="width:120px;" name="endDate" id="endDate" class="form-control" 
                                   onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',lang : 'cn'})">
                        </div>
                        <button style="min-width:75px;" type="button" class="btn btn-sm btn-primary ml10" id="idSearch" onclick="javascript:zb.list.search();"><i class="fa fa-search mr5"></i>筛选</button>
                        <button style="min-width:75px;" type="reset" class="btn btn-sm btn-default ml10" id="idReset" onclick="javascript:zb.list.resetForm();"><i class="fa fa-repeat mr5"></i>重置</button>
                        <button style="min-width:80px; margin-right:20px;" type="button" class="btn btn-sm btn-default pull-right downbtng" onclick="exports()"><i class="fa fa-download mr5"></i>导出明细</button>
                        <div class="clearfix mb20"></div>
                    </form>
                </div>

                <!-- 表格 -->
                <div id="shopslist" class="bk-onelist table-responsive">
                    <table class="table table-striped table-bordered table-hover" id="billDetail">
                        <thead>
                            <tr>
                                <th style="width:16%;">时间</th>
                                <th style="width:15%;">类型</th>
                                <th style="width:20%;">QC/USDT/BTC收支</th>
                                <th style="width:23%;">其他数字货币收支</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colspan="7">
                                    <div class="bk-norecord">
                                        <p>暂时没有相关记录。</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../static/My97DatePicker/My97DatePicker/WdatePicker.js'
    export default {
        name: 'finance_rd_bill'
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    html, body {
        min-width: 1000px;
    }
    .bk-tabList-hd .btn-group .btn {
        padding: 15px 5px;
        font-size: 12px;
        font-weight: normal;
    }
    .finance-rd .clearfix.mb20 {
        height: 1px;
    }

    #shopslist {
        margin: 20px;
    }
    .bk-tabList-bd {
        padding-bottom: 1px;
    }

    .dropdown-menu.firsttype {
        max-height: 300px;
        overflow-y: auto;
    }

    .dropdown-coin {
        width:160px;
        height: 44px;
        position: relative;
        display: inline-block;
        margin-right: 10px;
        vertical-align: bottom;
        padding: 0;

        .dropdown-menu {
            a {
                display: block;
                text-align: left;
                padding: 5px 12px!important;
                cursor: pointer;
            }
            a.active:before {
                display: none!important;
                background: none;
            }
            a:hover {
                border-bottom: none;
                background: #F5F5F5;
            }
            a:hover:before {
                display: none!important;
            }
        }
    }

    .search-coin .bill_sear_coin {
        width: 83%;
    }
    .search-coin i {
        cursor: pointer;
        position: absolute;
        top: 8px;
        right: 5px;
        color: #ccc;
        font-weight: bold;
    }

    #current-sel {
        font-size: 12px;
    }

    .bk-onekey-form .dropdown-button {
        width: 100%;
    }

    .bk-ico.billgray {
        vertical-align: middle;
        color: #61727C;
    }

    #billDetail th {
        background: #f6f6f6;
    }
</style>
