
import Vue from 'vue'
import App from './kline_trade.vue'
import router from './../../router'
import jQuery from 'jquery'

import 'bootstrap/css/bootstrap.min.css'
import './../../assets/css/font-awesome.css'
import 'bootstrap/js/bootstrap.min.js'
import axios from 'axios'
import Vuex from 'vuex'
import store from './../../vuex/store'

Vue.prototype.$ajax = axios

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#trade',
  router,
  store,
  components: { App },
  template: '<App/>'
})
