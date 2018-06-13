import Vue from 'vue'
import Router from 'vue-router'
import Goback from '@/components/auth_rd_email'
import Email from '@/components/auth_rd_email'
import Phone from '@/components/auth_rd_phone'
import IDcard from '@/components/auth_rd_idcard'
import Password from '@/components/auth_rd_password'
import Safeword from '@/components/auth_rd_safeword'

Vue.use(Router)

export default new Router({
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
        path: '/phone/*',
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
})