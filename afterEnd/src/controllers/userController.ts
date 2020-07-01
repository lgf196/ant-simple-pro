import { Request, Response, NextFunction, RequestHandler } from 'express';
import asyncHandler from '../middleware/asyncHandler'
import mysqlDb from '../config/db'
import author from '../middleware/author'
import {code,sucessCallbackVal} from '../utils/variable'
import {RequestHaveDecoded} from '../interface'
export const userInfo=asyncHandler(async (req: RequestHaveDecoded, res: Response, next: NextFunction)=>{
    const sqlStr = `select * from a_user`;
    const db=await mysqlDb.execute(sqlStr);
    if(db.code===code.successCode){
        console.log(' req.decoded',req.decoded)
        res.send(sucessCallbackVal(code.successCode,db.data,'成功'));
    }else{
        res.send(sucessCallbackVal(code.failedCode,db.data,'失败'));
    }
});


export const login=asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    const {email,password}=req.body;
    const sql = `select id,email,password,username,introduct,iconUrl from user where email='${email}' and password='${password}'`;
    const db=await mysqlDb.execute(sql);
    if(db.code===code.successCode){
        if(db.data.length){
            const {id,email} =db.data[0]; //获取重要的属性
            const createToken=author.createToken({id,email}); //生成token
            console.log('createToken', createToken)
            res.status(200).json(sucessCallbackVal(code.successCode,createToken,'成功',true));
        }else{
            res.status(200).json(sucessCallbackVal(code.failedCode,'未查到此用户','未查到此用户',false));
        }
    }else{
        res.status(500).json(sucessCallbackVal(code.failedCode,'服务器出错','失败',false));
    }
});