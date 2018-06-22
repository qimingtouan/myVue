<template>  
    <div class="safe-rd snav-rd ml0">
        <div class="hd nb_head_wrap">
           <h3><i class="fa fa-lock"></i><b>固态登录密码设置</b></h3>
           <a href="/views/user/user.html" class="nb_head_goback"><i aria-hidden="true" class="fa fa-reply fa-lg"></i>返回</a>
        </div>

        <div class="authbody">
            <div class="container">
                <input type="hidden" name="pubTag" value="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCA77Uedwfaguw+bS4vTtkZoJO1WPy6YzxN9Ady1s1Do6UxiQD7LJRJgKGhyCqWcV8/AJTEGtya6QFlRbcpLjUV+pMPkIkUNir6cLwlRw33o7X/TFZvJJcr+OzMlVHu/FhnUIcNuSrBp+KR/4EkZJMKZ8CxktqRXfVxIwRhI9+S6wIDAQAB">
                <input type="hidden" id="mobileStatu" value="2">
                <input type="hidden" id="emailStatu" value="2">
                <input type="hidden" id="payEmailAuth" value="">

                <div class="bk-onekey-form" id="mainForm">
                    <div class="line"></div>

                    <div class="form-line row">
                        <div class="col-sm-4 textright">当前登录密码：</div>
                        <div class="col-sm-7">
                            <input type="password" id="currentPassword" name="currentPassword" v-model="currentPassword" 
                                    class="form-control form-second pull-left inputlong smallfont" >
                        </div>
                    </div>

                    <div class="form-line row">
                        <div class="col-sm-4 textright">新登录密码：</div>
                        <div class="col-sm-7">
                            <input type="password" name="pwd" id="pwd" v-model="pwd" 
                                    class="form-control form-second pull-left inputlong smallfont" size="35" 
                                    mytitle="密码强度<img id='mimaqiangdu' height='7' style='padding-left:5px;' src='https://s.zb.com/statics/img/cn/user/level/mmqd_5.gif' width='161' /><br/>登录密码8~20位，且为字母、数字、符号等任意2种以上组合。" 
                                    errormsg="登录密码8~20位，且为字母、数字、符号等任意2种以上组合。" 
                                    pattern="limit(8,20);checkPwd()" 
                                    nohide="true">
                            <input id="pwdLevel" type="hidden" name="pwdLevel" value="40">
                        </div>
                    </div>

                    <div class="form-line  row">
                        <div class="col-sm-4 textright">确认新登录密码：</div>
                        <div class="col-sm-7">
                            <input type="password" name="repassWord" id="repassWord" v-model="repassWord" 
                                    class="form-control form-second pull-left inputlong smallfont" size="35" 
                                    errmsg="两次输入的密码不一致。" 
                                    pattern="limit(6,20);matchof('pwd')" 
                                    errorname="确认新密码">
                        </div>
                    </div>

                    <div id="validPhoneCode">
                        <div class="form-line row">
                            <div class="col-sm-4 textright">短信验证码：</div>
                            <div class="col-sm-7">
                                <input type="text" name="mobileCode" id="mobileCode" v-model="mobileCode"  
                                        class="form-control form-second pull-left inputlong smallfont" style="width:250px"
                                        placeholder="请输入您收到的验证码" 
                                        errormsg="验证码错误，请重新输入。" 
                                        errorname="验证码" 
                                        pattern="limit(4,10)">
                                <a href="javascript:void(0)" class="buttonCommon">
                                    <input type="button" name="sendCodeBtn" id="sendCodeBtn" value="点击获取" 
                                            class="abtn-red nb_send_code_btn" 
                                            @click="sendCode()" newstyle="true" stylename="buttonCommon">
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="form-line  row">
                        <div class="col-sm-4 textright"></div>
                        <div class="col-sm-7">
                            <div class="do">
                                <a href="/views/user/user.html" tabindex="5" class="btn btn-outsecond btn-lg hide">取消</a>
                                <a @click="save()" tabindex="8" class="btn btn-outsecond btn-lg"><i class="fa fa-check fa-lg  fa-fw"></i>&nbsp; 提交</a>
                                <a href="/views/pwd/pwd.html#/forgetPwd" target="_blank" class="btn btn-outsecond btn-lg">忘记登录密码？</a>
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
        name: 'safe_rd_password',
        data() {
           return {
                currentPassword: '',
                pwd: '',
                repassWord: '',
                mobileCode: '',
                countdown: 60
           }
        },
        methods: {
            //发送短信验证码
            sendCode() {
                let _this = this;
                $.ajax({
                    type : "POST",
                    url : "https://vip.zb.com/user/userSendCode",
                    data : {
                        codeType : 24
                    },
                    dataType : "json",
                    error : function(err) {
                        // JuaBox.info(jsLan[1]);
                        // inAjaxing = false;
                        console.log(err);
                        alert("Error");
                    },
                    success : function(json) {
                        // inAjaxing = false;
                        if (json.isSuc) {
                            if (json.datas.isEmail) {
                                // JuaBox.info(json.des);
                                alert(json.des);
                            }
                            _this.settime($('#sendCodeBtn'));
                        } else if ('needMobileAuth' == json.des) {
                            alert("您未进行手机认证，请先进行手机认证");
                        } else {
                            alert(json.des);
                        }
                    }
                });
            },

            settime(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdown == 0) {
                    _obj.removeAttr("disabled");
                    _obj.val("点击获取");
                    _this.countdown = 60;
                } else {
                    _obj.attr("disabled", true);
                    _obj.val("已发送"+"(" + _this.countdown + ")");
                    _this.countdown--;
                    setTimeout(function() {
                        _this.settime(_obj);
                    }, 1000)
                }
            },

            save() {
                let _this = this;
                // var datas = FormToStr("mainForm");
                // if(datas==null){return;}
                
                // var encrypt = new JSEncrypt({default_public_exponent : '65537'});
                // var pubTag = $("input[name='pubTag']").val();
                // encrypt.setPublicKey(pubTag);
                
                let currentPassword = _this.currentPassword;
                // currentPassword = encrypt.encrypt(currentPassword);
                let pwd = _this.pwd;
                // pwd = encrypt.encrypt(pwd);
                
                var mobileCode = _this.mobileCode;
                var pwdLevel = $('#pwdLevel').val();
                var actionUrl = "https://vip.zb.com/u/safe/safepwd/LoginSet/saveLoginPassword";
                
                $.ajax({
                    type : "POST",
                    url : actionUrl,
                    data : {
                        currentPassword: currentPassword,
                        pwd: pwd,
                        mobileCode: mobileCode,
                        pwdLevel: pwdLevel
                    },
                    dataType : "json",
                    error : function(err) {
                        /*JuaBox.sure(jsLan[1]);
                        inAjaxing = false;*/
                        console.log(err);
                        alert("error ");
                    },
                    success : function(json) {
                        // inAjaxing = false;
                        if (json.isSuc) {
                            // JuaBox.sure(json.des, {
                            //     closeFun:function() {
                            //         Redirect('/u/safe');
                            //     }
                            // });
                            alert(json.des)
                            window.location.href = "/views/user/user.html";
                        } else {
                            // JuaBox.sure(json.des);
                            alert(json.des);
                        }
                    }
                });
            }
        },
        created() {
            $.getJSON("https://vip.zb.com/user/getPubTag?d="+new Date().getTime(),  function(json) {
                $('input[name="pubTag"]').val(json.datas.pubTag);
            });
        },
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    
</style>
