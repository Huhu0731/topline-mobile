/**
 * 将操作本地存储中用户数据的信息封装为一个模块
 * 然后在任何需要操作本地存储中 user 的地方去使用
 */
const USER_KEY = 'user'

// 获取本地存储中的token
export const getUser = () => {
  return JSON.parse(Window.localStorage.getItem(USER_KEY))
}

// 修改本地存储的信息
export const saveUser = (data) => {
  window.localStorage.getItem(USER_KEY, JSON.stringify(data))
}

// 删除本地存储信息
export const removeUser = () => {
  Window.localStorage.removeItem(USER_KEY)
}
