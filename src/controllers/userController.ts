import { Request, Response, NextFunction } from 'express';
import xlsx from 'node-xlsx';
import co from 'co';
import fs from 'fs'
import OSS,{PutObjectResult} from 'ali-oss'
import asyncHandler from '../middleware/asyncHandler'
import mysqlDb from '../config/db'
import author from '../middleware/author'
import tools from '../utils'
import {code,sucessCallbackVal} from '../utils/variable'
import {userInfoType} from '../interface'
import { sendResponse } from '../middleware/response'

export const userInfo=asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    const {username}=req.query;
    let sqlStr=null;
    if(username){  //如果含有username就进行模糊匹配
        sqlStr=`select id,email,username,introduct,iconUrl from user where username like '%${username}%'`;
    }else{
        sqlStr = `select id,email,username,introduct,iconUrl from user`;
    }
    const db=await mysqlDb.execute(sqlStr);
    sendResponse(res, 200, sucessCallbackVal(code.successCode, db.data, '成功', true));
});
/**
 * @description 查询用户的信息
 */

export const findUserInfo=asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    let result = null;
    const decoded=req.decoded; //更具token的信息来查找
    const sqlStr = `select id,email,username,introduct,iconUrl from user where id=?`;
    result = await mysqlDb.execute(sqlStr,  [decoded.id]);
    sendResponse(res, 200, sucessCallbackVal(code.successCode, result.data[0], '成功', true));
});
/**
 * @description 用户修改
 */
export const userEdit=asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    let { iconUrl, introduct, username, id } = req.body;
    const { sqlKey, sqlVal } = tools.sqlDeal(req.body);
    let result = null;
    if (id) { 
        if (!iconUrl && !introduct && !username) {
            return sendResponse(res, 400, sucessCallbackVal(code.failedCode, null, '至少修改一项', false));
        }
        const upDate = `update user set ${sqlKey} where id=?`;
        result = await mysqlDb.execute(upDate, [...sqlVal, id]);
        sendResponse(res, 200, sucessCallbackVal(code.successCode, null, '成功', true));
    }else{
        sendResponse(res, 400, sucessCallbackVal(code.failedCode, null, 'id必传', false));
    }
});
/**
 * @description 图片上传
 */
export const upload=asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    const client = new OSS({
            region: 'oss-cn-beijing',//填写你开通的oss
            accessKeyId: '',
            accessKeySecret:''
    });
    const alyOssBucketUrl='https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/'; //oss中的Bucket 域名
    const ali_oss = {
        bucket: 'antd-simple-pro',  //阿里云您的bucket
        endPoint: 'oss-cn-beijing.aliyuncs.com',     //填写你开通的oss地址
    }
    const filePath = './' + req.file.path;           //文件路径
    const temp = req.file.originalname.split('.');  
    const fileType = temp[temp.length - 1];           // 文件类型
    const fileName = Date.now() + '.' + fileType;     // 构建图片名
    fs.rename(filePath, fileName, (err) => {           // 图片重命名
        if (err) {
            sendResponse(res, 102, sucessCallbackVal(code.failedCode, err, '文件写入失败', false));  
        }else{
            const localFile = './' + fileName;         //本地临时储存
            const key = 'image/'+fileName;             //阿里云oss,文件存储管理里面的文件夹
            co(function* () {                          // 阿里云 上传文件 
                client.useBucket(ali_oss.bucket);
                const result = yield client.put(key, localFile);
                const imageSrc =alyOssBucketUrl+ (result as unknown as PutObjectResult).name;   //自定义使用域名访问图片，（别忘记把域名解析至oss）
                fs.unlinkSync(localFile);    // 上传之后删除本地文件
                sendResponse(res, 200, sucessCallbackVal(code.successCode,{url:imageSrc}, '成功',true));
            }).catch(function (err) {
                console.log(`err`, err)
                fs.unlinkSync(localFile);    // 上传之后删除本地文件
                sendResponse(res, 102, sucessCallbackVal(code.failedCode, err, '上传失败',false));
            });
        }
    });
});
/**
 * @description 登录
 */
export const login=asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    const {email,password}=req.body;
    const sql = `select * from user where email=? and password=?`;
    const db=await mysqlDb.execute(sql,[email,password]);
    if(db.code===code.successCode){
        if(db.data.length){
            const {id,email} =db.data[0]; //获取重要的属性
            const createToken=author.createToken({id,email}); //生成token
            res.status(200).json(sucessCallbackVal(code.successCode,createToken,'成功',true));
        }else{
            res.status(200).json(sucessCallbackVal(code.failedCode,'账号不存在，或者密码错误','账号不存在，或者密码错误',false));
        }
    }else{
        res.status(500).json(sucessCallbackVal(code.failedCode,'服务器出错','失败',false));
    }
});

/**
 * @description 文件下载
 */
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
});


