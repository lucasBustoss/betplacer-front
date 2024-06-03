import Vue from 'vue'
import App from './App.vue'
import router from '@/config/router'
import store from './config/store/store'
import './config/msgs'
Vue.config.productionTip = false

import "@/assets/css/global.css"
import vuetify from '@/plugins/vuetify'

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
