import {codes} from '../interface'
 export enum code {          //定义状态码
    successCode='000',          //成功
    failedCode='111',         //失败
}

export const sucessCallbackVal=(code:codes,data:any,mes?:string)=>({code,data,mes});