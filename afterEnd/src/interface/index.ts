import {code as codeStatus} from '../utils/variable'
import { Request } from 'express';
export type codes=codeStatus;
export interface dbType{
  code:codes;
  data:any[] | any
}
export interface sucessCallbackValType extends dbType{
   mes?:string | Error;
   success?:boolean
}
export interface sucessCallbackValInterface {
  (code:codes,data:any,mes?:string | Error,success?:boolean):sucessCallbackValType
}

export interface RequestHaveDecoded extends Request{  //将decoded属性扩展Request对象上
  decoded:string | object | undefined
}

export interface userInfoType {
  username:string;
  email:string;
  introduct:string
}