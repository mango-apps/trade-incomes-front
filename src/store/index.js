import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    isAdmin: false
  },
  mutations: {
    setToken(state, param) {
      state.token = param
    },
    setIsAdmin(state, param) {
      state.isAdmin = param
    }
  },
  actions: {},
  modules: {}
})
