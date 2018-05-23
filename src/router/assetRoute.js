import Vue from 'vue'
import Router from 'vue-router'
import FinanceRD from '@/components/financeRD'
import Payin from '@/components/finance_rd_payin'
import Payout from '@/components/finance_rd_payout'
import Account from '@/components/finance_rd_account'
import Bill from '@/components/finance_rd_bill'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/financeAsset'
    },
    {
      path: '/financeAsset',
      name: 'FinanceRD',
      component: FinanceRD
    },
    {
      path: '/payin',
      name: 'Payin',
      component: Payin
    },
    {
      path: '/payout',
      name: 'Payout',
      component: Payout
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/bill',
      name: 'Bill',
      component: Bill
    }
  ]
})
