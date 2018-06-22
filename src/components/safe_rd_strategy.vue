<template>  
    <div class="safe-rd ml0">
        <div class="content basic-infocont stratecont">
            <ul>
                <li class="listtop">
                    <div class="ld"><i class="fa fa-user-plus"></i><b>登录验证</b></div>
                    <div class="md"><span>"登录密码+异地登录验证（短信/邮件）"</span></div>
                    <div class="rd"><a class="btn btn-blue"><i class="fa fa-cog"></i>更改</a></div>
                </li>
                <div class="listbody">
                    <dl>
                        <dd><span>密码登录</span><a onclick="switchAuth(1, 1)">选择此项</a></dd>
                        <dd><span style="color: #de211d;">登录密码+异地登录验证（短信/邮件）</span></dd>
                    </dl>
                </div>

                <li class="listtop">
                    <div class="ld"><i class="fa fa-refresh"></i><b>交易验证</b></div>
                    <div class="md"><span>"永不输入资金密码"</span></div>
                    <div class="rd"><a class="btn btn-blue"><i class="fa fa-cog"></i>更改</a></div>
                </li>
                <div class="listbody">
                    <dl>
                        <dd>
                            <span style="color: #de211d;">永不输入资金密码</span>
                        </dd>
                        <dd>
                            <span style="">6小时内免输资金密码</span>
                            <a onclick="switchAuth(2, 2)">选择此项</a>
                        </dd>
                        <dd>
                            <span style="">每次交易均验证资金密码</span>
                            <a onclick="openSafePwd(2, 3)">选择此项</a>
                        </dd>
                    </dl>
                </div>

                <li class="listtop">
                    <div class="ld"><i class="fa fa-money"></i><b>提现验证</b></div>
                    <div class="md"><span>"资金密码+短信/邮件验证码"</span></div>
                    <div class="rd"><a class="btn btn-blue"><i class="fa fa-cog"></i>更改</a></div>
                </li>
                <div class="listbody">
                    <dl>
                        <dd><span style="color: #de211d;">资金密码+短信验证码</span></dd>
                    </dl>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'safe_rd_strategy',
        data() {
           return {

           }
        },
        methods: {
            
        },
        created() {
            
        },
        mounted() {
            $(".stratecont .listtop a").click(function () {
                $(this).parents(".listtop").next().slideToggle();
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    
</style>
