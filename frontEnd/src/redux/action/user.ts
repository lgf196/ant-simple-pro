import {menuAccessType,pagaTionBackData} from '@/interfaces'
import {getMenuListActionType} from './interfaces'
import * as types from '../constants/actionType'
export const getMenuTree = (data:menuAccessType[]) => {
    return {
      type:types.GETMENUTREE,
      data
    }
}
export const getMenuList=(data:pagaTionBackData)=>({ type:types.GETMENULIST,data});
