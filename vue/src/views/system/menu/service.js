import axios from 'axios'
import request from '@/utils/request'

export const getMenus = params => {
  return request({
    method: 'get',
    url: '/menu/getCurrentList',
    params
  })
}

export const getMenuTree = () => {
  return request({
    method: 'get',
    url: '/menu/getCurrentUserMenuAuthTree'
  })
}

export const updateMenu = (data, loadingCb, cancelCallback) => {
  return request({
    method: 'post',
    url: '/menu/getCurrentOption',
    data,
    loadingCb,
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}

export const deleteMenu = (id, cancelCallback) => {
  return request({
    method: 'post',
    url: '/menu/delete',
    data: {
      id
    },
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}
