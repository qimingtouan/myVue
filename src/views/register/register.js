import Vue from 'vue'
import Register from './registerApp'
import router from './../../router'
import jQuery from 'jquery'
import './../../assets/css/font-awesome.css'
import 'bootstrap/css/bootstrap.min.css'
import 'bootstrap/js/bootstrap.min.js'
import axios from 'axios'
import Vuex from 'vuex'
import store from './../../vuex/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

Vue.prototype.$ajax = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#register',
  router,
  components: { Register },
  template: '<Register/>'
})