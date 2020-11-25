import request from '@/api/request'

export function login(data) {
  return request({
    method: 'post',
    url: '/login',
    data
  })
}
