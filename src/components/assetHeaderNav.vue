<template>
    <header class="navbar navbar-static-top bk-nav navbar-black">
        <div class="bk-toolBar clearfix" style="display: none;">
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
                    <a class="navbar-brand bk-nav-logo" href="/views/home/index.html" title="NB.COM">
                        <img src="../assets/img/logo2.png" alt="NB">某某交易网
                    </a>
                </div>
                <nav id="bitMenu" class="navbar-collapse bk-navbar collapse" aria-expanded="false" >
                    <ul class="nav navbar-nav navbar-right" style="margin-right:0;">
                        <li><a href="/views/home/index.html" target="_self" :class="{active:navLiActive[2]}">首页</a></li>

                        <li><a href="/views/market/market.html" target="_self" :class="{active:navLiActive[0]}">币种详情</a></li>

                        <li class="dropdown bk-secd regbtn menu-market-down">
                            <a class="dropdown-toggle" :class="{active:navLiActive[1]}" data-toggle="dropdown" role="button" aria-expanded="false" onclick="location.href='/views/goods/goods_trade.html'">
                                币币交易&nbsp;<i class="caret"></i>
                            </a>
                            <!-- <ul class="dropdown-menu animated bk-secd-menu allblock" data-animation="fadeIn" role="menu" style="right:-35px;  ">
                                <li><a href="#">自选</a></li>
                                <li><a href="#">ETH</a></li>
                                <li><a href="#">USDT</a></li>
                                <li><a href="#">BTC</a></li>
                            </ul> -->
                        </li>

                        <li class="dropdown bk-secd logined" id="fund-dropdown">
                            <a class="dropdown-toggle" :class="{active:navLiActive[3]}" role="button" @click="jumpTo(assertHref)">财务&nbsp;
                                <i v-if="isLoginFlag" class="caret"></i>
                            </a>
                            <ul v-if="isLoginFlag" class="dropdown-menu animated bk-secd-menu allblock" data-animation="fadeIn" role="menu" style="right:-50px;">
                                <li v-for="item in fundDropdown" :key="item.index"><a @click="jumpTo(item.optionHref)">{{item.optionText}}</a></li>
                            </ul>
                        </li>

                        <li v-if="!isLoginFlag"><a href="/views/login/login.html" target="_self">登录</a></li>
                        <li v-if="!isLoginFlag"><a href="/views/register/register.html" target="_self">注册</a></li>

                        <li v-if="isLoginFlag" class="logined dropdown bk-secd">
                            <a class="dropdown-toggle" :class="{active:navLiActive[4]}" data-toggle="dropdown" role="button" aria-expanded="false" 
                                @click="jumpTo(userCenterHref)">
                                <span id="M_userName">{{userName}}</span>&nbsp;&nbsp;<i class="caret"></i>
                            </a>
                            <ul class="dropdown-menu animate bk-secd-menu allblock" data-animation="fadeIn" role="menu" style="right: 5px;">
                                <li v-for="item in userNameDropdown" :key="item.index"><a @click="jumpTo(item.optionHref)">{{item.optionText}}</a></li>
                            </ul>
                        </li>

                        <li v-if="isLoginFlag" class="logined quit">
                            <a title="退出登录" @click="logOut()"><i class="fa fa-sign-out"></i></a>
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
                assertHref: "/views/asset/asset.html",
                fundDropdown: [
                    {
                      optionHref: '/views/asset/asset.html#/financeAsset',
                      optionText: '账户资产'
                    },
                    {
                      optionHref: '/views/asset/asset.html#/payin/',
                      optionText: '充币'
                    },
                    {
                      optionHref: '/views/asset/asset.html#/payout/',
                      optionText: '提币'
                    },
                    {
                      optionHref: '/views/asset/asset.html#/account/',
                      optionText: '地址管理'
                    },
                    {
                      optionHref: '/views/asset/asset.html#/bill',
                      optionText: '交易账单'
                    }
                ],
                userCenterHref: "/views/user/user.html",
                userNameDropdown: [
                    {
                      optionHref: '/views/user/user.html#/basic',
                      optionText: '账户信息'
                    },
                    {
                      optionHref: '/views/user/user.html#/api',
                      optionText: 'API设置'
                    }
                ],
                navLiActive: [false, false, false, false, false],
                userName: '',
                isLoginFlag: false
            }
        },
        methods: {
            // 判断用户是否登录
            isLogin() {
                let _principal = this.$cookie.get("BCKJ_PRINCIPAL");
                if (_principal) {
                    return true;
                }
                this.$cookie.delete("BCKJ_safePwdStatus");
                this.$cookie.delete("BCKJ_authLevel");
                return false;
            },

            // 判断是否设置了资金安全码
            hasSafePwd() {
                let _safePwdStatus = this.$cookie.get("BCKJ_safePwdStatus");
                if (_safePwdStatus && _safePwdStatus == "true") {
                    return true;
                }
                return false;
            },

            // 退出登录
            logOut() {
                let _this = this;
                $.ajax({
                    type : "GET",
                    url: "/user/login/loginOut",
                    dataType : "json",
                    success: function(res) {
                        if (res.code == 200) {
                            _this.$cookie.delete("BCKJ_safePwdStatus");
                            _this.$cookie.delete("BCKJ_authLevel");
                            window.location.href = "/views/home/index.html"; // 退出登录跳到首页
                        } else {
                            _this.$message.error(res.msg);
                        }
                    }
                });
            },

            jumpTo(toHref) {
                if(this.isLogin()) {
                    if (this.hasSafePwd()) {
                        window.location.href = toHref;
                    } else {
                        this.$message.error("为了您的资金安全，请设置资金安全密码");
                        window.location.href = "/views/pwd/pwd.html#/setSafePwd";
                    }
                } else {
                    this.$message.error("请先登录");
                }
            }
        },
        created() {
            let currentUrl = window.location.href;
            let navUrl = ["market","goods","help","asset","user"];
            for (var i = 0; i < navUrl.length; i++) {
                if (currentUrl.indexOf(navUrl[i]) > -1) {
                    this.navLiActive[i] = true;
                }
            }

            if(this.isLogin()) {
                this.isLoginFlag = true;
                this.userName = this.$cookie.get('BCKJ_VISITOR').replace(/\"/g,"");
            } else {
                this.isLoginFlag = false;
            }
        },
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    /* bk-menuBar start */
    .navbar-black .bk-menuBar {
        background-color: #fdfdfd;
        border-bottom: 1px solid #eaebeb
    }
    .bk-nav .navbar-header {
        padding: 0;
        position: relative;
        z-index: 100;

        img{
            height: 47px;
            width: auto;
            display: inline-block;
            padding-right: 10px;
        }
        a.navbar-brand {
            padding: 0;
            padding-top: 1px;
            width: auto;
            height: 53px;
            display: block;
            background-repeat: no-repeat;
            background-position: left center;
            overflow: hidden;
            background-size: 65%;
            font-size: 20px;
            color: rgba(60,75,92,1);
            font-weight: bold;
        }
    }
    .bk-nav {
        .bk-sec-menu {
            border: 4px solid rgba(251,212,207,0.25);
            border-top: 0;
            padding: 0;
        }
        .bk-secd-menu:after {
            content: "";
            width: 18px;
            height: 12px;
            display: block;
            position: absolute;
            top: -11px;
            right: 50%;
            margin-right: -9px;
            background-image: url('../assets/img/dropdown_arrow.png');
            background-repeat: none;
            z-index: 1025; 
        }
        .bk-secd-menu:before {
            content: "";
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            border: 1px solid #eee;
            z-index: 1020 
        }
        .bk-secd-menu {
            width: 180px;
            right: -30px;

            li a img {
                height: 16px;
                width: auto;
                margin-top: -1px;
                vertical-align: middle;
                display: inline-block;
                margin-right: 3px
            }
        }
    }

    @media(min-width: 769px) {
        .navbar {
            border-radius:0
        }
        .navbar-static-top {
            padding-left: 0;
            padding-right: 0;
            border-radius: 0;
        }
        .navbar-nav>li {
            min-width: 0;
            height: 80px;
            padding: 20px 10px 0;
        }
        .en .navbar-nav>li {
            padding-left: 10px;
            padding-right: 10px
        }
        .bk-secd-menu {
            background-color: transparent;
            border-image: none;
            border: 0;
            border-radius: 0;
            -webkit-box-shadow: none;
            box-shadow: none;
            width: 400px;
            right: -140px;

            .bk-secd-menu-list {
                min-height: 200px;
                border-left: 1px solid #eaebeb;
                padding: 0 10px;
                display: table-cell;
                vertical-align: top;
                float: none;

                li.sxb a {
                    margin: 15px auto;
                    height: 26px;
                    line-height: 26px;
                    padding: 0;
                    border-radius: 17px;
                    background-color: #3a3a3a;
                    color: #edfbfe;
                    text-align: center;
                }
                li.sxb a:hover {
                    background-color: #009cde;
                    color: #fff;
                }
            }
            .bk-secd-menu-list:first-child {
                border-left: none;
            }
            .bk-secd-menu-list:last-child {
                padding-right: 0;
            }

            li {
                position: relative;
                z-index: 1025;
                text-align: left;
                width: 16.6%;
                float: left;
                padding-left: 6px;
                a {
                    display: inline-block;
                    padding: 7px 0 7px 15px;
                    font-size: 12px;
                    line-height: 26px;
                    color: #333;
                    white-space: normal;
                    word-break: keep-all;
                    text-align: left;
                    padding-left: 15px;
                    text-decoration: none;
                }
            }
            li:focus, li:hover {
                color: #333;
                background-color: #fdf2f1;
                text-decoration: none;
            }
        }
        .bk-secd-menu.allblock li,.bk-secd-menu.allblock li a {
            width: 100%;
            text-align: center;
            padding-left: 0
        }
        .bk-nav.navbar-black .bk-navbar .nav {
            >li>a {
                color: #4b4c4d;
            }
            >li>a.active, >li>a:focus, >li>a:hover, .open>a, .open>a:focus, .open>a:hover {
                // color: #de211d; //红色
                color: rgba(255, 163, 56, 1); // 黄色
            }
        }
        .bk-navbar {
            position: relative;
            .nav>li>a {
                color: #fff;
                max-height: 80px;
                padding-bottom: 5px;
                overflow: hidden;
                font-size: 14px;
                font-weight: normal;
                z-index: 1005;
                border: 0;
                padding: 15px 5px 25px;
                display: inline-block;
            }
            .nav>li>a.active, .nav>li>a:focus, .nav>li>a:hover, .nav>li>a.active:focus, .nav>li>a.active:hover, .nav>li:focus>a.active, .nav>li:hover>a.active,
            .nav .open>a, .nav .open>a:focus, .nav .open>a:hover, .nav .open>a.active:focus, .nav .open>a.active:hover {
                color: #c42320;
                background-color: transparent;
            }
            .nav>li.quit {
                min-width: 0;
                padding-left: 0;
                padding-right: 0;
                >a {
                    padding: 15px 0;
                }
            }
        }
        .bk-nav .navbar-header a.navbar-brand {
            margin-left: 0;
            margin-top: 15px
        }
        .bk-nav {
            .bk-secd-menu {
                min-width: 180px;
                width: 100%;
                padding: 10px;
                background-color: #fff;
                border: 1px solid #eaebeb;
                z-index: 1015;
                font-family: "SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            .bk-toolBar .bk-secd-menu {
                z-index: 1100;
            }
        }

    }
    /* bk-menuBar end */
</style>
