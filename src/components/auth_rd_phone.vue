<template>  
    <div class="safe-rd snav-rd ml0">
        <div class="hd nb_head_wrap">
           <h3><i class="fa fa-mobile fa-lg"></i><b>手机认证设置</b></h3>
           <a href="/views/user/user.html" class="nb_head_goback"><i aria-hidden="true" class="fa fa-reply fa-lg"></i>返回</a>
        </div>

        <!-- 手机号未认证 -->
        <div v-if="isPhoneModify == 'unbind' && !hasPhone">
            <div class="authbody">
                <div class="container">
                    <div class="bk-onekey-form"> 
                        <el-form :model="bindMobileForm" ref="bindMobileForm" label-width="150px" class="auth_form">
                            <el-form-item label="手机号码：" prop="mobile">
                                <el-input v-model="bindMobileForm.mobile" auto-complete="off" class="acount" :readonly="accountDisabled"></el-input>
                            </el-form-item>

                            <el-form-item label="短信验证码：" prop="mobileCode">
                                <el-input v-model="bindMobileForm.mobileCode" auto-complete="off"></el-input>
                                <input type="button" name="sendCodeBtn" id="sendCodeBtn" class="send_code_btn" v-model="sendCodeText" @click="sendCode()"/>
                            </el-form-item>

                            <el-form-item label="邮箱验证码：" prop="emailCode">
                                <el-input v-model="bindMobileForm.emailCode" auto-complete="off"></el-input>
                                <input type="button" name="sendCodeBtn" id="sendEmailCodeBtn" class="send_code_btn" v-model="sendEamilCodeText" 
                                    @click="sendEmailCode()"/>
                            </el-form-item>

                            <el-form-item label="资金安全码：" prop="safePwd">
                                <el-input v-model="bindMobileForm.safePwd" auto-complete="off" type="password" class="pwd"></el-input>
                            </el-form-item>

                            <el-form-item size="large">
                                <div class="do">
                                    <a @click="bindMobileSubmit()" class="btn btn-outsecond btn-lg"><i class="fa fa-check fa-lg"></i>&nbsp; 提交</a>
                                    <a href="/views/pwd/pwd.html#/forgetSafePwd" target="_blank" class="btn btn-outsecond btn-lg">忘记资金安全密码</a>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

        <!-- 手机号已认证 -->
        <div v-if="isPhoneModify == 'bind' && hasPhone" class="authbody">
            <div class="container">
                <form autocomplete="off">
                    <div class="user_main_title1">
                        您的手机号码已经通过认证：<b style="font-family: Arial; color: #f00000;">{{mobileText}}</b> 
                        <a class="btn btn-outsecond btn-lg" style="margin-left: 15px;" @click="toModify()">
                            <i class="fa fa-cog" aria-hidden="true"></i>&nbsp;修改
                        </a>
                    </div>
                </form>
            </div>
        </div>

        <!-- 修改绑定手机 -->
        <div v-if="isPhoneModify == 'modify' && hasPhone" class="bk-onekey"> 
            <div class="authbody">
                <div class="container">
                    <div class="ctips user_main_title2">
                        <i class="fa fa-lightbulb-o api_tip_i" aria-hidden="true"></i>
                        <p>发起修改手机申请后，我们的客服人员会尽快审核。</p>
                        <!-- <p id="imgTips" style="display: none">
                            照片要求：右手持身份证件，左手持带有bj.com、认证人签名、认证当天时间的证明文件
                        </p> -->
                        <div class="close" title="关闭">×</div>
                    </div>

                    <div class="bk-onekey-form">
                        <el-form v-if="stepOne" :model="modifyOldForm" ref="bindMobileForm" label-width="160px" class="auth_form">
                            <el-form-item label="原手机：">
                                <el-input v-model="mobileText" auto-complete="off" class="acount" disabled="disabled"></el-input>
                            </el-form-item>

                            <el-form-item label="原手机短信验证码：" prop="mobileCode">
                                <el-input v-model="modifyOldForm.mobileCode" auto-complete="off"></el-input>
                                <input type="button" name="sendCodeOldBtn" id="sendCodeOldBtn" class="send_code_btn" key="sendCodeOldBtn" v-model="sendCodeOldText" @click="sendCodeOld()"/>
                            </el-form-item>

                            <el-form-item size="large">
                                <div class="do">
                                    <a @click="setpOne()" class="btn btn-outsecond btn-lg"><i class="fa fa-check fa-lg"></i>&nbsp; 下一步</a>
                                    <a @click="skipStepOne()" class="btn btn-outsecond btn-lg"><i class="fa fa-check fa-lg"></i>&nbsp; 遗失旧手机</a>
                                </div>
                            </el-form-item>
                        </el-form>

                        <el-form v-if="stepTwo" :model="modifyNewForm" ref="bindMobileForm" label-width="160px" class="auth_form">
                            <el-form-item label="新手机号码：">
                                <el-input v-model="modifyNewForm.newMobile" auto-complete="off" class="acount"></el-input>
                            </el-form-item>

                            <el-form-item  label="图形验证码：" prop="imgCode">
                                <el-input v-model="modifyNewForm.imgCode" auto-complete="off" class="img_code"></el-input>
                                <input v-if="isFirst" type="button" name="sendImgCodeBtn" id="sendImgCodeBtn" class="send_code_btn"  value="点击获取" 
                                        key="sendImgCodeBtn" @click="getImgCode()"/>
                                <img v-if="isImgCodeShow" id="imgIdentifyCode" class="auth_img_code" 
                                        :src="imgCodeSrc" alt="加载中..."  @click="getImgCode()"/>
                            </el-form-item>

                            <el-form-item label="新手机短信验证码：" prop="newMobileCode">
                                <el-input v-model="modifyNewForm.newMobileCode" auto-complete="off"></el-input>
                                <input type="button" name="sendNewCodeBtn" id="sendNewCodeBtn" class="send_code_btn" v-model="sendCodeNewText" 
                                        @click="sendNewCode()"/>
                            </el-form-item>

                            <el-form-item label="资金安全码：" prop="safePwd">
                                <el-input v-model="modifyNewForm.safePwd" auto-complete="off" type="password" class="pwd"></el-input>
                            </el-form-item>

                            <el-form-item size="large">
                                <div class="do">
                                    <a @click="modifyMobileSubmit('modifyNewForm')" class="btn btn-outsecond btn-lg"><i class="fa fa-check fa-lg"></i>&nbsp; 提交</a>
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
        name: 'safe_rd_phone',
        data() {
           return {
                isPhoneModify: '',
                hasPhone: false,
                currentMobile: '',
                mobileText: '',
                bindMobileForm: {
                    mobile: '',
                    mobileCode: '',
                    emailCode: '',
                    safePwd: ''
                },
                accountDisabled: false,
                countdown: 60,
                countdown2: 60,
                sendCodeText: '点击获取',
                sendEamilCodeText: '点击获取',

                stepOne: true,
                stepTwo: false,
                countdownOld: 60,
                countdownNew: 60,
                sendCodeOldText: '点击获取',
                sendCodeNewText: '点击获取',
                modifyOldForm: {
                    mobileCode: '',
                    takeMsgCode: false
                },
                modifyNewForm: {
                    newMobile: '',
                    imgCode: '',
                    newMobileCode: '',
                    safePwd: '',
                    takeMsgCode: false
                },
                imgCodeSrc: '',
                isImgCodeShow: false,
                isFirst: true
            }
        },
        methods: {
            // 手机号正则校验
            checkMobile(phoneNumber) {
                var reg = /^1[0-9]{10}$/;
                if (!reg.test(phoneNumber)) {
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

            // 获取用户手机号
            getUserInfo() {
                let _this = this;

                $.ajax({
                    type : "GET",
                    url: "/web/info/getUserInfo?type=2",
                    dataType : "json",
                    complete: function() {
                        
                    },
                    success: function(res) {
                        if (res.code == 200) {
                            if (res.data) {
                                _this.currentMobile = res.data.telephone;

                                if (_this.currentMobile) {
                                    _this.hasPhone = true;
                                    _this.isPhoneModify = 'bind';
                                    _this.mobileText = _this.currentMobile.substring(0,3)+"****"+_this.currentMobile.substring(7);
                                } else {
                                    _this.hasPhone = false;
                                    _this.isPhoneModify = 'unbind';
                                    _this.currentMobile = '';
                                    _this.mobileText = '';
                                }
                            }
                        } else {
                            _this.$message.error(res.msg);
                        }
                    }
                });
            },

            // 绑定手机号： 发送短信验证码
            sendCode() {
                let _this = this;
                let _mobile = _this.bindMobileForm.mobile;

                if (!_this.checkMobile(_mobile)) {
                    _this.errorConfirm('请输入正确的手机号码', '');
                    return false;
                }

                $.ajax({
                    type: "GET",
                    url: "/web/info/clickSendVerifyCode?receiver=" + encodeURIComponent(_mobile) + "&type=2",
                    dataType: "json",
                    success: function (res) {
                        if (res.code == 200) {
                            _this.setTime($('#sendCodeBtn'));
                        } else {
                            _this.errorConfirm(res.msg, '');
                        }
                    }
                });
            },
            // 短信验证码倒计时
            setTime(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdown == 0) {
                    _obj.removeAttr("disabled");
                    _this.sendCodeText = "点击获取";
                    _this.countdown = 60;
                } else {
                    _obj.attr("disabled", true);
                    _this.sendCodeText = "已发送(" + _this.countdown + ")";
                    _this.countdown--;
                    setTimeout(function() {
                        _this.setTime(_obj)
                    }, 1000);
                }
            },

            //发送邮件验证码
            sendEmailCode() {
                let _this = this;
                $.ajax({
                    type: "GET",
                    url: "/web/info/clickSendVerifyCode?type=3",
                    dataType: "json",
                    success: function (res) {
                        if (res.code == 200) {
                            _this.setTimeEmail($('#sendEmailCodeBtn'));

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

            setTimeEmail(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdown2 == 0) {
                    _obj.removeAttr("disabled");
                    _this.sendEamilCodeText = "点击获取";
                    _this.countdown2 = 60;
                } else {
                    $(obj).attr("disabled", true);
                    _this.sendEamilCodeText = "已发送(" + _this.countdown2 + ")";
                    _this.countdown2--;
                    setTimeout(function () {
                        _this.setTimeEmail(_obj);
                    }, 1000)
                }
            },

            // 绑定手机号提交
            bindMobileSubmit() {
                let _this = this;
                let _bindMobileForm = this.bindMobileForm;
                let _mobile = _bindMobileForm.mobile;
                var _mobileCode = _bindMobileForm.mobileCode;
                var _emailCode = _bindMobileForm.emailCode;
                var _safePwd = _bindMobileForm.safePwd;

                if (!_this.checkMobile(_mobile)) {
                    _this.errorConfirm('请输入正确的手机号码', '');
                    return false;
                }

                if (!_mobileCode || $.trim(_mobileCode) == '') {
                    _this.errorConfirm('请输入发送到您手机上的短信验证码', '');
                    return false;
                }

                if (!_emailCode || $.trim(_emailCode) == '') {
                    _this.errorConfirm('请输入您收到的邮件验证码', '');
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

                var bindMobileData = {
                    "account": _mobile,
                    "mobileVcode": _mobileCode,
                    "emailVcode": _emailCode,
                    "transPwd": _safePwd
                };
                $.ajax({
                    type: "POST",
                    url: "/web/info/phoneAuthentication",
                    data: bindMobileData,
                    dataType: "json",
                    success: function (res) {
                        if (res.code == 200) {
                            _this.$confirm('您的手机号码已认证成功', '', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'success'
                            }).then(() => {
                                window.location.href = "/views/user/user.html";
                            }).catch(() => {
                                window.location.href = "/views/user/user.html";
                            });

                        } else {
                            _this.errorConfirm(res.msg, '');
                        }
                    },
                    error: function (err) {
                        _this.errorConfirm("呀，出错啦。。。", '');
                    }
                });
            },

            // 点击"修改"按钮事件
            toModify() {
                let _this = this;
                if (_this.hasPhone) {
                    _this.isPhoneModify ='modify';
                } else {
                    _this.$alert('您尚未进行手机认证，请先进行手机认证', {
                        confirmButtonText: '确定',
                        type: 'error',
                        callback: action => {
                            _this.hasPhone = false;
                            _this.isPhoneModify = 'unbind';
                            _this.currentMobile = '';
                            _this.mobileText = '';
                        }
                    });

                }
            },

            // 修改手机号: 旧手机发送短信验证码 
            sendCodeOld() {
                let _this = this;
                $.ajax({
                    type: "GET",
                    url: '/web/info/clickSendVerifyCode?type=4',
                    dataType: "json",
                    success: function(res) {
                        if (res.code == 200) {
                            _this.modifyOldForm.takeMsgCode = true;
                            _this.setTimeOld($('#sendCodeOldBtn'));
                        } else if ('needMobileAuth' == res.msg) {
                            _this.errorConfirm("您未进行手机认证，请先进行手机认证", '');
                        } else {
                            _this.errorConfirm(res.msg, '');
                        }
                    },
                    error: function(err) {
                        _this.errorConfirm('呀呀呀，出错啦。。。', '');
                    }
                });
            },

            // 修改手机号: 旧手机发送短信验证码倒计时
            setTimeOld(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdownOld == 0) {
                    _obj.removeAttr("disabled");
                    _this.sendCodeOldText = "点击获取";
                    _this.countdownOld = 60;
                } else {
                    _obj.attr("disabled", true);
                    _this.sendCodeOldText = "已发送"+"(" + _this.countdownOld + ")";
                    _this.countdownOld--;
                    setTimeout(function() {
                        _this.setTimeOld(_obj)
                    }, 1000)
                }
            },

            // 修改手机号：下一步
            setpOne() {
                let _this = this;
                let _mobileCode = this.modifyOldForm.mobileCode;
                let _takeMsgCode = this.modifyOldForm.takeMsgCode;

                if (!_mobileCode) {
                    _this.errorConfirm('请输入发送到您手机上的短信验证码', '');
                    return false;
                }

                if (!_takeMsgCode) {
                    _this.errorConfirm('请先获取短信验证码', '');
                    return false;
                }

                $.ajax({
                    type: "GET",
                    url: "./../../../static/mock/userSendCodeMock.json",
                    data: {
                        mobileCode : _mobileCode,
                    },
                    dataType: "json",
                    success: function(res) {
                        // if (res.code == 200) {
                            _this.stepOne = false;
                            _this.stepTwo = true;
                        // } else {
                        //     _this.errorConfirm(res.msg, '');
                        // }
                    },
                    error: function(err) {
                        _this.errorConfirm('呀，出错啦。。。', '');
                    }
                });
            },
            // 修改手机号：遗失旧手机
            skipStepOne() {
                this.stepOne = false;
                this.stepTwo = true;
                // $('#imgTips').show();
            },

            // 获取图形验证码
            getImgCode() {
                let _this = this;

                let _newMobile = _this.modifyNewForm.newMobile;

                if (!_this.checkMobile(_newMobile)) {
                    _this.errorConfirm('请输入正确的手机号码', '');
                    return false;
                }

                _this.isFirst = false;
                _this.isImgCodeShow = true;

                _this.imgCodeSrc = "/web/register/getPicVerifyCode/"+ _newMobile + "?" +new Date().getTime();
            },

            //修改手机号: 新手机发送短信验证码
            sendNewCode() {
                let _this = this;
                let _newMobile = _this.modifyNewForm.newMobile;
                let _imgCode = _this.modifyNewForm.imgCode;


                if (!_this.checkMobile(_newMobile)) {
                    _this.errorConfirm('请输入正确的手机号码', '');
                    return false;
                }

                if (!_imgCode) {
                    _this.errorConfirm('请输入图形验证码', '');
                    return false;
                }

                if (_this.isImgCodeShow == false) {
                    _this.errorConfirm('请先获取图形验证码','');
                    return false;
                }

                let sendCodeUrl = "/web/register/sendMsgVerifyCode/"+_newMobile +"/" + _imgCode + "/1";
                $.ajax({
                    type: "GET",
                    url: sendCodeUrl,
                    dataType: "json",
                    complete: function() {
                        _this.modifyNewForm.takeMsgCode = true;
                    },
                    success: function(res) {
                        if (res.code == 200) {
                            _this.setTimeNew($('#sendNewCodeBtn'));
                        } else {
                            _this.$confirm(res.msg, '', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'error'
                            }).then(() => {
                                _this.getImgCode();
                            }).catch(() => {
                                _this.getImgCode();
                            });
                        }
                    },
                    error: function(err) {
                        _this.errorConfirm(err.msg, '');
                    },
                });
            },
            // 修改手机号: 新手机发送短信验证码倒计时
            setTimeNew(obj) {
                let _this = this;
                let _obj = $(obj);
                if (_this.countdownNew == 0) {
                    _obj.removeAttr("disabled");
                    _this.sendCodeNewText = "点击获取";
                    _this.countdownNew = 60;
                } else {
                    _obj.attr("disabled", true);
                    _this.sendCodeNewText = "已发送"+"(" + _this.countdownNew + ")";
                    _this.countdownNew--;
                    setTimeout(function() {
                        _this.setTimeNew(_obj)
                    }, 1000)
                }
            },

            // 修改手机号提交
            modifyMobileSubmit(formName) {
                let _this = this;
                let _modifyNewForm = this.modifyNewForm;

                let _newMobile = _modifyNewForm.newMobile;
                var _newMobileCode = _modifyNewForm.newMobileCode;
                var _imgCode = _modifyNewForm.imgCode;
                var _safePwd = _modifyNewForm.safePwd;
                var _takeMsgCode = _modifyNewForm.takeMsgCode;

                if (!_this.checkMobile(_newMobile)) {
                    _this.errorConfirm('请输入正确的手机号码', '');
                    return false;
                }

                if (!_imgCode) {
                    _this.errorConfirm('请输入图形验证码', '');
                    return false;
                }

                if (!_newMobileCode) {
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

                if (_takeMsgCode == false) {
                    _this.errorConfirm('请先获取短信验证码','');
                    return false;
                }

                $.ajax({
                    type: "POST",
                    url: "https://vip.zb.com/u/auth/doMobileModify",
                    data: {
                        newMobileNumber: _newMobile,
                        newMobileCode: _newMobileCode,
                        imgCode: _imgCode,
                        safePwd: _safePwd
                    },
                    dataType: "json",
                    success: function(res) {
                        if (res.code == 200) {
                            _this.$confirm(res.msg, '', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'success'
                            }).then(() => {
                                window.location.href = "/views/auth/auth.html#/phone/bind";
                            }).catch(() => {
                                window.location.href = "/views/auth/auth.html#/phone/bind";
                            });  
                        } else {
                            _this.errorConfirm(res.des, '');
                        }
                    },
                    error: function(err) {
                        _this.errorConfirm('呀呀呀，出错啦。。。', '');
                    }
                });
            }
            
        },
        created() {
            let _this = this;

            // 获取用户手机号
            _this.getUserInfo()
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    .uploadipic .pm-itemcont .item .upload input[type=file] {
        width: 202px;
        height: 180px;
    }
    .uploadipic .pm-itemcont .item .upload a, 
    .uploadipic .pm-itemcont .item .upload, 
    .uploadipic .pm-itemcont .item {
        width: 202px;
        height: 180px;
    }

    #photoA {
        width: 202px;
        height: 180px;
        background: url(https://s.zb.com/statics/img/v2/user/zhengdemo_n1b.jpg) center center no-repeat;
        background-size: cover;
        cursor: pointer;
        float: none;
        border: 1px solid #eee;
    }
    .uploadipic {
        width: auto;
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

    button[disabled], input[disabled] {
        cursor: not-allowed;
    }
</style>
