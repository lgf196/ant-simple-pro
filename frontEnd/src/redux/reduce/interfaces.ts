import {menuAccessType,pagaTionBackData} from '@/interfaces'
export interface userStore{    //user模块
    getMenuTree:menuAccessType[],
    getMenuList:pagaTionBackData
}

export interface oherStore{    //user模块
  loading:boolean
}
