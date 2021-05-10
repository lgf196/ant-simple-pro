import axios, { Canceler } from 'axios'
import request, { LoadingCallback } from '@/utils/request'
import { MenuListItem } from './types'

export type QueryMenusParams = {
  page: number
  size: number
  sort?: 'desc' | 'asc'
}

export type QueryMenusResult = {
  list: MenuListItem[]
  total: number
}

export type UpdateMenuParams = {
  id: number | null
  title: string
  url: string
  icon: string
  pid: number[] | null
}

export const getMenus = (
  params: QueryMenusParams
): Promise<QueryMenusResult> => {
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

export const updateMenu = (
  data: UpdateMenuParams,
  loadingCb: LoadingCallback,
  cancelCallback: (cancel: Canceler) => void
) => {
  return request({
    method: 'post',
    url: '/menu/getCurrentOption',
    data,
    loadingCb,
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}

export const deleteMenu = (
  id: number,
  cancelCallback: (cancel: Canceler) => void
) => {
  return request({
    method: 'post',
    url: '/menu/delete',
    data: {
      id
    },
    cancelToken: new axios.CancelToken(cancelCallback)
  })
}
