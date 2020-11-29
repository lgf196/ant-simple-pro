import request from '@/api/request'

export const getMenus = (params) => {
  return request({
    method: 'get',
    url: '/menu/getCurrentList',
    params
  })
}
