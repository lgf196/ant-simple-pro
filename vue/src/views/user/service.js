import axios from 'axios'
import request from '@/api/request'

export const getUsers = (params, loadingCb) => {
  return request({
    method: 'get',
    url: '/user/find',
    params,
    loadingCb
  })
}

export const getUsersBuffer = () => {
  return request({
    method: 'get',
    url: '/fileDown'
  })
}

export const updateUser = (data, loadingCb, cancelCallback) => {
  return request({
    method: 'post',
    url: '/user/edit',
    data,
    loadingCb,
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}
