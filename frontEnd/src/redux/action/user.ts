import {menuAccessType} from '@/interfaces'
import * as types from '../constants/actionType'
export const getMenuTree = (data:menuAccessType[]) => {
    return {
      type:types.GETMENUTREE,
      data
    }
}
export const getMenuList=(data:menuAccessType[])=>({ type:types.GETMENULIST,data});
