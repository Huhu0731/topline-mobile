<template>
  <div>
    <van-nav-bar title="登陆"/>
    <form>
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          v-validate="'required'"
          name="mobile"
          :error-message="errors.first('mobile')"
          clearable
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field
          v-model="user.code"
          v-validate="'required'"
          name="code"
          :error-message="errors.first('code')"
          type="password"
          label="密码"
          placeholder="请输入验证码"
        />
      </van-cell-group>
    </form>
    <div class="login-btn">
      <van-button
        class="btn"
        type="info"
        @click.prevent="handleLogin"
        :loading="loginLoading"
      >登陆</van-button>
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
      },
      loginLoading: false // 登录按钮状态
    }
  },
  created () {
    // 自定义校验规则创建
    this.configCustomMessages()
  },
  methods: {
    // 点击登陆按钮
    async handleLogin () {
      this.loginLoading = true
      try {
        // 点击登陆表单验证 验证成功。。 不成功。。。
        this.$validator.validate().then(async valid => {
          // 表单验证不成功
          if (!valid) {
            this.loginLoading = false
            return
          }
          // 验证通过才发请求
          const data = await login(this.user)
          // console.log(data)
          // 登陆成功通过 调用 mutation 更新容器中的 user 的状态（信息）
          this.$store.commit('setUser', data)
          this.loginLoading = false
          this.$router.push({
            name: 'home'
          })
        })
      } catch (err) {
        console.log(err)
        // console.log('登陆失败')
        this.loginLoading = false
        this.$toast.fail('登陆失败')
        this.$toast.fail('登录失败！')
      }
    },
    // 自定义校验规则
    configCustomMessages () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空'
          },
          code: {
            required: () => '验证码不能为空'
          }
        }
      }
      this.$validator.localize('zh_CN', dict)
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
