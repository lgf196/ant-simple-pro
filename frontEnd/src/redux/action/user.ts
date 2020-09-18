import {menuAccessType,pagaTionBackData,getUserType} from '@/interfaces'
import * as types from '../constants/actionType'

export const getMenuTree = (data:menuAccessType[]) =>({type:types.GETMENUTREE,data});

export const getMenuList=(data:pagaTionBackData)=>({ type:types.GETMENULIST,data});

export const getUserList = (data:getUserType[]) => ({type:types.GET_USER_LIST,data});

export const getUserInfo = (data:getUserType | object) => ({type:types.GET_USER_INFO,data});
