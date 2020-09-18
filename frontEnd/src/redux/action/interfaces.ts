import * as types from '../constants/actionType'
import {menuAccessType,pagaTionBackData,getUserType} from '@/interfaces'
import {CallHistoryMethodAction} from 'connected-react-router'
export interface getMenuTreeActionType {
    type:types.GETMENUTREE,
    data:menuAccessType[]
}
export interface getMenuListActionType {
    type:types.GETMENULIST,
    data:pagaTionBackData
}
export interface getUserListActionType {
    type:types.GET_USER_LIST,
    data:getUserType[]
}
export interface loadingType {
    type:types.LOADING_START | types.LOADING_END,
    data?:boolean
}
export interface getUserInfoActionType {
    type:types.GET_USER_INFO,
    data:getUserType
}
/**
 * @description 非redux异步模块的类型
 */
export type otherModuleType=CallHistoryMethodAction | loadingType;
/**
 * @description user模块action类型申明
*/
export type userActionTypeDeclare=getMenuTreeActionType | getMenuListActionType | getUserListActionType | getUserInfoActionType;
/**
 * @description 对所有action模块申明合并导出
 */
export type actionType=otherModuleType | userActionTypeDeclare;