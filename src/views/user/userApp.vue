<template>
    <div id="nbUserCenter">
        <div class="bk-body">
            <!-- 页面头部 开始 -->
            <header-asset></header-asset>
            <!-- 页面头部 结束 -->

            <!-- 页面中部内容开始 -->
            <div class="bk-safe">
                <div class="container">
                    <div class="finance-left safe-ld snav-ld">
                        <ul class="nb-finance-left">
                            <li v-for="item in assetLeftMenuData" :key="item.index">
                                <router-link :to="item.linkTo"><i :class="item.iconClass" aria-hidden="true"></i>{{item.optionText}}</router-link>
                            </li>
                        </ul>
                    </div>
                    <!-- 中间内容：右边内容区 开始 -->
                    <router-view></router-view>
                    <!-- 中间内容：右边内容区 结束 -->
                </div>
            </div>
            <!-- 页面中部内容结束 -->
        </div>
        <footer-bottom></footer-bottom>
    </div>
</template>

<script>
    import headerAsset from '@/components/assetHeaderNav'
    import footerBottom from '@/components/footerNav'
    export default {
        name: 'userApp',
        components: {headerAsset, footerBottom},
        data() {
            return {
                assetLeftMenuData: [
                    {
                        linkTo: '/basic',
                        iconClass: 'fa fa-list-alt',
                        optionText: '基本信息'
                    }, {
                        linkTo: '/strategy',
                        iconClass: 'fa fa-cog',
                        optionText: '安全设置'
                    }, {
                        linkTo: '/log',
                        iconClass: 'fa fa-shield',
                        optionText: '安全日志'
                    }, {
                        linkTo: '/message',
                        iconClass: 'fa fa-bullhorn',
                        optionText: '消息提醒'
                    }, {
                        linkTo: '/api',
                        iconClass: 'fa fa-cloud-upload',
                        optionText: 'API 管理'
                    }, {
                        linkTo: '/auth',
                        iconClass: 'fa fa-drivers-license-o',
                        optionText: '身份认证'
                    }
                ]
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

<style lang="less">
    @import './user.less';
    .safe-ld a.router-link-exact-active.router-link-active {
        background: #fdfafa;
        text-decoration: none;
        position: relative;
        color: #de211d;
    }
</style>
    
