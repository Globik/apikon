import Vue from 'vue'
import App from './App.vue'
import store from './store'
import index from './router/index'
import axios from 'axios'

axios.defaults.baseURL = 'https://ruletka.ru'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const token = localStorage.getItem('accessToken')
axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null

Vue.config.productionTip = false

const router = () => index

new Vue({
  store,
  router: router(),
  render: h => h(App)
}).$mount('#app')
