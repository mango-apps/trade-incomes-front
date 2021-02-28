import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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
  modules: {},
  plugins: [createPersistedState()]
})
