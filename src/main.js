import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueMask from 'v-mask'
import Toasted from 'vue-toasted'

import './assets/scss/index.scss'

Vue.use(Toasted)
Vue.use(VueMask)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
