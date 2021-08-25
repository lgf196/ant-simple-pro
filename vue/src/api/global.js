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

export function uploadFile(file) {
  const fd = new FormData()
  fd.append('file', file)
  return request({
    method: 'post',
    url: '/api/fileUpload',
    data: fd
  })
}
