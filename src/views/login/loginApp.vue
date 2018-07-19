<template>
    <div  id="login">
        <!-- 页面头部 开始 -->
        <header-login></header-login>
        <!-- 页面头部 结束 -->

        <div id="main">
            <div id="" class="container-fluid">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="login_wrap">
                            <p class="login_title" id="login_log">登录</p>

                            <el-form :model="loginForm" ref="loginForm" :rules="loginRules" :label-width="formLabelWidth" class="login_form">
                                <el-form-item prop="userName">
                                    <el-input v-model="loginForm.userName" placeholder="手机号码/邮箱账号"  auto-complete="off" class="account" id="account" :readonly="acountDisabled">
                                        <i class="fa fa-user el-input__icon" slot="prefix"></i>
                                    </el-input>
                                </el-form-item>

                                <el-form-item prop="loginPwd">
                                    <el-input v-model="loginForm.loginPwd" placeholder="登录密码" auto-complete="off" type="password" class="pwd">
                                        <i class="fa fa-lock el-input__icon" slot="prefix"></i>
                                    </el-input>
                                </el-form-item>

                                <!-- <el-form-item prop="mobileCode">
                                    <el-input v-model="loginForm.mobileCode" placeholder="验证码" auto-complete="off" class="recommend_code">
                                        <i class="fa fa-key el-input__icon" slot="prefix"></i>
                                    </el-input>
                                    <input type="button" name="sendCodeBtn" id="sendCodeBtn" class="send_code_btn" v-model="sendCodeText" 
                                            @click="sendCode()"/>
                                </el-form-item> -->

                                <el-form-item class="login_sele">
                                    <el-checkbox class="login_sele_checkbox" id="loginRememberMe" v-model="loginForm.isRememberMe"></el-checkbox>
                                    <span class="login_sele_remember" id="login_remenber">记住用户名</span>
                                    <a class="login_sele_foget" href="/views/pwd/pwd.html#/forgetPwd?type=0" id="login_foget">忘记密码</a>
                                </el-form-item>
                            </el-form>

                            <button class="login_button" id="login_button" @click="login('loginForm')">立即登录</button>
                            <a href="/views/register/register.html" class="login_goto_register" id="login_register">没有账号？去注册</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import headerLogin from '@/components/loginRegisterHeader'
    import commonJS from './../../assets/js/common_method'
    export default {
        name: 'loginApp',
        components: {headerLogin},
        data(){
            // 校验用户名：1.手机号   2.邮箱
            var checkUserName = (rule, value, callback) => {
                let userCount = $.trim(value);
                if (!userCount) {
                    this.userType = '';
                    return callback(new Error("请输入用户名"));
                }
                if (commonJS.hasLetter(userCount) || commonJS.hasOther(userCount) || commonJS.hasChinese(userCount)) {
                    if (commonJS.isEmail(userCount)) {
                        this.userType = 2; // 输入的是邮箱
                        callback();
                    } else {
                        this.userType = 0; // 既不是手机号也不是邮箱
                        callback(new Error("请输入正确的手机号码或邮箱"));
                    }
                } else {
                    this.userType = 1; // 输入的是手机号

                    var reg = /^1[0-9]{10}$/;
                    if (!reg.test(userCount)) {
                        callback(new Error("请输入正确的手机号码或邮箱"));
                    }

                    callback();
                }
            };

            return {
                loginForm: {
                    userName: '',
                    loginPwd: '',
                    mobileCode: '',
                    isRememberMe: false,
                },
                formLabelWidth: '0px',
                userType: '',
                sendCodeText: '点击获取',
                countdown: 60,
                acountDisabled: false,
                takeMsgCode: false,
                loginRules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur'},
                        { validator: checkUserName, trigger: ['blur', 'change'] }
                    ],
                    loginPwd: [
                        { required: true, message: '请输入登录密码', trigger: ['blur', 'change']},
                        { min: 8, message: '密码最少8位', trigger: ['blur', 'change']}
                    ],
                    mobileCode: [
                        { required: true, message: '请输入验证码', trigger: ['blur', 'change']}
                    ]
                }
            }
        },
        methods: {
            // 判断用户是否登录
            isLogin() {
                let _principal = this.$cookie.get("BCKJ_PRINCIPAL");
                if (_principal) {
                    return true;
                }
                return false;
            },

            login(formName) {
                let _this = this;
                let  _loginForm = _this.loginForm;
                let _userName = $.trim(_loginForm.userName);
                let _loginPwd = _loginForm.loginPwd;
                let _loginRememberMe = _loginForm.isRememberMe;
                let _mobileCode = _loginForm.mobileCode;

                this.$refs[formName].validate((valid) =>{
                    if (valid) {
                        // if (_this.takeMsgCode == false) {
                        //     this.$message.error('请先获取验证码');
                        //     return false;
                        // }

                        let loginUrl = "/web/login/login/" + encodeURIComponent(_userName) + "/" + _loginPwd;

                        $.ajax({
                            method: 'POST',
                            url: loginUrl,
                            success: function (res) {
                                if (res.code == 200) {
                                    if (res.data && res.data.authLevel !=0) { // 是否经过实名认证 0-未认证 1-初级认证  2-高级认证
                                        _this.$cookie.set("BCKJ_authLevel", res.data.authLevel);
                                    } else {
                                        _this.$cookie.set("BCKJ_authLevel", 0);
                                    }

                                    if (res.data && res.data.transPwd) { // 已设置资金安全密码，跳到账户资产页面
                                        _this.$cookie.set("BCKJ_safePwdStatus", true);
                                        window.location.href = '../asset/asset.html';
                                    } else { // 未设置资金安全密码，跳到设置资金安全码页面
                                        _this.$cookie.set("BCKJ_safePwdStatus", false);
                                        window.location.href = "/views/pwd/pwd.html#/setSafePwd";
                                    }
                                } else {
                                    _this.$message.error(res.msg);
                                }
                            },
                            complete: function() {
                                if (_loginRememberMe) {
                                    _this.$cookie.set("BCKJ_logusername", _userName, {
                                        expires: 7,
                                        path: "/"
                                    });
                                }
                            }
                        })
                    }
                });
            },

            // 发送验证码 
            sendCode() {
                let _this = this;
                let _userName = _this.loginForm.userName;
                let validUserName = '';

                this.$refs['loginForm'].validateField('userName',(validMessage)=>{
                    validUserName = validMessage;
                });

                if (validUserName != "") {
                    return false;
                }

                let sendCodeUrl = "/web/login/getLoginVCode/" + encodeURIComponent(_userName) + "/" + _this.userType;
                $.ajax({
                    type : "GET",
                    url: sendCodeUrl,
                    dataType : "json",
                    complete: function() {
                        _this.takeMsgCode = true;
                    },
                    success: function(res) {
                        if (res.code == 200) {
                            _this.settime($('#sendCodeBtn'));
                        } else {
                            _this.acountDisabled = false;
                            _this.$message.error(res.msg);
                        }
                    }
                });
            },
            // 发送验证码倒计时
            settime(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdown == 0) {
                    _obj.removeAttr("disabled");
                    _this.sendCodeText = "点击获取";
                    _this.countdown = 60;
                    _this.acountDisabled = false;
                } else {
                    _this.acountDisabled = true;
                    _obj.attr("disabled", true);
                    _this.sendCodeText = "已发送"+"(" + _this.countdown + ")";
                    _this.countdown--;
                    setTimeout(function() {
                        _this.settime(_obj)
                    }, 1000);
                }
            }
        },
        created() {
            let _this = this;
            let _userName = _this.$cookie.get("BCKJ_logusername");
            if (isLogin()) {
                if (_userName != "" && _userName != null) {
                    _this.loginForm.userName = _userName;
                }
                window.location.href = "/views/user/user.html#/basic";  
            }
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

    input.send_code_btn {
        position: absolute;
        top: 0px;
        right: 0;
        cursor: pointer;
        padding-left: 10px;
        padding-right: 10px;
        margin: 10px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #ffa338;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        border: none;
        text-decoration: none;
        outline: none;
    }
    input.send_code_btn:hover {
        background-color: #F8932C;
    }
    .login_wrap input[disabled] {
        cursor: not-allowed;
    }
</style>
    
