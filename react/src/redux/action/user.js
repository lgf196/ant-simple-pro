import * as types from '../constants/actionType'

export const getMenuTree = (data) => ({ type: types.GETMENUTREE, data });

export const loadingMenuTree = (data) => ({ type: types.LOADING_MENU_TREE, data });

export const getMenuList = (data) => ({ type: types.GETMENULIST, data });

export const getUserList = (data) => ({ type: types.GET_USER_LIST, data });

export const getUserInfo = (data) => ({ type: types.GET_USER_INFO, data });

export const loadingUserInfo = (data) => ({ type: types.LOADING_USER_INFO, data });
