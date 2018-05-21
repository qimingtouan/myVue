import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName : 'hello'
  },
  mutations:{
    userNameChange(state,msg) {
      this.state.userName  = msg
    }
  }
})

export default store