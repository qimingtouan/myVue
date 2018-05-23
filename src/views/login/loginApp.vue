<template>
    <div  id="login">
        <div class="navigate_wrap">
            <div class="container navigate_inner">
                <div class="row navigate_row">
                    <a title="牛币" href="/" class="nb_logo">
                        <img class="nb_logo_img" src="./../../assets/img/logo.png" alt="">
                        <div class="nb_logo_text">
                            <span class="nb_logo_name">牛币交易网</span>
                            <span class="nb_logo_domain">www.niub.com</span>
                        </div>
                    </a>
                    <ul class="nb_nav">
                        <!-- <li><a href="../home/index.html">首页</a></li> -->
                        <li><a href="/">首页</a></li>
                        <li><a href="#">交易中心</a></li>
                        <li><a href="#">用户中心</a></li>
                        <li><a href="../asset/asset.html">财务中心</a></li>
                        <li><a href="#">帮助中心</a></li>
                        <li class="active"><a href="login.html">登录</a></li>
                        <li><a href="../register/register.html">注册</a></li>
                    </ul> 
                </div>
            </div>
        </div>
        <div id="main">
            <div id="" class="container-fluid">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="login_wrap">
                            <p class="login_title" id="login_log">牛币登录</p>
                            <form action="" class="login_form">
                                <i class="login_i">
                                    <img src="./../../assets/img/icon-user.png" alt="">
                                </i>
                                <i class="login_i">
                                    <img src="./../../assets/img/icon-password.png" alt="">
                                </i>
                                <input type="text" class="acount" placeholder="用户名/手机号/邮箱账号" id="loginUserName" v-model="loginUserName">
                                <input type="password" class="pwd" placeholder="登录密码" id="loginPwd" v-model="loginPwd">
                            </form>
                            <div class="login_sele">
                                <input class="login_sele_checkbox" type="checkbox" v-model="isRememberMe"><span class="login_sele_remember" id="login_remenber">记住用户名</span>
                                <a class="login_sele_foget" href="/ccc/forget" id="login_foget">忘记密码</a>
                            </div>
                            <button class="login_button" id="login_button" @click="login">立即登录</button>
                            <a href="../register/register.html">
                                <p class="login_goto_register" id="login_register">没有账号？去注册</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'loginApp',
        data(){
            return {
                loginUserName: '',
                loginPwd: '',
                isRememberMe: false
            }
        },
        methods: {
            login() {
                let _this = this;
                let _loginUserName = $.trim(_this.loginUserName);
                let _loginPwd = _this.loginPwd;
                let _loginRememberMe = _this.isRememberMe;
                // let _loginImgCode = _this.loginImgCode;
                if (_loginUserName == "") {
                    alert("请输入用户名");
                    return
                }
                if (_loginPwd.length < 8) {
                    alert("登录密码最少8位字符，请重新输入");
                    return
                }
                // if (imgCode.length < 4) {
                //     alert("图形验证码最少4位字符，请重新输入")
                //     return
                // }

                // 登录接口：方式1
               /* $.post(DOMAIN_VIP + "/user/doLogin?callback=?", {
                    userName: _loginUserName,
                    pwd: _loginPwd
                    // countryCode: countryCode,
                    // code: _loginImgCode
                }, function(json) {
                    lockRequest = false;
                    if (_loginRememberMe) {
                        $.cookie(ZNAME + "logusername", userName, {
                            expires: 7,
                            path: "/",
                            domain: DOMAIN_BASE
                        });
                        $.cookie(ZNAME + "logcountrycode", countryCode, {
                            expires: 7,
                            path: "/",
                            domain: DOMAIN_BASE
                        })
                    }
                    if (json.isSuccess) {
                        var jumpUrl = "/";
                        // if (json.datas && json.datas.needJump) {
                        //     jumpUrl = json.datas.jumpUrl
                        // } else {
                        //     var fromUrl = localStorage[ZNAME + "fromurl"];
                        //     if (fromUrl && fromUrl.indexOf(DOMAIN_MAIN) < 0) {
                        //         jumpUrl = localStorage[ZNAME + "fromurl"]
                        //     } else {
                        //         jumpUrl = DOMAIN_VIP + "/u/asset"
                        //     }
                        // }
                        window.location.href = jumpUrl
                    } else {
                        if (json.datas && json.datas.needRefresh) {
                            JuaBox.sure(json.des, {
                                btnFun1: function(JuaId) {
                                    JuaBox.close(JuaId, function() {
                                        window.location.reload(true)
                                    })
                                }
                            })
                        } else {
                            $("#imgCode").val("");
                            $(getImgBtn).click();
                            JuaBox.sure(json.des);
                            if (json.datas && json.datas.status == 0) {
                                $("#isSafe").val(0);
                                $("#imgCodeForm").show()
                            }
                        }
                    }
                }, "json").error(function() {
                    alert("登录失败")
                })*/

                // 登录接口：方式2
                /*$.post("/login/login.html", {
                    moble: moble,
                    mobles: mobles,
                    password: password,
                    verify: verify,
                    login_token: "",
                }, function (data) {
                    if (data.status == 1) {
                        $.cookies.set('move_moble', moble);
                        layer.msg(data.info, {icon: 1});
                        if (data.url) {
                            window.location = data.url;
                        } else {
                            window.location.reload();
                        }
                    } else {
                        $("#login_verify_up").click();
                        layer.msg(data.info, {icon: 2});
                        if (data.url) {
                            window.location = data.url;
                        }
                    }
                }, "json");*/

                // 登录接口：方式3
                 $.ajax({
                    url: './../../../static/mock/logSuccess.json',
                    // method: 'post',
                    method: 'get',
                    data: {
                        account: _loginUserName,
                        password: _loginPwd
                        // code: _loginImgCode
                        // imageId: login_register.ImageId
                    },
                    cache:false,
                    success: function (data) {
                        console.log(data);
                        if (data.isSuccess) {
                            /*sessionStorage.setItem('token', data.resultMap.token);
                            if (data.resultMap.mobile != null) {
                                sessionStorage.setItem('userName', data.resultMap.mobile);
                                // $('#userNameNav').innerText = data.resultMap.mobile;
                            } else {
                                sessionStorage.setItem('userName', data.resultMap.email);
                                // $('#userNameNav').innerText = data.resultMap.email;
                            }*/

                            window.location.href = '/';

                            // 判断登录成功跳转到哪个页面
                            /*var fromUcenter = window.localStorage.getItem("tologin_from_ucent");

                            if (fromUcenter == 1) {
                                window.localStorage.setItem("tologin_from_ucent", 0);
                                window.location.href = 'userpage.html';
                            } else {
                                window.location.href = document.referrer
                            }
                            if( window.location.href == document.referrer){
                                window.location.href = '/';
                            }
                            var forget = window.sessionStorage.getItem('forget')
                            if(forget == 2){
                                window.location.href = '/';
                            }*/

                        } else {
                            // popAlert(data.message);
                            // login_loadimage()
                        }

                    },
                    error: function (e) {
                        console.log(e)
                        console.log('登录失败')
                    }
                })
            }
        },
        created() {
            
        }
    }
</script>

<style lang="less">
    @import './login.less';
    #login {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
</style>
    
