import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './styles/index.less'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 第三方表单校验 配语言包
import VeeValidate, { Validator } from 'vee-validate' // 第三方表单校验 配语言包
Vue.use(VeeValidate, {
  events: '' // 什么时候触发校验规则 默认为input
  // 配置文档：https://baianat.github.io/vee-validate/guide/events.html#changing-default-events
}) // 第三方表单校验
Validator.localize('zh_CN', zhCN) // 第三方表单校验 配语言包

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
