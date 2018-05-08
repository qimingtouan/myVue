// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './../../router'
import jQuery from 'jquery'
import 'bootstrap/css/bootstrap.min.css'
import 'bootstrap/js/bootstrap.min.js'
import './file.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './../../vuex/store'

Vue.prototype.$ajax = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
