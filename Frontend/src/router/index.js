import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import MobileHome from '../views/MobileHome.vue'

const isMobile = () => (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: isMobile() ? MobileHome : Home
    }
  ]
})
