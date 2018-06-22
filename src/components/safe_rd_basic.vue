<template>  
    <div class="safe-rd ml0">
        <div class="content basic-infocont">
            <ul>
                <li>
                    <div class="ld">
                        <i class="fa fa-envelope fa-lg"></i> <b>安全邮箱</b>
                    </div>
                    <div class="md">
                        <span>1***3@qq.com</span>
                        <span class="checktrue"><i class="fa fa-check"></i></span>
                    </div>
                    <div class="rd"></div>
                </li>

                <li>
                    <div class="ld">
                        <i class="fa fa-mobile fa-2x"></i> <b>手机认证</b>
                    </div>
                    <div class="md">
                        <span>+86 132****4922</span>
                        <span class="checktrue"><i class="fa fa-check"></i></span>
                    </div>
                    <div class="rd">
                        <a class="btn btn-orange" href="/views/auth/auth.html#/phone/modify"><i class="fa fa-cog"></i>去修改</a>
                    </div>
                </li>

                <li>
                    <div class="ld"><i class="fa fa-user fa-lg"></i> <b>实名认证</b></div>
                    <div class="md"><span class="blue">初级认证-通过</span></div>
                    <div class="rd"><a class="btn btn-orange" href="/views/auth/auth.html#/idcard"><i class="fa fa-drivers-license-o"></i>立即认证</a></div>
                </li>

                <li>
                    <div class="ld"><i class="fa fa-lock fa-lg"></i> <b>固定登录密码</b></div>
                    <div class="md"><span>密码强度</span><em class="pswstrong">强</em></div>
                    <div class="rd">
                        <a class="btn btn-orange" href="/views/auth/auth.html#/password"><i class="fa fa-cog"></i>去修改</a>
                        <a class="btn btn-orange" href="/views/pwd/pwd.html#/forgetPwd"><i class="fa fa-cog"></i>去找回</a>
                    </div>
                </li>

                <li>
                    <div class="ld"><i class="fa fa-lock fa-lg"></i> <b>资金安全密码</b></div>
                    <div class="md"><span class="blue">已设置</span></div>
                    <div class="rd">
                        <a class="btn btn-orange" href="/views/auth/auth.html#/safeword"><i class="fa fa-cog"></i>去修改</a>
                        <a class="btn btn-orange" href="/views/pwd/pwd.html#/forgetSafePwd"><i class="fa fa-cog"></i>去找回</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'finance_rd_payin'
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    
</style>
