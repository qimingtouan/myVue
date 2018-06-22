<template>  
    <div class="safe-rd ml0">
        <div class="content basic-infocont" id="tipList">
            <ul>
                <li class="listtop">
                    <div class="ld"><i class="fa fa-mobile fa-2x"></i> <b>网页登录短信提醒</b></div>
                    <div class="md"><span class="red">已关闭</span></div>
                    <div class="rd">
                        <a id="appLoginTip" class="switch" data-type="isWebLoginAppNotice" data-status="1" role="button"><i></i></a>
                    </div>
                </li>

                <li class="listtop">
                    <div class="ld"><i class="fa fa-envelope fa-lg"></i> <b>充值/提现短信推送提醒</b></div>
                    <div class="md"><span class="green">已开启</span></div>
                    <div class="rd"><a id="inOutPushTip" class="switch on" data-type="receiveDealPush" data-status="1" role="button"><i></i></a></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'safe_rd_message',
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
