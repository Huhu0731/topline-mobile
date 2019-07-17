<template>
  <div>
    <van-nav-bar title="首页" fixed/>
    <van-tabs v-model="activeChannelIndex" class="channel-tabs">
      <van-tab
       v-for="item in channels"
       :title="item.name"
       :key="item.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 文章列表 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'

export default {
  name: 'HomeIndex',
  data () {
    return {
      activeChannelIndex: 0, // 当前频道的激活页
      channels: [], // 存储频道列表
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  created () {
    // 加载频道列表
    this.loadChannels()
  },
  methods: {
    // 加载文章列表事件
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 下拉刷新出发的事件
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    // 加载频道列表
    async loadChannels () {
      /**
       * 这里分情况
       * 用户已登陆：加载用户的频道列表
       * 用户未登录：是否有本地存储的频道列表
       *        1.有    拿取本地的频道列表
       *        2.没有  获取默认的频道列表（推荐频道
       */
      const { user } = this.$store.state
      let channels = []
      if (user) { // 用户已登陆
        const data = await getUserChannels()
        channels = data.channels
      } else { // 用户未登陆
        const localChannels = JSON.parse(window.localStorage.getItem('channels'))
        if (localChannels) {
          channels = localChannels
        }
        const data = await getUserChannels()
        channels = data.channels
      }
      // 修改 channels，将这个数据结构修改为满足我们使用的需求
      // 每个频道下都有它自己的文章  下拉加载  上啦加载更多 以及是否加载完成
      channels.forEach(item => {
        item.article = [] // 当前频道文章列表
        item.downPullLoading = false // 控制当前频道的下拉刷新 loading 状态
        item.upPullLoading = false // 控制当前频道的上拉加载更多的 loading 状态
        item.upPullFinished = false // 控制当前频道数据是否加载完毕
      })
      this.channels = channels
    }
  }
}
</script>

<style lang="less" scoped>

.channel-tabs {
  margin-top: 100px;
  margin-bottom: 100px;
}
// 深度作用选择器：https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}
</style>
