import { Response } from 'express';
import {code,sucessCallbackVal} from '../utils/variable'
import {sucessCallbackValType} from '../interface'
/**
 * 
 * @param DbData | 数据库查询返回的值
 * @param responseHaveData |  数据库查到处理返给前端的值
 * @param responseNoData | 数据库查不到返给前端处理的值
 * @param res | response对象
 * @description 处理数据库查询成功的返回数据 
 */
export const sendResponse = (DbData:any,responseHaveData:any,responseNoData:sucessCallbackValType,res: Response) => {
    if(DbData.length){
        res.status(200).json(sucessCallbackVal(code.successCode,responseHaveData,'成功',true));
    }else{
        res.status(200).json(responseNoData);
    }
};