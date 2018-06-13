import Vue from 'vue'
import Router from 'vue-router'
import Basic from '@/components/safe_rd_basic'
import Strategy from '@/components/safe_rd_strategy'
import Log from '@/components/safe_rd_log'
import Message from '@/components/safe_rd_message'
import Api from '@/components/safe_rd_api'
import Auth from '@/components/safe_rd_basic'

Vue.use(Router)

export default new Router({
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