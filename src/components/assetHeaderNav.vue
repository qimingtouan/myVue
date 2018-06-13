<template>
    <header class="navbar navbar-static-top bk-nav navbar-black">
        <div class="bk-toolBar clearfix">
            <div class="top-market-show hide"></div>
            <ul class="pull-right" id="topMenuNav">
                <li id="menuNew">
                    <a :href="bkToolBarData.informationHref" target="_blank">
                        <i class="fa fa-list-alt fa-fw"></i>{{bkToolBarData.informationText}}<span class="badge"></span>
                    </a>
                </li>
            </ul>
            <a id="btnRecommed" role="button" class="btn btn-primary btn-skew btn-sm pull-right mr10" style="margin-top: 1px;" 
               :href="bkToolBarData.recommedHref" target="_self">
                <span><i class="fa fa-gift mr5" style="font-size:14px; line-height: 1.5;"></i>{{bkToolBarData.recommedText}}</span>
            </a>
            <a id="btnChbtc" role="button" class="btn btn-primary btn-skew btn-sm pull-right mr10" style="margin-top:1px;"
               :href="bkToolBarData.chbtcHref" target="_self">
                <span><i class="fa fa-refresh mr5" style="font-size:14px; line-height: 1.5;"></i>{{bkToolBarData.recommedText}}</span>
            </a>
        </div>
        <div class="bk-menuBar">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand bk-nav-logo" href="/" title="NB.COM">
                        <img src="../assets/img/logo.png" alt="NB">
                    </a>
                </div>
                <nav id="bitMenu" class="navbar-collapse bk-navbar collapse" aria-expanded="false" >
                    <ul class="nav navbar-nav navbar-right" style="margin-right:0;">
                        <li><a href="#" target="_self" :class="{active:navLiActive[0]}">币种详情</a></li>

                        <li class="dropdown bk-secd regbtn menu-market-down">
                            <a class="dropdown-toggle" :class="{active:navLiActive[1]}" data-toggle="dropdown" role="button" aria-expanded="false" onclick="location.href='http://127.0.0.1:8080/views/goods/goods_trade.html'">
                                现货交易&nbsp;<i class="caret"></i>
                            </a>
                            <!-- <div class="dropdown-menu animate bk-secd-menu fadeIn" data-animation="fadeIn" role="menu" style="width: 920px; left:-420px;">
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
                            </div> -->
                            <ul class="dropdown-menu animated bk-secd-menu allblock" data-animation="fadeIn" role="menu" style="right:-35px;  ">
                                <li><a href="#">自选</a></li>
                                <li><a href="#">ETH</a></li>
                                <li><a href="#">USDT</a></li>
                                <li><a href="#">BTC</a></li>
                            </ul>
                        </li>

                        <li><a href="#" target="_self" :class="{active:navLiActive[2]}">新手指导</a></li>

                        <li class="dropdown bk-secd logined" id="fund-dropdown">
                            <a class="dropdown-toggle" :class="{active:navLiActive[3]}" role="button" onclick="location.href='../asset/asset.html'">财务&nbsp;<i class="caret"></i></a>
                            <!-- <div class="dropdown-menu animate" style="width: 500px; left: 50% margin-left: -250px;">
                                <div class="d-tatal-all unitSelection">
                                    <p>
                                        <span class="title">账户资产折算：</span> 总资产<span class="assetNum text-primary" id="D_allTotalAsset">--</span>&nbsp;<span class="aunit">CNY</span>净资产<span class="assetNum text-primary" id="D_allTotalNetAsset">--</span>&nbsp;<span class="aunit">CNY</span>
                                    </p>
                                </div>
                            </div> -->
                            <ul class="dropdown-menu animated bk-secd-menu allblock" data-animation="fadeIn" role="menu" style="right:-50px;">
                                <li v-for="item in fundDropdown" :key="item.index"><a :href="item.optionHref">{{item.optionText}}</a></li>
                            </ul>
                        </li>

                        <li class="logined dropdown bk-secd">
                            <a class="dropdown-toggle" :class="{active:navLiActive[4]}" data-toggle="dropdown" role="button" aria-expanded="false" onclick="location.href='../user/user.html'">
                                <span id="M_userName">1361899313@qq.com</span>&nbsp;&nbsp;<i class="caret"></i>
                            </a>
                            <ul class="dropdown-menu animate bk-secd-menu allblock" data-animation="fadeIn" role="menu" style="right: 5px;">
                                <li v-for="item in userNameDropdown" :key="item.index"><a :href="item.optionHref">{{item.optionText}}</a></li>
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
    </header>
</template>

<script>
    $(function () { 
        var $dropdownLi = $('#bitMenu li.dropdown');

        $dropdownLi.mouseover(function() {
          $(this).addClass('open');
        }).mouseout(function() {
          $(this).removeClass('open');
        });
    })

    export default {
        name: 'assetHeaderNav',
        data () {
            return {
                bkToolBarData: {
                    informationText: '信息资讯',
                    informationHref: '#',
                    recommedText: '邀请享分红',
                    recommedHref: '#',
                    chbtcText: 'CHBTC资产转入',
                    chbtcHref: '#'
                },
                fundDropdown: [
                    {
                      optionHref: '/views/asset/asset.html#/financeAsset',
                      optionText: '账户资产'
                    },
                    {
                      optionHref: '/views/asset/asset.html#/payin',
                      optionText: '充币'
                    },
                    {
                      optionHref: '/views/asset/asset.html#/payout',
                      optionText: '提币'
                    },
                    {
                      optionHref: '/views/asset/asset.html#/account',
                      optionText: '地址管理'
                    },
                    {
                      optionHref: '/views/asset/asset.html#/bill',
                      optionText: '交易账单'
                    }
                ],
                userNameDropdown: [
                    {
                      optionHref: '/views/user/user.html#/basic',
                      optionText: '账户信息'
                    },
                    {
                      optionHref: '/views/user/user.html#/strategy',
                      optionText: '安全设置'
                    },
                    {
                      optionHref: '/views/user/user.html#/log',
                      optionText: '安全日志'
                    },
                    {
                      optionHref: '/views/user/user.html#/message',
                      optionText: '消息提醒'
                    },
                    {
                      optionHref: '/views/user/user.html#/api',
                      optionText: 'API设置'
                    },
                    {
                      optionHref: '/views/auth/auth.html#/email',
                      optionText: '身份认证'
                    }
                ],
                navLiActive: [false, false, false, false, false] 
            }
        },
        methods: {
            
        },
        created() {
            let currentUrl = window.location.href;
            let navUrl = ["market","goods","help","asset","user"];
            for (var i = 0; i < navUrl.length; i++) {
                if (currentUrl.indexOf(navUrl[i]) > -1) {
                    this.navLiActive[i] = true;
                }
            }
        },
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
