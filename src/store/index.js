import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: auth.getUser() // 从本地拿取 用户信息token
  },
  mutations: {
    /**
     * 登录成功，调用 mutation 更新容器中的 user 的状态
     */
    setUser (state, data) {
      state.user = data // 修改容器中的user
      auth.saveUser(state.user) // 修改本地中的user
    }
  },
  actions: {

  }
})
