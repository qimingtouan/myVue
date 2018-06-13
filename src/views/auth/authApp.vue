<template>
    <div id="nbAuthCenter">
        <div class="bk-body">
            <!-- 页面头部 开始 -->
            <header-asset></header-asset>
            <!-- 页面头部 结束 -->

            <!-- 页面中部内容开始 -->
            <div class="bk-onekey">
                <div class="bk-safe">
                    <div class="container">
                        <div class="finance-left safe-ld snav-ld">
                            <ul class="nb-finance-left" id="snavleft">
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
        name: 'authApp',
        components: {headerAsset, footerBottom},
        data() {
            return {
                assetLeftMenuData: [
                    {
                        linkTo: '/goback',
                        iconClass: 'fa fa-reply fa-lg',
                        optionText: '返回'
                    }, {
                        linkTo: '/email',
                        iconClass: 'fa fa-envelope fa-lg',
                        optionText: '安全邮箱'
                    }, {
                        // linkTo: '/phone',
                        // linkTo: {name: 'Phone', params: { method: 123 }},
                        linkTo: '/phone/',
                        iconClass: 'fa fa-mobile fa-2x',
                        optionText: '手机认证'
                    }, {
                        linkTo: '/idcard',
                        iconClass: 'fa fa-user fa-lg',
                        optionText: '实名认证'
                    }, {
                        linkTo: '/password',
                        iconClass: 'fa fa-lock fa-lg',
                        optionText: '固态登录密码'
                    }, {
                        linkTo: '/safeword',
                        iconClass: 'fa fa-lock fa-lg',
                        optionText: '资金安全密码'
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
    
    $(document).on("click",".close",function(){
        $(this).closest(".ctips").slideUp(100)
    })
</script>

<style lang="less">
    @import './auth.less';
    .safe-ld a.router-link-active {
        background: #fdfafa;
        text-decoration: none;
        position: relative;
        color: #de211d;
    }

    i.fa.fa-mobile.fa-2x {
        top: 43%;
    }
</style>
    
