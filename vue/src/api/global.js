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

export function getTotalRoles(loadingCb) {
  return request({
    url: '/role/total',
    loadingCb
  })
}

export const getTotalDirs = loadingCb => {
  return request({
    method: 'get',
    url: '/resource/dir',
    loadingCb
  })
}

export const getTotalResources = loadingCb => {
  return request({
    method: 'get',
    url: '/resource/total',
    loadingCb
  })
}
