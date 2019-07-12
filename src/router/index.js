import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { // tabbar-layout
      path: '/',
      component: () => import('@/views/tabbar-layout'),
      children: [
        { // 首页
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        }
      ]
    },
    { // 登陆页面
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    { // 表单验证测试文件
      name: 'text',
      path: '/text',
      component: () => import('@/views/text')
    }
  ]
})
