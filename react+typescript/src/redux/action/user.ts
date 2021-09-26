import { menuAccessType, pagaTionBackData, getUserType } from '@/interfaces'
import * as types from '../constants/actionType'

export const getMenuTree = (data: menuAccessType[]) => ({ type: types.GETMENUTREE, data });

export const loadingMenuTree = (data: boolean) => ({ type: types.LOADING_MENU_TREE, data });

export const getMenuList = (data: pagaTionBackData) => ({ type: types.GETMENULIST, data });

export const getUserList = (data: getUserType[]) => ({ type: types.GET_USER_LIST, data });

export const getUserInfo = (data: getUserType | object) => ({ type: types.GET_USER_INFO, data });

export const loadingUserInfo = (data: boolean) => ({ type: types.LOADING_USER_INFO, data });
