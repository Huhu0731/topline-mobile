import axios from 'axios'

// 配置基础路径
const request = axios.create({
  // baseURL: 'http://toutiao.course.itcast.cn' // 局域网接口 登陆验证码123456
  baseURL: 'http://ttapi.research.itcast.cn/' // 线上接口 登陆验证码246810
})

// 添加一个请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 添加一个响应拦截器
request.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data.data || response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default request
