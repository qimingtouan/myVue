<template>
    <div  id="register">
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
                      <li><a href="../login/login.html">登录</a></li>
                      <li class="active"><a href="register.html">注册</a></li>
                    </ul> 
                </div>
            </div>
        </div>
        <div id="main">
            <div id="" class="container-fluid">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="register_wrap">
                            <p class="register_title" id="login_log">牛币注册</p>
                            <form action="" class="register_form">
                                <i class="register_i"><img src="./../../assets/img/icon-user.png" alt=""></i>
                                <i class="register_i"><img src="./../../assets/img/icon-password.png" alt=""></i>
                                <i class="register_i"><img src="./../../assets/img/icon-password.png" alt=""></i>
                                <i class="register_i"><img src="./../../assets/img/icon-star.png" alt=""></i>
                                <i class="register_i"><img src="./../../assets/img/icon-yzm.png" alt=""></i>
                                <input type="text" class="acount form-control" placeholder="手机号码" id="registerUsername">
                                <input type="password" class="pwd form-control" placeholder="设置登录密码" id="registerPwd">
                                <input type="password" class="re_pwd form-control" placeholder="重复登录密码" id="registerRePwd">
                                <input type="text" class="invitate_code form-control" placeholder="推荐码(非必填)" id="registerInvitateCode">
                                <input type="text" class="verify_code form-control" placeholder="图形验证码" id="registerVerifyCode">
                            </form>
                            <div class="register_sele">
                                <input class="register_sele_checkbox" type="checkbox"><span class="register_sele_remember" id="register_remenber">我已阅读并同意</span>
                                <a class="register_sele_protocol" href="#" id="register_protocol">《用户协议》</a>
                            </div>
                            <button class="register_button" id="register_button">立即注册</button>
                            <a href="../login/login.html" class="register_goto_login" id="registerGotoLogin">已有账号立即登录</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'registerApp'
    }
</script>

<style lang="less">
    @import './register.less';
    #register {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
</style>
    
