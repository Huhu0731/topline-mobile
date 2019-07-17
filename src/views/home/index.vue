<template>
  <div>
    <van-nav-bar title="首页" fixed/>
    <van-tabs v-model="activeChannelIndex" class="channel-tabs">
      <van-tab
       v-for="item in channels"
       :title="item.name"
       :key="item.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="item.downPullLoading" @refresh="onRefresh">
          <!-- 文章列表 -->
          <van-list
            v-model="item.upPullLoading"
            :finished="item.upPullFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in item.article"
              :key="item.art_id"
              :title="item.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'

export default {
  name: 'HomeIndex',
  data () {
    return {
      activeChannelIndex: 0, // 当前频道的激活页
      channels: [] // 存储频道列表
    }
  },
  created () {
    // 加载频道列表
    this.loadChannels()
  },
  computed: {
    // 计算当前频道激活项
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },
  methods: {
    // 加载文章列表事件
    async onLoad () {
      // console.log('onload')
      let data = []
      data = await this.loadArticles()
      // console.log(data)
      // pre_timestamp 下一页的页码
      // results 文章列表
      // 解决初始化的时候没有最新推荐数据的问题（没有最新数据，那就加载上一次推荐数据）
      if (data.pre_timestamp && !data.results.length) {
        this.activeChannel.timestamp = data.pre_timestamp
        // 加载下一页数据
        data = await this.loadArticles()
      }
      // 数据加载好以后，将 pre_timestamp 更新到当前频道的中用于加载下下页数据
      this.activeChannel.timestamp = data.pre_timestamp
      // 将文章数据更新到频道中（注意：是 push 追加，不是覆盖）
      this.activeChannel.article.push(...data.results)
      // 数据加载完毕，取消上拉 loading
      this.activeChannel.upPullLoading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
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
        item.timestamp = Date.now() // 存储下一页数据的时间戳
        item.downPullLoading = false // 控制当前频道的下拉刷新 loading 状态
        item.upPullLoading = false // 控制当前频道的上拉加载更多的 loading 状态
        item.upPullFinished = false // 控制当前频道数据是否加载完毕
      })
      this.channels = channels
    },
    // 加载推荐频道列表数据
    async loadArticles () {
      const { id: channelId, timestamp } = this.activeChannel
      const data = await getArticles({
        channelId, // 当前激活频道id
        timestamp, // 当前频道下一页数据的时间戳
        withTop: 1 // 是否包含置顶数据
      })
      return data
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
