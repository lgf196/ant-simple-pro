import {menuAccessType} from '@/interfaces'
import {GETMENUTREE} from '../constants/actionType'
export const getMenuTree = (data:menuAccessType[]) => {
    return {
      type:GETMENUTREE,
      data
    }
  }