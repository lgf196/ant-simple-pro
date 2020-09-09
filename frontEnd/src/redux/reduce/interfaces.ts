import {menuAccessType,pagaTionBackData,getUserType} from '@/interfaces'
export interface userStore{    //user模块
    getMenuTree:menuAccessType[],
    getMenuList:pagaTionBackData,
    getUserList:getUserType[]
}

export interface oherStore{   
  loading:boolean
}
