import Vue from 'vue'
import Router from 'vue-router'
import Basic from '@/components/safe_rd_basic'
import Strategy from '@/components/safe_rd_strategy'
import Log from '@/components/safe_rd_log'
import Message from '@/components/safe_rd_message'
import Api from '@/components/safe_rd_api'
import Auth from '@/components/safe_rd_basic'

import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

Vue.use(Router)

let VM = new Vue();

const router = new Router({
    routes: [{
        path: '/',
        redirect: '/basic'
    }, {
        path: '/basic',
        name: 'Basic',
        component: Basic
    }, {
        path: '/strategy',
        name: 'Strategy',
        component: Strategy
    }, {
        path: '/log',
        name: 'Log',
        component: Log
    }, {
        path: '/message',
        name: 'Message',
        component: Message
    }, {
        path: '/api',
        name: 'Api',
        component: Api
    }, {
        path: '/auth',
        name: 'Auth',
        component: Auth,
        beforeEnter: (to, from, next) => {
            window.location.href = '/views/auth/auth.html'
        }
    }]
})

// 判断用户是否登录
function isLogin() {
    let _principal = VM.$cookie.get("BCKJ_PRINCIPAL");
    if (_principal) {
        return true;
    }
    return false;
}

// 判断用户是否设置资金安全码
function hasSafePwd() {
    let _safePwdStatus = VM.$cookie.get("BCKJ_safePwdStatus");
    if (_safePwdStatus && _safePwdStatus == "true") {
        return true;
    }
    return false;
}

router.beforeEach((to, from, next) => {
    if (!isLogin()) {
        window.location.href = '/views/login/login.html'
    } else {
        if (!hasSafePwd()) {
            window.location.href = "/views/pwd/pwd.html#/setSafePwd";
        }
    }
    next()
})

export default router;