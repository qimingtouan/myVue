<template>  
    <div class="safe-rd ml0">
        <div class="bk-onelist">
            <div class="safelog snav-rd">
                <div class="hd">
                    <h3><i class="fa fa-calendar"></i><b>安全日志</b></h3>
                </div>

                <div class="table-responsive">
                    <table id="logIpRecord" class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                              <th width="25%">时间</th>
                              <th width="32%" style="text-align:left;">类别</th>
                              <th width="20%" style="text-align:left;">IP地址</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2018-05-25 16:19:21</td>
                                <td class="text-left"><p class="text-muted">登录</p><p>网页端登录</p></td>
                                <td class="text-left"><p><span class="text-doing ft18">47.75.161.255</span>香港</p></td>
                            </tr>
                            <tr>
                                <td>2018-05-25 16:18:06</td>
                                <td class="text-left"><p class="text-muted">登录</p><p>网页端登录</p></td>
                                <td class="text-left"><p><span class="text-doing ft18">47.75.163.101</span>香港</p></td>
                            </tr>
                            <tr>
                                <td>2018-05-25 16:15:09</td>
                                <td class="text-left"><p class="text-muted">登录</p><p>网页端登录</p></td>
                                <td class="text-left"><p><span class="text-doing ft18">47.75.161.255</span>香港</p></td>
                            </tr>
                            <tr>
                                <td>2018-05-25 16:12:37</td>
                                <td class="text-left"><p class="text-muted">登录</p><p>网页端登录</p></td>
                                <td class="text-left"><p><span class="text-doing ft18">47.75.161.255</span>IP地址库文件错误</p></td>
                            </tr>
                            <tr>
                                <td>2018-05-25 16:11:45</td>
                                <td class="text-left"><p class="text-muted">登录</p><p>网页端登录</p></td>
                                <td class="text-left"><p><span class="text-doing ft18">47.75.161.255</span>IP地址库文件错误</p></td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- 隐藏输入框：存放pageIndex -->
                    <input type="hidden" id="pageIndex" value="1">
                    
                    <!-- "更多"按钮 -->
                    <div class="bk-moreBtn">
                        <button id="moreBtn" class="btn btn-outline" type="button">
                            <i class="fa fa-angle-down fa-fw"></i>更多
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'safe_rd_log',
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
    #moreBtn {
        box-shadow: none;
    }
</style>
