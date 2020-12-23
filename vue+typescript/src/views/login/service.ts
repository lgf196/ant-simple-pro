import request from '@/utils/request'

type LoginParams = {
  email: string
  password: string
}

export function login(data: LoginParams) {
  return request({
    method: 'post',
    url: '/login',
    data
  })
}
