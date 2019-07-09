import request from '@/utils/request'

export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    URL: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
