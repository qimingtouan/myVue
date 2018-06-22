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

                            <el-form :model="registerForm" class="register_form">
                                <el-form-item label=" " :label-width="formLabelWidth">
                                    <el-input v-model="registerForm.userName" placeholder="手机号码/邮箱"  auto-complete="off" class="acount">
                                        <i class="fa fa-user el-input__icon" slot="prefix"></i>
                                    </el-input>
                                </el-form-item>

                                <el-form-item label=" " :label-width="formLabelWidth">
                                    <el-input v-model="registerForm.userPwd" placeholder="设置登录密码" auto-complete="off" type="password" class="pwd">
                                        <i class="fa fa-lock el-input__icon" slot="prefix"></i>
                                    </el-input>
                                </el-form-item>

                                <el-form-item label=" " :label-width="formLabelWidth">
                                    <el-input v-model="registerForm.confirmPwd" placeholder="重复登录密码" auto-complete="off" type="password" class="confirm_pwd">
                                        <i class="fa fa-lock el-input__icon" slot="prefix"></i>
                                    </el-input>
                                </el-form-item>

                                <el-form-item label=" " :label-width="formLabelWidth">
                                    <el-input v-model="registerForm.recommendCode" placeholder="推荐码(非必填)" auto-complete="off" class="recommend_code">
                                        <i class="fa fa-star el-input__icon" slot="prefix"></i>
                                    </el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-input v-model="registerForm.imgCode" placeholder="图形验证码" auto-complete="off" class="img_code">
                                        <i class="fa fa-key el-input__icon" slot="prefix"></i>
                                    </el-input>
                                    <img id="imgIdentifyCode" class="register_identifycode_img" src="" alt="正在加载..."  @click="getImgCode"/>
                                </el-form-item>

                                <el-form-item class="register_sele">
                                    <input type="checkbox" class="register_sele_checkbox" id="registerAgreement"  v-model="registerForm.isChecked">
                                    <span class="register_sele_remember" id="agreementText">我已阅读并同意</span>
                                    <a class="register_sele_protocol" href="#" id="register_protocol">《用户协议》</a>
                                </el-form-item>
                            </el-form>

                            <button class="register_button" id="register_button" @click="registerFunc">立即注册</button>
                            <a href="../login/login.html" class="register_goto_login" id="registerGotoLogin">已有账号立即登录</a>
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
            return {
                registerForm: {
                    userName: '123456',
                    userPwd: '123456aA',
                    confirmPwd: '123456aA',
                    recommendCode: '',
                    imgCode: '1234',
                    isChecked: true,
                },
                formLabelWidth: '0px',
                imgId: ''
            }
        },
        methods: {
            registerFunc() {
                let _this = this;
                let registerForm = _this.registerForm;
                let _userName = $.trim(registerForm.userName);
                let _userPwd = registerForm.userPwd;
                let _confirmPwd = registerForm.confirmPwd;
                let _recommendCode = registerForm.recommendCode;
                let _imgCode = $.trim(registerForm.imgCode);
                let _regAgreement = registerForm.isChecked;

                _this.checkUserName(_userName);

                let _userType = _this.userType;

                let _checkPwd = _this.checkPwdStrength(_userPwd);

                if (_userType == 0) {
                    alert("请输入正确的邮箱或者手机号码");
                    return;
                }
                if (_userName.length < 6) {
                    alert("用户名最少6位字符，请重新输入");
                    return;
                }
                if (_userType == 2 && !commonJS.isEmail(_userName)) {
                    alert("邮箱格式错误，请重新输入");
                    return;
                }
                if (_userType == 1 && !commonJS.isAllNumber(_userName.replace(/[+,-]/g, ""))) {
                    alert("手机号码格式错误，请重新输入");
                    return;
                }
                if (_checkPwd < 3) {
                    alert("密码8~20位字符，且为大小写字母、数字、符号等任意2种以上组合。");
                    return;
                }
                if (_confirmPwd != _userPwd) {
                    alert("两次密码输入不一致，请重新输入");
                    return
                }
                if (_confirmPwd != _userPwd) {
                    alert("两次密码输入不一致，请重新输入");
                    return
                }
                if (_imgCode.length < 4) {
                    alert("图形验证码最少4位字符，请重新输入");
                    return
                }
                // if (_userType == 1 && takeMsgCode == false) {
                //     return JuaBox.showWrong(bitbank.L("请先获取短信验证码"))
                // }
                // if (_userType == 1 && msgCode.length < 6) {
                //     return JuaBox.showWrong(bitbank.L("短信验证码最少6位字符，请重新输入"))
                // }
                if (_regAgreement == false) {
                    alert("请您同意ZB用户服务协议");
                    return
                }

                $.ajax({
                    // url: DOMAIN_VIP + "/user/" + (userType == 2 ? "emailReg" : "mobileReg"),
                    url: './../../../static/mock/regSuccess.json',
                    // type: "POST",
                    type: "GET",
                    data: {
                        phonenumber: _userName,
                        email: _userName,
                        password: _userPwd,
                        recommendCode: _recommendCode,
                        code: _imgCode,
                        // mobileCode: msgCode,
                        // pwdLevel: pwdLevel,
                        // countryCode: countryCode,
                        // tuijianId: recommendId,
                        regAgreement: _regAgreement
                    },
                    dataType: "json",
                    complete: function() {
                        _this.imgCode = "";
                        _this.getImgCode();
                    },
                    success: function(json) {
                        console.log(json);
                        if (json.isSuccess) {
                            window.location.href = "/";
                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            },
            checkUserName(name){
                if (typeof name == "undefined" || name.length == 0) {
                    //return $(".cn #countryGroup,#msgCodeForm").hide()
                    //alert("请输入用户名");
                }
                let userCount = $.trim(name);
                if (commonJS.hasLetter(userCount) || commonJS.hasOther(userCount) || commonJS.hasChinese(userCount)) {
                    if (commonJS.isEmail(userCount)) {
                        // $("#countryGroup, #msgCodeForm").hide();
                        this.userType = 2; // 输入的是邮箱
                    } else {
                        // $("#countryGroup, #msgCodeForm").hide();
                        this.userType = 0; // 输入的既不是手机号也不是邮箱
                    }
                } else {
                    // $(".cn #countryGroup, #msgCodeForm").show();
                    this.userType = 1; // 输入的是手机号
                }
                
            },
            // 校验密码强度: 密码8~20位字符，且为大小写字母、数字、符号等任意2种以上组合
            checkPwdStrength(pwd) {
                let level = 0;
                if (pwd.length >= 8 && pwd.length <= 20) {
                    if (/\d/.test(pwd)) {
                        level++;
                    }
                    if (/[a-z]/.test(pwd)) {
                        level++;
                    }
                    if (/[A-Z]/.test(pwd)) {
                        level++;
                    }
                    if (/\W/.test(pwd)) {
                        level++;
                    }
                    if (level > 1 && pwd.length > 12) {
                        level++;
                    }
                }
                return level;
            },
            // 获取图片验证码
            getImgCode() {
                $.ajax({
                    method: 'post',
                    url: 'http://bihuex.com/home-web//getImage',
                    cache:false,
                    success: function (data) {
                        $("#imgIdentifyCode").attr('src', data.resultMap.url);
                        this.imgId = data.resultMap.imageId
                    },
                    error:function (error) {
                        console.log('注册数据链接错误');
                    }

                })
            }
        },
        created() {
            this.getImgCode();
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
</style>
    
