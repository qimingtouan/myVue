import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie);
Vue.use(Vuex);
let vm = new Vue();
const store = new Vuex.Store({
  state: {
    userName : "",
    isLogin:false,
    selectedPrice:"",//用户点击的价格
    count:0,//每次值不同，用来触发回调
    currentCoin:"BTC/USDT",
    klineTheme:"dark",
    localLanguage:'cn',
    vip:"0",
    timer:null,
    interval:0,
    time:0,
    nowprice:""//当前货币价格
  },
  mutations:{
    setPrice(state,price){
      state.count++;
      state.selectedPrice = price;
    },
    setNowprice(state,price){
      state.nowprice = price;
    },
    setCurrentCoin(state,msg){
      state.currentCoin = msg;
    },
    checkLogin(){
      if(vm.$cookie.get("BCKJ_PRINCIPAL")){
        this.state.isLogin = true;
        this.state.userName =vm.$cookie.get("BCKJ_VISITOR");
      }else{
        this.state.isLogin = false;
        this.state.userName = "";
        vm.$cookie.delete("BCKJ_safePwdStatus");
      }
      
    },
    setLanguage(state,type){
      this.state.localLanguage = type;
      //setCookie
    },
    setklineTheme(state,msg){
      state.klineTheme = msg;
    },
    changeTime(state,val){
        this.state.time = val
    },
    stopInterval(state){
      clearInterval(this.state.timer);
      this.state.timer = null;
    }
  },
  actions: {
    startInterval(store) {
      if(!store.state.timer){
        store.state.timer =  setInterval(() => { 
          store.commit('changeTime',store.state.time+1)
        },2000)
      }
    }
}
})

export default store