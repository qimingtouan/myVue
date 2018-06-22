<template>  
    <div class="safe-rd snav-rd ml0">
        <div class="hd nb_head_wrap">
           <h3><i class="fa fa-envelope"></i><b>安全邮箱设置</b></h3>
           <a href="/views/user/user.html" class="nb_head_goback"><i aria-hidden="true" class="fa fa-reply fa-lg"></i>返回</a>
        </div>

        <div class="authbody">
            <div class="container">
                <div class="b_comon_box">

                    <!-- 邮箱已认证 -->
                    <div class="user_main_title1">
                        您的邮箱已经通过认证：<b style="font-family:Arial; color:#f00000;">1***3@qq.com</b>
                    </div>

                    <!-- 邮箱未认证 -->
                    <div class="bk-onekey-form" id="mainForm">
                        <input type="hidden" id="step" value="">

                        <div class="form-line row">
                            <div class="col-sm-4 textright">邮箱地址：</div>
                            <div class="col-sm-7">
                                <input class="form-control form-second pull-left inputlong smallfont" type="text" name="email" id="email" value="" placeholder="请输入您常用的邮箱地址" errormsg="邮箱格式不正确" errorname="邮箱地址" pattern="email();limit(4,50);checkEamil()">
                            </div>
                        </div>

                        <div class="form-line row">
                            <div class="col-sm-4 textright">资金安全密码：</div>
                            <div class="col-sm-7">
                              <input class="form-control form-second pull-left inputlong smallfont" type="password" name="payPwd" id="payPwd" value="" placeholder="请输入您的资金安全密码" errormsg="请确认资金安全密码是否正确" errorname="资金安全密码" pattern="limit(6,20)">
                            </div>
                        </div>

                        <div id="validPhoneCode" class="form-line row ">
                            <div class="col-sm-4 textright">短信验证码：</div>
                            <div class="col-sm-7">
                                <input type="text" class="form-control form-second pull-left inputlong smallfont" name="mobileCode" id="mobileCode" value="" mytitle="请输入发送到您收到的验证码" errormsg="验证码错误，请重新输入。" errorname="验证码" pattern="limit(4,10)" style="width:250px">
                                <input type="button" name="sendCodeBtn" id="sendCodeBtn" value="点击获取" 
                                        class="abtn-red nb_send_code_btn" @click="sendCode()">
                            </div>
                        </div>

                        <div class="do row">
                            <div class="col-sm-4"></div>
                            <div class="col-sm-7">
                                <a href="javascript:sendemail('hassend')" tabindex="8" class="btn btn-outsecond btn-lg"><i class="fa fa-check fa-lg  fa-fw"></i>&nbsp; 提交</a>
                                <a href="/views/pwd/pwd.html#/forgetSafePwd" target="_blank" class="btn btn-outsecond btn-lg">忘记资金安全密码？</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'safe_rd_email',
        data() {
           return {

           }
        },
        methods: {
            
        },
        created() {
            
        },
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    
</style>
