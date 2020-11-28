import * as types from '../constants/actionType'
import { menuAccessType, pagaTionBackData, getUserType } from '@/interfaces'
import { CallHistoryMethodAction } from 'connected-react-router'
export interface getMenuTreeActionType {
  type: types.GETMENUTREE,
  data: menuAccessType[]
}
export interface loadingMenuTreeActionType {  // 是否加载出权限tree
  type: types.LOADING_MENU_TREE,
  data?: boolean
}
export interface getMenuListActionType {
  type: types.GETMENULIST,
  data: pagaTionBackData
}
export interface getUserListActionType {
  type: types.GET_USER_LIST,
  data: getUserType[]
}
export interface loadingType {
  type: types.LOADING_START | types.LOADING_END,
  data?: boolean
}
export interface getUserInfoActionType {
  type: types.GET_USER_INFO,
  data: getUserType
}
export interface loadingUserInfoActionType {  // 是否加载出用户信息
  type: types.LOADING_USER_INFO,
  data?: boolean
}
/**
 * @description 非redux异步模块的类型
 */
export type otherModuleType = CallHistoryMethodAction | loadingType;
/**
 * @description user模块action类型申明
*/
export type userActionTypeDeclare = getMenuTreeActionType | getMenuListActionType
  | getUserListActionType | getUserInfoActionType
  | loadingMenuTreeActionType | loadingUserInfoActionType;
/**
 * @description 对所有action模块申明合并导出
 */
export type actionType = otherModuleType | userActionTypeDeclare;
