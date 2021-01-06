import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/user/info'
  })
}

export function getAccessMenus() {
  return request({
    url: '/menu/getCurrentUserMenuAuthTree'
  })
}
