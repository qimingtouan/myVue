import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName : 'hello',
    selectedPrice:""
  },
  mutations:{
    userNameChange(state,msg) {
      this.state.userName  = msg
    },
    setPrice(state,price){
      this.state.selectedPrice = price;
      console.log(price)
    }
  }
})

export default store