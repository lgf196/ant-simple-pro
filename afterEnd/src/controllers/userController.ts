import { Request, Response, NextFunction, RequestHandler } from 'express';
import asyncHandler from '../middleware/asyncHandler'
import mysqlDb from '../config/db'
import author from '../middleware/author'
import {code,sucessCallbackVal} from '../utils/variable'
import {RequestHaveDecoded,userInfoType} from '../interface'
import xlsx from 'node-xlsx';
import fs from 'fs'
import ErrorResponse from '../utils/errorResponse';
import path from 'path';

export const userInfo=asyncHandler(async (req: RequestHaveDecoded, res: Response, next: NextFunction)=>{
    const sqlStr = `select * from a_user`;
    const db=await mysqlDb.execute(sqlStr);
    if(db.code===code.successCode){
        res.send(sucessCallbackVal(code.successCode,db.data,'成功'));
    }else{
        res.send(sucessCallbackVal(code.failedCode,db.data,'失败'));
    }
});

export const login=asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    const {email,password}=req.body;
    const sql = `select id,email,password,username,introduct,iconUrl from user where email=? and password=?`;
    const db=await mysqlDb.execute(sql,[email,password]);
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

export const fileDown=asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    let datas = [['名字','邮箱','介绍']];
    const sqlStr = `select * from user`;
    const db=await mysqlDb.execute(sqlStr);
    if(db.code===code.successCode && db.data.length){
        db.data.forEach((item:userInfoType)=> datas.push([item.username,item.email,item.introduct]));
    }
    const options = {'!cols': [{wch: 20}, {wch: 20}, {wch: 20}]};
    const buffer = xlsx.build([{name:"Excel",data:datas}],options); //创建下载对象
    if(db.data.length>1000){
        res.status(200).json(sucessCallbackVal(code.failedCode,null,'下载数据量过大，不能超过1000',false));
    }
    if(buffer.byteLength){
        res.status(200).json(sucessCallbackVal(code.successCode,buffer,'成功',true));
    }
    else{
        res.status(500).json(sucessCallbackVal(code.failedCode,null,'下载失败',false));
    }
  
    /*第二
    res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `filename=user.xlsx`,
        'Content-Length': buffer.length
      });
      const excelPath=path.resolve(__dirname,'../public/template.xlsx');
     fs.writeFile(excelPath,buffer,(err)=>{
         if(!err){
            res.download(excelPath,'用户信息.xlsx',(err:ErrorResponse)=>{
                if(err){
                    res.status(err.statusCode).json(sucessCallbackVal(code.failedCode,err,'失败',false)); 
                }else{
                     fs.unlinkSync(excelPath);//删除模板
                }
            });
         }else{
             res.status(500).json(sucessCallbackVal(code.failedCode,err,'失败',false));
         }  
     });*/
});


