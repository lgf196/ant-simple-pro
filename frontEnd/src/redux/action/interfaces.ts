import * as types from '../constants/actionType'
import {menuAccessType} from '@/interfaces'
import {CallHistoryMethodAction} from 'connected-react-router'
export interface getMenuTreeActionType {
    type:types.GETMENUTREE,
    data:menuAccessType[]
}
export interface getMenuListActionType extends Pick<getMenuTreeActionType,'data'>{
    type:types.GETMENULIST,
}
export type actionType=getMenuTreeActionType | getMenuListActionType | CallHistoryMethodAction;