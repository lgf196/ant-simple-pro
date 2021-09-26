import { menuAccessType, pagaTionBackData, getUserType } from '@/interfaces'
export interface userStore {    // user模块
  getMenuTree: menuAccessType[],
  loadingMenuTree: boolean,
  getMenuList: pagaTionBackData,
  getUserList: getUserType[],
  getUserInfo: getUserType,
  loadingUserInfo: boolean
}

export interface oherStore {
  loading: boolean
}
