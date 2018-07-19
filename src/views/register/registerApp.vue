<template>
    <div  id="register">
        <!-- 页面头部 开始 -->
        <header-register></header-register>
        <!-- 页面头部 结束 -->

        <div id="main">
            <div id="" class="container-fluid">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="register_wrap">
                            <p class="register_title" id="login_log">注册</p>

                            <el-form :model="registerForm" ref="registerForm" :rules="registerRules" :label-width="formLabelWidth" class="register_form">
                                <el-form-item label="" prop="userName">
                                    <el-input v-model="registerForm.userName" placeholder="手机号码/邮箱"  auto-complete="off" class="acount" :readonly="acountDisabled">
                                        <i class="fa fa-user el-input__icon" slot="prefix"></i>
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="" prop="userPwd">
                                    <el-input v-model="registerForm.userPwd" placeholder="设置登录密码" auto-complete="off" type="password" class="pwd">
                                        <i class="fa fa-lock el-input__icon" slot="prefix"></i>
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="" prop="confirmPwd">
                                    <el-input v-model="registerForm.confirmPwd" placeholder="重复登录密码" auto-complete="off" type="password" class="confirm_pwd">
                                        <i class="fa fa-lock el-input__icon" slot="prefix"></i>
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="">
                                    <el-input v-model="registerForm.recommendCode" placeholder="推荐码(非必填)" auto-complete="off" class="recommend_code">
                                        <i class="fa fa-star el-input__icon" slot="prefix"></i>
                                    </el-input>
                                </el-form-item>

                                <el-form-item prop="imgCode">
                                    <el-input v-model="registerForm.imgCode" placeholder="图形验证码" auto-complete="off" class="img_code">
                                        <i class="fa fa-key el-input__icon" slot="prefix"></i>
                                    </el-input>
                                    <input v-if="isFirst" type="button" name="sendImgCodeBtn" id="sendImgCodeBtn" class="send_code_btn" 
                                            value="点击获取" @click="getImgCode()"/>
                                    <img v-if="isImgCodeShow" id="imgIdentifyCode" class="register_identifycode_img" 
                                            :src="imgCodeSrc" alt="加载中..."  @click="getImgCode()"/>
                                </el-form-item>

                                <el-form-item prop="mobileCode">
                                    <el-input v-model="registerForm.mobileCode" placeholder="验证码" auto-complete="off" class="recommend_code">
                                        <i class="fa fa-key el-input__icon" slot="prefix"></i>
                                    </el-input>
                                    <input type="button" name="sendCodeBtn" id="sendCodeBtn" class="send_code_btn" v-model="sendCodeText" @click="sendCode()"/>
                                </el-form-item>

                                <el-form-item class="register_sele" prop="isAgree">
                                    <el-checkbox class="register_sele_checkbox" id="registerAgreement" v-model="registerForm.isAgree"></el-checkbox>
                                    <span class="register_sele_remember" id="agreementText">我已阅读并同意</span>
                                    <a class="register_sele_protocol" href="#" id="register_protocol">《用户协议》</a>
                                </el-form-item>
                            </el-form>

                            <button class="register_button" id="register_button" @click="registerFunc('registerForm')">立即注册</button>
                            <a href="/views/login/login.html" class="register_goto_login" id="registerGotoLogin">已有账号立即登录</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headerRegister from '@/components/loginRegisterHeader'
    import commonJS from './../../assets/js/common_method'
    export default {
        name: 'registerApp',
        components: {headerRegister},
        data() {
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

            // 校验密码：长度8-20位，必须含有数字和字母，支持特殊字符
            var checkPwd = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入密码'));
                } else {
                    var regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\\\\(\\\\)])+$)([^(0-9a-zA-Z)]|[\\\\(\\\\)]|[a-zA-Z]|[0-9]){8,16}$/;

                    if (!regPwd.test(value)) {
                        callback(new Error('密码8~16位字符，且为字母、数字、符号等任意2种及以上组合'));
                    }

                    if (this.registerForm.confirmPwd !== '') {
                        this.$refs.registerForm.validateField('confirmPwd');
                    }
                    callback();
                }
            };

            // 校验确认密码：是否与密码框一致
            var checkConfirmPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.userPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            // 校验是否同意用户协议
            var checkAgreement = (rule, value, callback) => {
                if (value === false) {
                    callback(new Error('请您同意用户协议'));
                } else {
                    callback();
                }
            };

            return {
                registerForm: {
                    userName: '',
                    userPwd: '',
                    confirmPwd: '',
                    recommendCode: '',
                    imgCode: '',
                    mobileCode: '',
                    isAgree: true,
                },
                formLabelWidth: '0px',
                imgId: '',
                imgCodeSrc: '',
                isImgCodeShow: false,
                isFirst: true,
                userType: '',
                sendCodeText: '点击获取',
                countdown: 60,
                acountDisabled: false,
                takeMsgCode: false,
                registerRules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur'},
                        { validator: checkUserName, trigger: ['blur', 'change'] }
                    ],
                    userPwd: [
                        { required: true, message: '请输入密码', trigger: 'blur'},
                        { validator: checkPwd, trigger: ['blur', 'change'] }
                    ],
                    confirmPwd: [
                        { validator: checkConfirmPwd, trigger: ['blur','change'] }
                    ],
                    imgCode: [
                        { required: true, message: '请输入图形验证码', trigger: ['blur', 'change']},
                        { min: 4, max: 4, message: '图形验证码为4位字符', trigger: ['blur', 'change']}
                    ],
                    mobileCode: [
                        { required: true, message: '请输入验证码', trigger: ['blur', 'change']}
                    ],
                    isAgree: [
                        { validator: checkAgreement, trigger: ['blur','change'] }
                    ]
                }
            }
        },
        methods: {
            registerFunc(formName) {
                let _this = this;

                let registerForm = _this.registerForm;
                let _userName = $.trim(registerForm.userName);
                let _userPwd = registerForm.userPwd;
                let _confirmPwd = registerForm.confirmPwd;
                let _recommendCode = registerForm.recommendCode;
                let _imgCode = $.trim(registerForm.imgCode);
                let _mobileCode = registerForm.mobileCode;
                let _userType = _this.userType;

                let submitData = {
                    account : _userName,
                    password: _userPwd,
                    picVerifyCode: _imgCode,
                    platform: 3,
                    rePassword: _confirmPwd,
                    recommender : _recommendCode,
                    type: _userType,
                    verifyCode : _mobileCode
                };

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (_this.takeMsgCode == false) {
                            this.$message.error('请先获取验证码');
                            return false;
                        }

                        $.ajax({
                            url: "/web/register/account",
                            type: "POST",
                            contentType : "application/json",
                            data: JSON.stringify(submitData),
                            dataType: "json",
                            complete: function() {
                                _this.imgCode = "";
                                _this.getImgCode();
                            },
                            success: function(res) {
                                if (res.code == 200) {
                                    _this.$cookie.set("BCKJ_safePwdStatus", false);
                                    window.location.href = "/views/pwd/pwd.html#/setSafePwd";
                                } else {
                                    _this.$message.error(res.msg);
                                }
                            }
                        });
                    }
                });
            },

            // 获取图片验证码
            getImgCode() {
                let _this = this;

                let _userName = _this.registerForm.userName;

                this.$refs['registerForm'].validateField('userName',(validMessage)=>{
                    if(validMessage == '') {
                        _this.isFirst = false;
                        _this.isImgCodeShow = true;

                        _this.imgCodeSrc = "/web/register/getPicVerifyCode/"+ _userName + "?" +new Date().getTime();
                    }
                });
            },

            // 发送短信验证码 
            sendCode() {
                let _this = this;
                let _userName = _this.registerForm.userName;
                let _imgCode = _this.registerForm.imgCode;
                let validUserName = '';
                let validImgCode = '';



                this.$refs['registerForm'].validateField('userName',(validMessage)=>{
                    validUserName = validMessage;
                });

                this.$refs.registerForm.validateField('imgCode', (validMessage) =>{
                    validImgCode = validMessage;
                });

                if (validUserName != "" || validImgCode != "") {
                    return false;
                }

                if (_this.isImgCodeShow == false) {
                    this.$message.error('请先获取图形验证码');
                    return false;
                }

                let sendCodeUrl = "/web/register/sendMsgVerifyCode/"+_userName +"/" + _imgCode + "/"+ _this.userType;
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
                            _this.registerForm.imgCode = '';
                            _this.getImgCode();
                            _this.acountDisabled = false;
                            _this.$message.error(res.msg);
                        }
                    }
                });
            },
            // 发送短信验证码倒计时
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

        }
    }
</script>

<style lang="less">
    @import './register.less';
    #register {
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
    .register_wrap input[disabled] {
        cursor: not-allowed;
    }
</style>
    
