<template>  
    <div class="safe-rd ml0">
        <div class="content basic-infocont">
            <ul>
                <li>
                    <div class="ld">
                        <i class="fa fa-envelope fa-lg"></i> <b>安全邮箱</b>
                    </div>
                    <div class="md">
                        <span class="red" v-if="!hasEmail">未认证</span>
                        <span v-if="hasEmail">{{emailText}}</span>
                        <span v-if="hasEmail" class="checktrue"><i class="fa fa-check"></i></span>
                    </div>
                    <div class="rd" v-if="!hasEmail">
                        <a class="btn btn-purple" @click="jumpTo(toHref.emailHref)"><i class="fa fa-cog"></i>立即认证</a>
                    </div>
                </li>

                <li>
                    <div class="ld">
                        <i class="fa fa-mobile fa-2x"></i> <b>手机认证</b>
                    </div>
                    <div class="md">
                        <span class="red" v-if="!hasPhone">未认证</span>
                        <span v-if="hasPhone">{{phoneText}}</span>
                        <span v-if="hasPhone" class="checktrue"><i class="fa fa-check"></i></span>
                    </div>
                    <div class="rd">
                        <a v-if="!hasPhone" class="btn btn-purple" @click="jumpTo(toHref.phoneHref)"><i class="fa fa-cog"></i>立即认证</a>
                        <a v-if="hasPhone" class="btn btn-purple" @click="jumpTo(toHref.phoneHref)"><i class="fa fa-cog"></i>去修改</a>
                    </div>
                </li>

                <li>
                    <div class="ld"><i class="fa fa-user fa-lg"></i> <b>实名认证</b></div>
                    <div class="md">
                        <span class="red" v-if="!hasRealName">{{realNameText}}</span>
                        <span class="blue" v-if="hasRealName">{{realNameText}}</span>
                    </div>
                    <div class="rd"><a class="btn btn-purple" @click="jumpTo(toHref.realNameHref)"><i class="fa fa-drivers-license-o"></i>立即认证</a></div>
                </li>

                <li>
                    <div class="ld"><i class="fa fa-lock fa-lg"></i> <b>固定登录密码</b></div>
                    <div class="md"  v-if="!hasPwd">
                        <span class="red">未设置       </span>
                    </div>
                    <div class="md" v-if="hasPwd">
                        <span>密码强度</span>
                        <em v-if="pwdLevel == 1" class="pswweak">弱</em>
                        <em v-if="pwdLevel == 2" class="pswmiddle">中</em>
                        <em v-if="pwdLevel == 3" class="pswstrong">强</em>
                    </div>
                    <div class="rd">
                        <a class="btn btn-purple" @click="jumpTo(toHref.modifyPwdHref)"><i class="fa fa-cog"></i>去修改</a>
                        <a class="btn btn-purple" @click="jumpTo(toHref.forgetPwdHref)"><i class="fa fa-cog"></i>去找回</a>
                    </div>
                </li>

                <li>
                    <div class="ld"><i class="fa fa-lock fa-lg"></i> <b>资金安全密码</b></div>
                    <div class="md">
                        <span class="red" v-if="!hasSafePwd">{{safePwdText}}</span>
                        <span class="blue" v-if="hasSafePwd">{{safePwdText}}</span>
                    </div>
                    <div class="rd">
                        <a class="btn btn-purple" @click="jumpTo(toHref.modifySafePwdHref)"><i class="fa fa-cog"></i>去修改</a>
                        <a class="btn btn-purple" @click="jumpTo(toHref.forgetSafePwdHref)"><i class="fa fa-cog"></i>去找回</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'safe_rd_basic',
        data() {
            return {
                toHref: {
                    emailHref: "/views/auth/auth.html#/email",
                    // unbindPhoneHref: "/views/auth/auth.html#/phone/unbind",
                    // modifyPhoneHref: "/views/auth/auth.html#/phone/modify",
                    phoneHref: "/views/auth/auth.html#/phone",
                    realNameHref: "/views/auth/auth.html#/idcard",
                    modifyPwdHref: "/views/auth/auth.html#/password",
                    forgetPwdHref: "/views/pwd/pwd.html#/forgetPwd??type=1",
                    modifySafePwdHref: "/views/auth/auth.html#/safeword",
                    forgetSafePwdHref: "/views/pwd/pwd.html#/forgetSafePwd"
                },
                userInfo: {
                    email: null,
                    telephone: null,
                    authLevel: null,
                    loginPwdLevel: null,
                    transPwd: null
                },
                hasEmail: false,
                hasPhone: false,
                hasRealName: false,
                hasPwd: false,
                hasSafePwd: false,
                emailText: "未认证",
                phoneText: "未认证",
                realNameText: "未认证",
                pwdLevel: 0,
                safePwdText: "未设置"
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

            // 跳转
            jumpTo(toHref) {
                if(this.isLogin()) {
                    window.location.href = toHref;
                } else {
                    this.$message.error("请先登录");
                    window.location.href = '/views/login/login.html';
                }
            },

            // 获取用户基本信息
            getUserInfo() {
                let _this = this;

                $.ajax({
                    type : "GET",
                    url: "/web/info/getUserInfo?type=0",
                    dataType : "json",
                    complete: function() {
                        
                    },
                    success: function(res) {
                        if (res.code == 200) {
                            if (res.data) {
                                _this.userInfo = res.data;
                                let _userInfo = _this.userInfo;

                                if (_userInfo.email) {
                                    _this.hasEmail = true;
                                    _this.emailText = _userInfo.email;
                                }

                                if (_userInfo.telephone) {
                                    _this.hasPhone = true;
                                   _this.phoneText = _userInfo.telephone.substring(0,3) + '****' + _userInfo.telephone.substring(7);
                                }

                                if (_userInfo.authLevel == null || _userInfo.authLevel == 0) {
                                    _this.hasRealName = false;
                                } else if (_userInfo.authLevel == 1) {
                                    _this.hasRealName = true;
                                    _this.realNameText = "初级认证-通过";
                                } else if (_userInfo.authLevel == 2) {
                                    _this.hasRealName = true;
                                    _this.realNameText = "高级认证-通过";
                                }

                                if (!_userInfo.loginPwdLevel || _userInfo.loginPwdLevel == 0) {
                                    _this.hasPwd = false;
                                } else if (_userInfo.loginPwdLevel == 1) {
                                    _this.hasPwd = true;
                                    _this.pwdLevel = 1;
                                } else if (_userInfo.loginPwdLevel == 2) {
                                    _this.hasPwd = true;
                                    _this.pwdLevel = 2;
                                } else if (_userInfo.loginPwdLevel == 3) {
                                    _this.hasPwd = true;
                                    _this.pwdLevel = 3;
                                }

                                if (_userInfo.transPwd) {
                                    _this.hasSafePwd = true;
                                    _this.safePwdText = "已设置";
                                }

                            }
                        } else {
                            _this.$message.error(res.msg);
                        }
                    }
                });
            }
        },
        created() {
            if(!this.isLogin()) {
                window.location.href = '/views/login/login.html';
            }

            this.getUserInfo(); // 获取用户信息
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    
</style>
