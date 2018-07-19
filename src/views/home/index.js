// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './../../router'
import jQuery from 'jquery'
import 'bootstrap/css/bootstrap.min.css'
import './../../assets/css/font-awesome.css'
import 'bootstrap/js/bootstrap.min.js'
import axios from 'axios'
import Vuex from 'vuex'
import store from './../../vuex/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
axios.interceptors.request.use(function (config) {
  console.log(config.url)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
  console.log(response)
  if( response.data.code <= 200){
    return response;
  }else{
    if(response.data.code == 10000){
      //未登录

    }
    vm.$alert(response.data.msg, 'ERROR', {
      confirmButtonText: '确定',
      type:"error"
    });
    return Promise.reject(response);
  }
}, function (error) {
  console.log(error)
  return Promise.reject(error);
});

Vue.prototype.$ajax = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
