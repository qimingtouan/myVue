import Vue from 'vue'
import Router from 'vue-router'
import FinanceAsset from '@/components/finance_rd_asset'
import Payin from '@/components/finance_rd_payin'
import Payout from '@/components/finance_rd_payout'
import Account from '@/components/finance_rd_account'
import Bill from '@/components/finance_rd_bill'

import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

Vue.use(Router)

let VM = new Vue();

const router = new Router({  routes: [{
    path: '/',
    redirect: '/financeAsset'
  }, {
    path: '/financeAsset',
    name: 'FinanceAsset',
    component: FinanceAsset
  }, {
    path: '/payin/*',
    name: 'Payin',
    component: Payin
  }, {
    path: '/payout/*',
    name: 'Payout',
    component: Payout
  }, {
    path: '/account/*',
    name: 'Account',
    component: Account
  }, {
    path: '/bill',
    name: 'Bill',
    component: Bill
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