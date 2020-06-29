import { Request, Response, NextFunction, RequestHandler } from 'express';
import asyncHandler from '../middleware/asyncHandler'
import mysqlDb from '../config/db'
import author from '../middleware/author'
import {code,sucessCallbackVal} from '../utils/variable'

export const userInfo=asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    const sqlStr = `select * from a_user`;
    const db=await mysqlDb.execute(sqlStr);
    if(db.code===code.successCode){
        author.createToken({username: 'zhangsan', password: '123'})
    //    console.log('token', author.createToken({username: 'zhangsan', password: '123'}))
        res.send(sucessCallbackVal(code.successCode,db.data,'成功'));
    }else{
        res.send(sucessCallbackVal(code.failedCode,db.data,'失败'));
    }
});

export const login=asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    // console.log('login', req,res)
    next()
});