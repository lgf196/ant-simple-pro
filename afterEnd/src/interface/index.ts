import {code as codeStatus} from '../utils/variable'
export type codes=codeStatus;
export interface dbType{
  code:codes,
  data:any[] | any
}
export interface sucessCallbackValType extends dbType{
   mes?:string,
   success?:boolean
}
export interface sucessCallbackValInterface {
  (code:codes,data:any,mes?:string,success?:boolean):sucessCallbackValType
}