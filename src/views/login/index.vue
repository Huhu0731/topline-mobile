<template>
  <div>
    <van-nav-bar title="登陆"/>
    <form>
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          clearable
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field
          v-model="user.code"
          type="password"
          label="密码"
          placeholder="请输入验证码"
        />
      </van-cell-group>
    </form>
    <div class="login-btn">
      <van-button class="btn" type="info" @click="handleLogin">登陆</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '17634950228',
        code: '246810'
      }
    }
  },
  methods: {
    // 点击登陆按钮
    async handleLogin () {
      try {
        const data = await login(this.user)
        // console.log(data)
        // 登陆成功通过 调用 mutation 更新容器中的 user 的状态（信息）
        this.$store.commit('setUser', data)
      } catch (err) {
        console.log(err)
        console.log('登陆失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 10px;
  .btn {
    width: 100%;
  }
}
</style>
