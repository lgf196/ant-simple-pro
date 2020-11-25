import axios from 'axios'
import request from '@/api/request'

export const getResources = (params, loadingCb) => {
  return request({
    method: 'get',
    url: '/resource',
    params,
    loadingCb
  })
}

export const saveResource = (data, loadingCb, cancelCallback) => {
  return request({
    method: 'post',
    url: '/resource',
    data,
    loadingCb,
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}

export const patchResource = (data, loadingCb) => {
  return request({
    method: 'patch',
    url: '/resource',
    data,
    loadingCb
  })
}

export const deleteResource = (params, loadingCb) => {
  return request({
    method: 'delete',
    url: `/resource/${params.id}`,
    params,
    loadingCb
  })
}
