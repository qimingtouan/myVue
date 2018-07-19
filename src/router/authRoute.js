import Vue from 'vue'
import Router from 'vue-router'

import Goback from '@/components/auth_rd_email'
import Email from '@/components/auth_rd_email'
import Phone from '@/components/auth_rd_phone'
import IDcard from '@/components/auth_rd_idcard'
import Password from '@/components/auth_rd_password'
import Safeword from '@/components/auth_rd_safeword'

import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

Vue.use(Router)

let VM = new Vue();

const router = new Router({
    routes: [{
        path: '/',
        redirect: '/email'
    }, {
        path: '/goback',
        name: 'Goback',
        component: Goback,
        beforeEnter: (to, from, next) => {
            window.location.href = '/views/user/user.html'
        }
    }, {
        path: '/email',
        name: 'Email',
        component: Email
    }, {
        path: '/phone',
        name: 'Phone',
        component: Phone
    }, {
        path: '/idcard',
        name: 'IDcard',
        component: IDcard
    }, {
        path: '/password',
        name: 'Password',
        component: Password
    }, {
        path: '/safeword',
        name: 'Safeword',
        component: Safeword
    }]
});

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
        window.location.href = '/views/login/login.html';
    } else {
        if (!hasSafePwd()) {
            window.location.href = "/views/pwd/pwd.html#/setSafePwd";
        }
    }
    next()
})

export default router;