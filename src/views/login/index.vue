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
      <van-button class="btn" type="info">登陆</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: 17634950228,
        code: 123456
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
