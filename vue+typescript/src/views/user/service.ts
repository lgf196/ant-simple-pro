import axios, { Canceler } from 'axios'
import request, { LoadingCallback } from '@/utils/request'

export type GetUsersParamsType = {
  username: string
}

export type UpdateUsersParamsType = {
  id: number
  username: string
  introduct: string
  iconUrl: string
}

export const getUsers = (params: GetUsersParamsType, loadingCb: LoadingCallback) => {
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

export const updateUser = (
  data: UpdateUsersParamsType,
  loadingCb: LoadingCallback,
  cancelCallback: (cancel: Canceler) => void
) => {
  return request({
    method: 'post',
    url: '/user/edit',
    data,
    loadingCb,
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}
