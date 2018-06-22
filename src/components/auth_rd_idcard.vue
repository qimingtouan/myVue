<template>  
    <div class="safe-rd snav-rd ml0">
        <div class="hd nb_head_wrap">
           <h3><i class="fa fa-user"></i><b>实名认证设置</b></h3>
           <a href="/views/user/user.html" class="nb_head_goback"><i aria-hidden="true" class="fa fa-reply fa-lg"></i>返回</a>
        </div>

        <div class="authbody">
            <div class="container">
                <div class="user_main_title1">
                     您已经通过初级实名认证，真实姓名：<b style="color:#f00000;">高甜</b>，实名认证后不能更改。您还可以进行
                    <a class="btn btn-outsecond btn-lg" href="#" style="margin-left: 15px;">
                        <i class="fa fa-cog "></i>&nbsp; 高级实名认证&gt;
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'safe_rd_idcard',
        data() {
           return {

           }
        },
        methods: {
            
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
