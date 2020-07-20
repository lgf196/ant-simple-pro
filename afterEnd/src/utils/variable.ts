import {codes} from '../interface'
import {sucessCallbackValInterface} from '../interface'
 export enum code {          //定义状态码
    failedCode=111,         //失败
    successCode='000',        //成功
    noLoginTokenCode=202,   //无token
    noRouterCode=404,        //路劲找不到
    serverErrorCode=500      //服务错误
}

export const sucessCallbackVal:sucessCallbackValInterface=(code,data,mes,success)=>({code,data,mes,success});