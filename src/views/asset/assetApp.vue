<template>
    <div  id="nbAsset">
        <div class="bk-body">
            <!-- 页面头部 开始 -->
            <!-- <header class="navbar navbar-static-top bk-nav navbar-black">
                <div class="bk-toolBar clearfix">
                    <div class="top-market-show hide"></div>
                    <ul class="pull-right" id="topMenuNav">
                        <li id="menuNew">
                            <a :href="bkToolBarData.informationHref" target="_blank">
                                <i class="fa fa-list-alt fa-fw"></i>信息资讯<span class="badge"></span>
                            </a>
                        </li>
                    </ul>
                    <a id="btnRecommed" role="button" class="btn btn-primary btn-skew btn-sm pull-right mr10" style="margin-top: 1px;" href="#" target="_self">
                        <span><i class="fa fa-gift mr5" style="font-size:14px; line-height: 1.5;"></i>邀请享分红</span>
                    </a>
                    <a id="btnChbtc" role="button" class="btn btn-primary btn-skew btn-sm pull-right mr10" style="margin-top:1px;" href="#" target="_self">
                        <span><i class="fa fa-refresh mr5" style="font-size:14px; line-height: 1.5;"></i>CHBTC资产转入</span>
                    </a>
                </div>
                <div class="bk-menuBar">
                    <div class="container">
                        <div class="navbar-header">
                            <a class="navbar-brand bk-nav-logo" href="/" title="NB.COM">
                                <img src="./../../assets/img/logo.png" alt="NB">
                            </a>
                        </div>
                        <nav id="bitMenu" class="navbar-collapse bk-navbar collapse" aria-expanded="false" >
                            <ul class="nav navbar-nav navbar-right" style="margin-right:0;">
                                <li><a href="#" target="_self">币种详情</a></li>
                                <li class="dropdown bk-secd regbtn menu-market-down">
                                    <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" onclick="location.href='#'">
                                        现货交易&nbsp;<i class="caret"></i>
                                    </a>
                                    <div class="dropdown-menu animate bk-secd-menu fadeIn" data-animation="fadeIn" role="menu" style="width: 920px; left:-420px;">
                                        <div class="row">
                                            <div class="col-xs-12 text-center topmenuhover">
                                                <p class="text-primary titlelist">
                                                    <a>自选</a>
                                                    <a class="">ETH</a>
                                                    <a class="on">USDT</a>
                                                    <a>BTC</a>
                                                </p>
                                                <ul class="market_self_list" id="self-selection"></ul>
                                                <ul class="market_usdt_list on"></ul>
                                                <ul class="market_usdt_list"></ul>
                                                <ul class="market_btclist"></ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li><a href="#" target="_self">新手指导</a></li>
                                <li class="dropdown bk-secd logined" id="fund-dropdown">
                                    <a class="dropdown-toggle active" role="button" onclick="location.href='#'">财务&nbsp;<i class="caret"></i></a>
                                    <div class="dropdown-menu animate" style="width: 500px; left: 50% margin-left: -250px;">
                                        <div class="d-tatal-all unitSelection">
                                            <p>
                                                <span class="title">账户资产折算：</span> 总资产<span class="assetNum text-primary" id="D_allTotalAsset">--</span>&nbsp;<span class="aunit">CNY</span>净资产<span class="assetNum text-primary" id="D_allTotalNetAsset">--</span>&nbsp;<span class="aunit">CNY</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li class="logined dropdown bk-secd">
                                    <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" onclick="location.href='#'">
                                        <span id="M_userName">1361899313@qq.com</span>&nbsp;&nbsp;<i class="caret"></i>
                                    </a>
                                    <ul class="dropdown-menu animate bk-secd-menu allblock" data-animation="fadeIn" role="menu" style="right: 5px;">
                                        <li><a href="#">账户信息</a></li>
                                        <li><a href="#">安全设置</a></li>
                                        <li><a href="#">安全日志</a></li>
                                        <li><a href="#">消息提醒</a></li>
                                        <li><a href="#">API设置</a></li>
                                        <li><a href="#">身份认证</a></li>
                                    </ul>
                                </li>
                                <li class="logined quit">
                                    <a href="#" target="_self" title="退出登录">
                                        <i class="fa fa-sign-out"></i>
                                    </a>
                                </li>
                                <li class="top_langdown nologin" style="padding-right: 0px;display: none;">
                                    <a title="中文" class="btncn"></a>
                                    <div class="down">
                                        <a title="English" href="javascript:zb.setLan('en');" class="btnen"></a>
                                        <a title="العربية" href="javascript:zb.setLan('ar');" class="btnar"></a>
                                        <a title="日本語" href="javascript:zb.setLan('ja');" class="btnja"></a>
                                        <a title="한국어" href="javascript:zb.setLan('ko');" class="btnko"></a>
                                        <a title="ภาษาไทย" href="javascript:zb.setLan('th');" class="btnth"></a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header> -->
            <header-asset></header-asset>
            <!-- 页面头部 结束 -->

            <!-- 页面中部内容开始 -->
            <div class="bk-onekey financen">
                <div class="container">
                    <div class="finance-left safe-ld snav-ld">
                        <ul class="nb-finance-left">
                            <li v-for="item in assetLeftMenuData" :key="item.index">
                                <router-link :to="item.linkTo"><i :class="item.iconClass" aria-hidden="true"></i>{{item.optionText}}</router-link>
                            </li>
                        </ul>
                    </div>
                    <!-- 中间内容：右边内容区 开始 -->
                    <router-view></router-view>
                    <!-- 中间内容：右边内容区 结束 -->
                </div>
            </div>
            <!-- 页面中部内容结束 -->
        </div>
        <footer-bottom></footer-bottom>
    </div>
</template>

<script>
    import headerAsset from '@/components/assetHeaderNav'
    import footerBottom from '@/components/footerNav'
    export default {
        name: 'assetApp',
        components: {headerAsset, footerBottom},
        data() {
            return {
                assetLeftMenuData: [
                    {
                        linkTo: '/financeAsset',
                        iconClass: 'fa fa-money',
                        optionText: '账户资产'
                    }, {
                        linkTo: '/payin',
                        iconClass: 'fa fa-cart-arrow-down',
                        optionText: '充币'
                    }, {
                        linkTo: '/payout',
                        iconClass: 'fa fa-outdent',
                        optionText: '提币'
                    }, {
                        linkTo: '/account',
                        iconClass: 'fa fa-address-card-o',
                        optionText: '地址管理'
                    }, {
                        linkTo: '/bill',
                        iconClass: 'fa fa-list-alt',
                        optionText: '交易账单'
                    }
                ]
            }
        },
        methods: {
            
        },
        created() {
            
        },
        mounted() {
        }
    }

    $(document).on("click",".close",function(){
        $(this).closest(".ctips").slideUp(100)
    })
</script>

<style lang="less">
    @import './asset.less';
    .safe-ld a.router-link-exact-active.router-link-active {
        background: #fdfafa;
        text-decoration: none;
        position: relative;
        color: #de211d;
    }
</style>
    
