import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/home')
    },
    { // 登陆页面
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      name: 'text',
      path: '/text',
      component: () => import('@/views/text')
    }
  ]
})
