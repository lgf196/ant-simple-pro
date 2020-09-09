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
export type actionType=getMenuTreeActionType | getMenuListActionType 
                       | CallHistoryMethodAction | loadingType | getUserListActionType;