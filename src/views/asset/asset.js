import Vue from 'vue'
import Asset from './assetApp'
import router from './../../router/assetRoute.js'
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
  el: '#nbAsset',
  router,
  components: { Asset },
  template: '<Asset/>'
})