import Vue from 'vue'
import AuthCenter from './authApp'
import router from './../../router/authRoute.js'
import jQuery from 'jquery'
import './../../assets/css/safe.css'
import './../../assets/css/font-awesome.css'
import 'bootstrap/css/bootstrap.min.css'
import 'bootstrap/js/bootstrap.min.js'
import axios from 'axios'
import Vuex from 'vuex'
import store from './../../vuex/store'

Vue.prototype.$ajax = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#nbAuthCenter',
  router,
  components: { AuthCenter },
  template: '<AuthCenter/>'
})