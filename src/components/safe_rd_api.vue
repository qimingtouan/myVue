<template>  
    <div class="safe-rd">
        <div class="main-bd" id="mainForm">
            <div class="tab_head" id="userTab">
                <span>API私有交易设置</span>
                <span>
                    <em class="rd">
                        <a class="alibtn_orange35" href="javascript:openApi();" id="open_api_btn">
                            <h4>开启API</h4>
                        </a>
                    </em>
                </span>
            </div>

            <div class="ctips" id="open_api_tips_div">
                <i class="fa fa-lightbulb-o api_tip_i" aria-hidden="true"></i>
                <p><span>重要提示：</span><em>API已关闭！如要启用API，请点击右上角添加“开启API”按钮</em></p>
            </div>

            <div id="toggle_api_div_group">
                <div class="ctips">
                    <i class="fa fa-lightbulb-o api_tip_i" aria-hidden="true"></i>
                    <p><span>重要提示：</span><em>通过验证后 开启 API</em></p>
                </div>

                <div class="form-line bind_ip_div">
                    <div class="form-tit"><span>绑定API交易IP：</span></div>
                    <div class="form-con">
                        <input type="text" class="input" id="apiIpBind" name="apiIpBind" placeholder="可以添加多个，为空则不限制" value="192.168.0.194"><br>
                    </div>
                </div>

                <div class="form-line bind_ip_div">
                    <div class="form-tit">&nbsp;</div>
                    <div class="form-con">
                        <span style="color:red;">可以添加多个，为空则不限制，用“，”（逗号）分隔多个IP</span>
                    </div>
                </div>

                <div class="form-line">
                    <div class="form-tit">发送：</div>
                    <div class="form-con">
                        <input type="text" class="input" name="code" id="code" value="" position="s" mytitle="请输入发送到您手机上的验证码" errormsg="验证码错误，请重新输入。" errorname="验证码" pattern="limit(4,10)">
                        <!-- <script type="text/javascript" src="https://s.zb.com/statics/js/common/postCode.js?id=1"></script> -->
                        <button type="button" id="ajax_phone_get">短信验证码</button>

                        <!-- 发送验证码的类型 -->
                        <input type="hidden" id="type" name="type" value="13">
                    </div>
                </div>
                <hr>

                <div class="do toggle_api_div_group">
                    <a href="javascript:location.reload();" tabindex="5" class="alibtn_orange35"><h4>取消</h4></a>
                    <a href="javascript:openOrClose('open');" style="margin-left:36px;" tabindex="8" class="alibtn_orange35">
                        <h4>开启</h4>
                    </a>
                </div>
            </div>

            <input type="hidden" id="needMobile" name="needMobile" value="false">
            <input type="hidden" id="needPwd" name="needPwd" value="false">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'safe_rd_api',
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
