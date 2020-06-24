import {code as codeStatus} from '../utils/variable'
export type codes=codeStatus;
export interface dbType{
  code:codes,
  data:any[] | any
}
export interface sucessCallbackValType extends dbType{
   mes:string
}