import {menuAccessType} from '@/interfaces'

export interface userStore{    //user模块
    getMenuTree:menuAccessType[],
    getMenuList:menuAccessType[]
}

