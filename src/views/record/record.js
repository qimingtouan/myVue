
import Vue from 'vue'
import router from './../../router'
import App from './record_more.vue'
import jQuery from 'jquery'
import 'bootstrap/css/bootstrap.min.css'
import './../../assets/css/font-awesome.css'
import 'bootstrap/js/bootstrap.min.js'
import axios from 'axios'
import Vuex from 'vuex'
import store from './../../vuex/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$ajax = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#record',
  router,
  store,
  components: { App },
  template: '<App/>'
})
