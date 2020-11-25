import axios from 'axios'
import request from '@/api/request'

export const getRoles = (params, loadingCb) => {
  return request({
    method: 'get',
    url: '/role',
    params,
    loadingCb
  })
}

export const saveRole = (data, loadingCb, cancelCallback) => {
  return request({
    method: 'post',
    url: '/role',
    data,
    loadingCb,
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}

export const deleteRole = (params, loadingCb) => {
  return request({
    method: 'delete',
    url: `/role/${params.id}`,
    loadingCb
  })
}
