
import Vue from 'vue'
import App from './goods'
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

let flag = true;
Vue.use(ElementUI);
axios.defaults.timeout = 5000;
axios.interceptors.request.use(function (config) {
  console.log(config.url)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  if( response.data.code <= 200){
    return response;
  }else{
    //未登录
    if(response.data.code == 10000){
      vm.$store.commit(checkLogin);
    }else{
      vm.$alert(response.data.msg, '提示', {
        confirmButtonText: '确定',
        type:"warning"
      });
    }
    return Promise.reject(response);
  }
}, function (error) {
  // if(flag){
  //   console.log(error)
  //   vm.$alert(error.message, '提示', {
  //     confirmButtonText: '确定',
  //     type:"error"
  //   });
  //   flag = false;
  // }
  return Promise.reject(error);
});
Vue.prototype.$ajax = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
let vm = new Vue({
  el: '#trade',
  router,
  store,
  components: { App },
  template: '<App/>'
})
