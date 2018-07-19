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
                    <div v-if="hasEmail" class="user_main_title1">
                        您的邮箱已经通过认证：<b style="font-family:Arial; color:#f00000;">{{emailText}}</b>
                    </div>

                    <!-- 邮箱未认证 -->
                    <div v-if="!hasEmail" class="ctips user_main_title2">
                        <i class="fa fa-lightbulb-o api_tip_i" aria-hidden="true"></i>
                        <p>重要提示：邮箱认证提交后将不能修改。</p>
                        <div class="close" title="关闭">×</div>
                    </div>

                    <div  v-if="!hasEmail" class="bk-onekey-form" id="mainForm">
                        <el-form :model="bindEmailForm" ref="bindEmailForm" label-width="150px" class="auth_form">
                            <el-form-item label="邮箱地址：" prop="mobile">
                                <el-input v-model="bindEmailForm.email" auto-complete="off" class="acount" :readonly="accountDisabled"></el-input>
                            </el-form-item>

                            <el-form-item label="邮箱验证码：" prop="emailCode">
                                <el-input v-model="bindEmailForm.emailCode" auto-complete="off"></el-input>
                                <input type="button" name="sendEmailCodeBtn" id="sendEmailCodeBtn" class="send_code_btn" v-model="sendEamilCodeText" 
                                    @click="sendEmailCode()"/>
                            </el-form-item>

                            <el-form-item label="短信验证码：" prop="mobileCode">
                                <el-input v-model="bindEmailForm.mobileCode" auto-complete="off"></el-input>
                                <input type="button" name="sendCodeBtn" id="sendCodeBtn" class="send_code_btn" v-model="sendCodeText" @click="sendCode()"/>
                            </el-form-item>

                            <el-form-item label="资金安全码：" prop="safePwd">
                                <el-input v-model="bindEmailForm.safePwd" auto-complete="off" type="password" class="pwd"></el-input>
                            </el-form-item>

                            <el-form-item size="large">
                                <div class="do">
                                    <a @click="bindEmailSubmit('bindEmailForm')" class="btn btn-outsecond btn-lg">
                                        <i class="fa fa-check fa-lg"></i>&nbsp; 提交
                                    </a>
                                    <a href="/views/pwd/pwd.html#/forgetSafePwd" target="_blank" class="btn btn-outsecond btn-lg">忘记资金安全密码</a>
                                </div>
                            </el-form-item>
                        </el-form> 
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
                hasEmail: false,
                currentEmail: '',
                emailText: '',
                bindEmailForm: {
                    email: '',
                    emailCode: '',
                    mobileCode: '',
                    safePwd: ''
                },
                accountDisabled: false,
                countdownPhone: 60,
                countdownEmail: 60,
                sendCodeText: '点击获取',
                sendEamilCodeText: '点击获取'
            }
        },
        methods: {
            // 邮箱正则校验
            checkEmail(val) {
                var regExp = new RegExp("^([a-z0-9A-Z]+[-|_|.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?.)+[a-zA-Z]{2,}$");
                if (!regExp.test(val)) {
                    return false;   
                }
                return true;
            },

            // 错误提示弹窗
            errorConfirm(errMsg, errTitle) {
                this.$confirm(errMsg, errTitle, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {

                }).catch(() => {

                });
            },

            // 获取用户邮箱信息
            getUserInfo() {
                let _this = this;

                $.ajax({
                    type : "GET",
                    url: "/web/info/getUserInfo?type=1",
                    dataType : "json",
                    complete: function() {
                        
                    },
                    success: function(res) {
                        if (res.code == 200) {
                            if (res.data) {
                                _this.currentEmail = res.data.email;

                                if (_this.currentEmail) {
                                    _this.hasEmail = true;
                                    _this.emailText = _this.currentEmail.substring(0,1)+"***";
                                    let position = _this.currentEmail.indexOf('@');
                                    _this.emailText += _this.currentEmail.substring(position-1);
                                } else {
                                    _this.hasEmail = false;
                                }
                            }
                        } else {
                            _this.$message.error(res.msg);
                        }
                    }
                });
            },

            // 绑定邮箱： 发送邮箱验证码
            sendEmailCode() {
                let _this = this;
                let _email = _this.bindEmailForm.email;

                
                if (!_this.checkEmail(_email)) {
                    _this.errorConfirm('请输入正确的邮箱地址', '');
                    return false;
                }

                $.ajax({
                    type: "GET",
                    url: "/web/info/clickSendVerifyCode?receiver="+ encodeURIComponent(_email) +"&type=1",
                    dataType: "json",
                    success: function (res) {
                        if (res.code == 200) {
                            _this.setTimeEmail($('#sendEmailCodeBtn'));
                        } else {
                            _this.errorConfirm(res.msg, '');
                        }
                    }
                });
            },
            // 邮箱验证码倒计时
            setTimeEmail(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdownEmail == 0) {
                    _obj.removeAttr("disabled");
                    _this.sendEamilCodeText = "点击获取";
                    _this.countdownEmail = 60;
                } else {
                    _obj.attr("disabled", true);
                    _this.sendEamilCodeText = "已发送(" + _this.countdownEmail + ")";
                    _this.countdownEmail--;
                    setTimeout(function() {
                        _this.setTimeEmail(_obj)
                    }, 1000);
                }
            },

            //发送短信验证码
            sendCode() {
                let _this = this;
                $.ajax({
                    type: "GET",
                    url: "/web/info/clickSendVerifyCode?type=4",
                    dataType: "json",
                    success: function (res) {
                        if (res.code == 200) {
                            _this.setTime($('#sendCodeBtn'));

                            _this.$confirm(res.msg, '', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'success'
                            }).then(() => {

                            }).catch(() => {
                                 
                            });

                        } else {
                            _this.errorConfirm(res.msg, '');
                        }
                    }
                });
            },

            setTime(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdownPhone == 0) {
                    _obj.removeAttr("disabled");
                    _this.sendCodeText = "点击获取";
                    _this.countdownPhone = 60;
                } else {
                    $(obj).attr("disabled", true);
                    _this.sendCodeText = "已发送(" + _this.countdownPhone + ")";
                    _this.countdownPhone--;
                    setTimeout(function () {
                        _this.setTime(_obj);
                    }, 1000)
                }
            },

            // 绑定邮箱提交
            bindEmailSubmit(formName) {
                let _this = this;
                let _bindEmailForm = this.bindEmailForm;
                let _email = _bindEmailForm.email;
                var _emailCode = _bindEmailForm.emailCode;
                var _mobileCode = _bindEmailForm.mobileCode;
                var _safePwd = _bindEmailForm.safePwd;

                if (!_this.checkEmail(_email)) {
                    _this.errorConfirm('请输入正确的邮箱地址', '');
                    return false;
                }

                if (!_emailCode || $.trim(_emailCode) == '') {
                    _this.errorConfirm('请输入您收到的邮件验证码', '');
                    return false;
                }

                if (!_mobileCode || $.trim(_mobileCode) == '') {
                    _this.errorConfirm('请输入发送到您手机上的短信验证码', '');
                    return false;
                }


                if (!_safePwd) {
                    _this.errorConfirm('请输入正确的资金安全密码', '');
                    return false;
                } else {
                    var regSafePwd = /^\d{6}$/;

                    if (!regSafePwd.test(_safePwd)) {
                        _this.errorConfirm('资金安全密码为6位数字','');
                        return false
                    }
                }

                var bindEmailData = {
                    "account": _email,
                    "mobileVcode": _mobileCode,
                    "emailVcode": _emailCode,
                    "transPwd": _safePwd
                };
                $.ajax({
                    type: "POST",
                    url: "/web/info/phoneAuthentication",
                    data: bindEmailData,
                    dataType: "json",
                    success: function (res) {
                        if (res.code == 200) {
                            _this.$confirm('您的邮箱已认证成功', '', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'success'
                            }).then(() => {
                                window.location.href = "/views/user/user.html";
                            }).catch(() => {
                                window.location.href = "/views/user/user.html";
                            });

                        } else {
                            _this.errorConfirm(res.des, '');
                        }
                    },
                    error: function (err) {
                        _this.errorConfirm("呀，出错啦。。。", '');
                    }
                });
            }
        },
        created() {
            //获取用户邮箱，若未认证，显示邮箱认证表单；若已认证，显示提示信息
            this.getUserInfo()
        },
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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

    button[disabled], input[disabled] {
        cursor: not-allowed;
    }
</style>
