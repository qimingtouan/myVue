import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName : 'hello',
    isLogin:false,
    selectedPrice:"",
    count:0,//每次值不同，用来触发回调
    currentCoin:"NB/USDT",
  },
  mutations:{
    userNameChange(state,msg) {
      state.userName  = msg
    },
    setPrice(state,price){
      state.count++;
      state.selectedPrice = price;
      console.log(price)
    },
    login (state,msg){
      state.isLogin = true;
    },
    logout (state,msg){
      state.isLogin = false;
    },
    setCurrentCoin(state,msg){
      state.currentCoin = msg;
    },
    checkLogin(){
      //检查cookie是否登录；
      this.state.isLogin = true;
    }
  }
})

export default store