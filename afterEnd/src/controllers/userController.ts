import { Request, Response, NextFunction, RequestHandler } from 'express';
import asyncHandler from '../middleware/asyncHandler'
import mysqlDb from '../config/db'
import author from '../middleware/author'
import {code,sucessCallbackVal} from '../utils/variable'
import {sendResponse} from '../middleware/response'

export const userInfo=asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    const sqlStr = `select * from a_user`;
    const db=await mysqlDb.execute(sqlStr);
    if(db.code===code.successCode){
        res.send(sucessCallbackVal(code.successCode,db.data,'成功'));
    }else{
        res.send(sucessCallbackVal(code.failedCode,db.data,'失败'));
    }
});

export const login=asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    const {username,password}=req.body;
    const sql = `select name,username,password,id from a_user where username='${username}' and password='${password}'`;
    const db=await mysqlDb.execute(sql);
    if(db.code===code.successCode){
        const createToken=author.createToken({username,password}); //生成token
        sendResponse(db.data,createToken,sucessCallbackVal(code.failedCode,'未查到此用户','失败',false),res);
    }else{
        res.status(500).json(sucessCallbackVal(code.failedCode,'服务器出错','失败',false));
    }
});