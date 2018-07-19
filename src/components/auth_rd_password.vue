<template>  
    <div class="safe-rd snav-rd ml0">
        <div class="hd nb_head_wrap">
           <h3><i class="fa fa-lock"></i><b>固态登录密码设置</b></h3>
           <a href="/views/user/user.html" class="nb_head_goback"><i aria-hidden="true" class="fa fa-reply fa-lg"></i>返回</a>
        </div>

        <div class="authbody">
            <div class="container">
                <input type="hidden" name="pubTag" value="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCA77Uedwfaguw+bS4vTtkZoJO1WPy6YzxN9Ady1s1Do6UxiQD7LJRJgKGhyCqWcV8/AJTEGtya6QFlRbcpLjUV+pMPkIkUNir6cLwlRw33o7X/TFZvJJcr+OzMlVHu/FhnUIcNuSrBp+KR/4EkZJMKZ8CxktqRXfVxIwRhI9+S6wIDAQAB">

                <div class="bk-onekey-form" id="mainForm">
                    <el-form :model="modifyPwdForm" ref="modifyPwdForm" label-width="150px" class="auth_form">
                        <el-form-item label="当前登录密码：" prop="currentPassword">
                            <el-input v-model="modifyPwdForm.currentPassword" auto-complete="off" type="password" class="pwd"></el-input>
                            <input id="pwdLevel" type="hidden" name="pwdLevel" value="40">
                        </el-form-item>

                        <el-form-item label="新登录密码：" prop="password">
                            <el-tooltip class="item" effect="light" content="密码8~20位字符，且为字母、数字、符号等任意2种及以上组合" placement="top">
                                <el-input v-model="modifyPwdForm.password" auto-complete="off" type="password" class="pwd"></el-input>
                            </el-tooltip>
                        </el-form-item>

                        <el-form-item label="确认新密码：" prop="confirmPwd">
                            <el-input v-model="modifyPwdForm.confirmPwd" auto-complete="off" type="password" class="pwd"></el-input>
                        </el-form-item>  

                        <el-form-item label="短信验证码：" prop="mobileCode">
                            <el-input v-model="modifyPwdForm.mobileCode" auto-complete="off"></el-input>
                            <input type="button" name="sendCodeBtn" id="sendCodeBtn" class="send_code_btn" v-model="sendCodeText" @click="sendCode()"/>
                        </el-form-item>

                        <el-form-item size="large">
                            <div class="do">
                                <a @click="modifyPwdSubmit('modifyPwdForm')" class="btn btn-outsecond btn-lg">
                                    <i class="fa fa-check fa-lg"></i>&nbsp; 提交
                                </a>
                                <a href="/views/pwd/pwd.html#/forgetPwd?type=1" target="_blank" class="btn btn-outsecond btn-lg">忘记登录密码</a>
                            </div>
                        </el-form-item>
                    </el-form> 
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
                modifyPwdForm: {
                    currentPassword: '',
                    password: '',
                    confirmPwd: '',
                    mobileCode: ''
                },
                countdown: 60,
                sendCodeText: '点击获取'
           }
        },
        methods: {
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

            //发送短信验证码
            sendCode() {
                let _this = this;
                $.ajax({
                    type : "GET",
                    url : "/web/info/clickSendVerifyCode?type=5",
                    dataType : "json",
                    success : function(res) {
                        if (res.code == 200) {
                            _this.settime($('#sendCodeBtn'));

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
                    },
                    error: function(err) {
                        _this.errorConfirm('呀，出错啦。。。', '');
                    },
                });
            },

            settime(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdown == 0) {
                    _obj.removeAttr("disabled");
                    _this.sendCodeText = "点击获取";
                    _this.countdown = 60;
                } else {
                    _obj.attr("disabled", true);
                    _this.sendCodeText = "已发送"+"(" + _this.countdown + ")";
                    _this.countdown--;
                    setTimeout(function() {
                        _this.settime(_obj);
                    }, 1000)
                }
            },

            modifyPwdSubmit(formName) {
                let _this = this;
                let _modifyPwdForm = this.modifyPwdForm;
                
                // var encrypt = new JSEncrypt({default_public_exponent : '65537'});
                // var pubTag = $("input[name='pubTag']").val();
                // encrypt.setPublicKey(pubTag);
                
                let _currentPassword = _modifyPwdForm.currentPassword;
                // currentPassword = encrypt.encrypt(_currentPassword);
                let _pwd = _modifyPwdForm.password;
                // _pwd = encrypt.encrypt(_pwd);

                let _confirmPwd = _modifyPwdForm.confirmPwd;
                
                var _mobileCode = _modifyPwdForm.mobileCode;
                var _pwdLevel = $('#pwdLevel').val();
                
                if (!_currentPassword) {
                    _this.errorConfirm('请输入原始登录密码', '');
                    return false;
                }

                // 校验密码：长度8-20位，必须含有数字和字母，支持特殊字符
                if (!_pwd) {
                    _this.errorConfirm('请输入新登录密码', '');
                    return false;
                } else {
                    var regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\\\\(\\\\)])+$)([^(0-9a-zA-Z)]|[\\\\(\\\\)]|[a-zA-Z]|[0-9]){8,20}$/;

                    if (!regPwd.test(_pwd)) {
                        _this.errorConfirm('密码8~20位字符，且为字母、数字、符号等任意2种及以上组合', '');
                        return
                    }
                }

                if (!_confirmPwd) {
                    _this.errorConfirm('请再次输入密码', '');
                    return
                } else if (_confirmPwd !== _pwd) {
                    _this.errorConfirm('确认密码与新密码不一致!', '');
                    return
                }
                
                if (!_mobileCode || $.trim(_mobileCode) == '') {
                    _this.errorConfirm('请输入您收到的验证码', '');
                    return false;
                }

                var modifyPwdData = {
                    "currentPassword": _currentPassword,
                    "pwd": _pwd,
                    "mobileCode": _mobileCode,
                    "pwdLevel": _pwdLevel
                };

                $.ajax({
                    type : "POST",
                    url : "https://vip.zb.com/u/safe/safepwd/LoginSet/saveLoginPassword",
                    data : modifyPwdData,
                    dataType : "json",
                    success : function(res) {
                        // if (res.code == 200) {
                            _this.$confirm('您的登录密码已修改成功', '', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'success'
                            }).then(() => {
                                window.location.href = "/views/user/user.html";
                            }).catch(() => {
                                window.location.href = "/views/user/user.html";
                            });
                        // } else {
                        //     _this.errorConfirm(res.msg, '');
                        // }
                    },
                    error : function(err) {
                        _this.errorConfirm("呀，出错啦。。。", '');
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
