
import Vue from 'vue'
import App from './kline_trade.vue'
import router from './../../router'
import jQuery from 'jquery'
import './../../../static/js/jquery.mousewheel.js'
import 'bootstrap/css/bootstrap.min.css'
import './../../assets/css/font-awesome.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import Vuex from 'vuex'
import store from './../../vuex/store'

Vue.prototype.$ajax = axios
Vue.use(ElementUI);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#trade',
  router,
  store,
  components: { App },
  template: '<App/>'
})
