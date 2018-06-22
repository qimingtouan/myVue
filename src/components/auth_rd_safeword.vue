<template>  
    <div class="safe-rd snav-rd ml0">
        <div class="hd nb_head_wrap">
           <h3><i class="fa fa-lock"></i><b>资金安全密码设置</b></h3>
           <a href="/views/user/user.html" class="nb_head_goback"><i aria-hidden="true" class="fa fa-reply fa-lg"></i>返回</a>
        </div>

        <div class="authbody">
            <div class="container">
                <div class="ctips user_main_title2">
                    <i class="fa fa-lightbulb-o safeward_tip_i" aria-hidden="true"></i>
                    <p>
                        为了用户资金安全，修改资金安全密码后资金安全密码将在24小时内不能进行提币操作。<br>
                    </p>
                    <div class="close" title="关闭">×</div>
                </div>

                <div class="bk-onekey-form" id="mainForm">
                    <div class="tab_head" id="userTab" style="text-align:center;display:none;">修改资金安全密码</div>
                    <div class="line"></div>

                    <div class="form-line row">
                        <div class="col-sm-4 textright">当前资金密码：</div>
                        <div class="col-sm-7">
                            <input type="password" name="currentPwd" id="currentPwd" v-model="currentPwd" class="form-control form-second pull-left inputlong smallfont">
                        </div>
                    </div>

                    <div class="form-line row">
                        <div class="col-sm-4 textright">新资金安全密码：</div>
                        <div class="col-sm-7">
                            <input type="password" name="safePwd" id="safePwd" v-model="safePwd" 
                                    class="form-control form-second pull-left inputlong smallfont" size="35px;" nohide="true" 
                                    placeholder="资金安全密码为6位数字" errormsg="资金安全密码为6位数字" errorname="新密码" 
                                    pattern="limit(6,20); checkSafePwd()">

                            <input id="safeLevel" type="hidden" name="safeLevel" value="40">
                        </div>
                    </div>

                    <div class="form-line  row">
                        <div class="col-sm-4 textright">确认新资金安全密码：</div>
                        <div class="col-sm-7">
                            <input  type="password" name="newPwd" id="newPwd" v-model="newPwd" 
                                    class="form-control form-second pull-left inputlong smallfont" size="35px;"
                                    errormsg="两次输入的密码不一致。" 
                                    errorname="确认新密码" 
                                    pattern="limit(6,20); matchof('safePwd')">
                        </div>
                    </div>

                    <div id="validPhoneCode">
                        <div class="form-line row">
                            <div class="col-sm-4 textright">短信验证码：</div>
                            <div class="col-sm-7">
                                <input type="text" name="mobileCode" id="mobileCode" v-model="mobileCode"  
                                        class="form-control form-second pull-left inputlong smallfont"
                                        placeholder="请输入您收到的验证码" 
                                        errormsg="验证码错误，请重新输入。" 
                                        errorname="验证码" 
                                        pattern="limit(4,10)" style="width:250px">
                                <a href="javascript:void(0)" class="buttonCommon">
                                    <input type="button" name="sendCodeBtn" id="sendCodeBtn" value="点击获取" @click="sendCode()" 
                                            class="abtn-red nb_send_code_btn" newstyle="true" stylename="buttonCommon">
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="form-line  row">
                        <div class="col-sm-4 textright"></div>
                        <div class="col-sm-7">
                            <div class="do">
                                <a href="javascript:Redirect('/u/safe')" tabindex="5" class="btn btn-outsecond btn-lg hide">取消</a>
                                <a @click="save()" tabindex="8" class="btn btn-outsecond btn-lg"><i class="fa fa-check fa-lg  fa-fw"></i>&nbsp; 提交</a>
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
        name: 'safe_rd_safeword',
        data() {
            return {
                countdown: 60,
                currentPwd: '',
                safePwd: '',
                newPwd: '',
                mobileCode: ''
            }
        },
        methods: {
            //发送短信验证码
            sendCode() {
                let _this = this;
                $.ajax({
                    // type : "POST",
                    // url : "https://vip.zb.com/user/userSendCode",
                    type : "GET",
                    url: './../../../static/mock/userSendCodeMock.json',
                    data : {
                        codeType : 23
                    },
                    dataType : "json",
                    error : function(err) {
                        /*JuaBox.info(jsLan[1]);
                        inAjaxing = false;*/
                        console.log(err);
                    },
                    success : function(json) {
                        // inAjaxing = false;
                        if (json.isSuc) {
                            if (json.datas.isEmail) {
                                // JuaBox.showRight(json.des);
                                alert(json.des);
                            }
                            _this.settime($('#sendCodeBtn'));
                        } else if ('needMobileAuth' == json.des) {
                            // JuaBox.sure(bitbank.L("您未进行手机认证，请先进行手机认证"));
                            alert("您未进行手机认证，请先进行手机认证");
                        } else {
                            // JuaBox.sure(json.des);
                            alert(json.des);
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
                    _obj.val("点击获取");
                    _this.countdown = 60;
                } else {
                    _obj.attr("disabled", true);
                    _obj.val("已发送"+"(" + _this.countdown + ")");
                    _this.countdown--;
                    setTimeout(function() {
                        _this.settime(_obj)
                    }, 1000)
                }
            },

            // 
            save() {
                let _this = this;
                var rsaPublicKey;
                var  currentPwd = _this.currentPwd;
                var  safePwd = _this.safePwd;
                /*seajs.use(["module_encrypt"],function(RSA){
                    //获取公钥
                    $.ajaxSettings.async = false;
                    $.getJSON(DOMAIN_VIP + "/user/getPubTag?d="+new Date().getTime(), function(json) {
                        rsaPublicKey = json.datas.pubTag;
                        //执行加密
                        var encrypt = new RSA();
                        encrypt.setPublicKey(rsaPublicKey);
                        currentPwd = encrypt.encrypt(currentPwd);
                        safePwd = encrypt.encrypt(safePwd);
                    });

                });*/

                //清空密码 传入加密参数
                /* _this.currentPwd = '';
                 */
                if(currentPwd == false){
                    window.top.location.href = "/views/auth/auth.html#/safeword";
                    return ;
                }

                var mobileCode= _this.mobileCode;
                var safeLevel=$("#safeLevel").val();
                var actionUrl = "https://vip.zb.com/u/safe/safepwd/payset/saveSafePassword?mobileCode=" + mobileCode + "&currentPwd=" + currentPwd + "&safePwd=" + safePwd          + "&pubTag=" + rsaPublicKey + "&safeLevel=" + safeLevel + "";
                $.ajax({
                    //formId : "mainForm",
                    url: actionUrl,
                    success: function(res) {
                        /*JuaBox.showRight($(xml).find("MainData").text(), {
                            closeFun: function(){
                                window.top.location.href = "/u/safe"; 
                            }
                        })*/
                        window.top.location.href = "/views/user/user.html";
                    },
                    error : function(err) {
                        // JuaBox.sure($(err).find("MainData").text());
                        console.log(err);
                    }
                });
            }
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
