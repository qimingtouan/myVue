<template>
    <div  id="login">
        <div class="navigate_wrap">
            <div class="container navigate_inner">
                <div class="row navigate_row">
                    <a title="牛币" href="http://192.168.0.162:8080/#/" class="nb_logo">
                        <img class="nb_logo_img" src="./../../assets/img/logo.png" alt="">
                        <div class="nb_logo_text">
                            <span class="nb_logo_name">牛币交易网</span>
                            <span class="nb_logo_domain">www.niub.com</span>
                        </div>
                    </a>
                    <ul class="nb_nav">
                      <!-- <li><a href="../home/index.html">首页</a></li> -->
                      <li><a href="http://192.168.0.162:8080/#/">首页</a></li>
                      <li><a href="#">交易中心</a></li>
                      <li><a href="#">用户中心</a></li>
                      <li><a href="#">安全中心</a></li>
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
                                <input type="text" class="acount" placeholder="用户名/手机号/邮箱账号" id="login_username">
                                <input type="password" class="pwd" placeholder="登录密码" id="login_pwd">
                            </form>
                            <div class="login_sele">
                                <input class="login_sele_checkbox" type="checkbox"><span class="login_sele_remember" id="login_remenber">记住用户名</span>
                                <a class="login_sele_foget" href="/ccc/forget" id="login_foget">忘记密码</a>
                            </div>
                            <button class="login_button" id="login_button">立即登录</button>
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
      name: 'loginApp'
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
    
