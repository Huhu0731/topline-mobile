import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './styles/index.less'
import VeeValidate from 'vee-validate' // 第三方表单校验
Vue.use(VeeValidate) // 第三方表单校验

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
