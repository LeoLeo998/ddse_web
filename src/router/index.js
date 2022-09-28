import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/Index'
import Market from '@/views/Market'
import Exchange from '@/views/exchange/Index'
import Login from '@/views/user/Login'
import Register from '@/views/user/Register'
import FindPwd from '@/views/user/FindPwd'
import Agreement from '@/views/Agreement'
import center from '@/views/center'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/market',
      name: 'Market',
      component: Market
    },
    {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/FindPwd',
      name: 'FindPwd',
      component: FindPwd
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/center',
      name: 'Center',
      component: center
    }
  ]
})
