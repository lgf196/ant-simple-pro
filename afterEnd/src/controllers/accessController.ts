import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler'
import mysqlDb from '../config/db'
import {code,sucessCallbackVal} from '../utils/variable'
import {menuAccessType} from '../interface'
import {sendResponse} from '../middleware/response'
class AccessModule {
    public async findMenuList(){  //查询数据库
        const sqlStr = `select * from access`;
        return await mysqlDb.execute(sqlStr);
    }
    public  getCurrentUserMenuAuthTree=asyncHandler((async (req: Request, res: Response)=>{
        let result=await  this.findMenuList();
            const arr=result.data;
            let fatherElement:menuAccessType[]=arr.filter((item:menuAccessType)=>item.pid===0).map((item:menuAccessType)=>Object.assign({},item,{createTime:new Date(item.createTime).getTime()})); //取出父节点
            const renders=(fatherElement:menuAccessType[],arr:menuAccessType[])=>{
               return fatherElement.map((item:menuAccessType)=>{
                    const childElement:menuAccessType[]=arr.filter((items:menuAccessType)=>item.id===items.pid).map((item:menuAccessType)=>Object.assign({},item,{createTime:new Date(item.createTime).getTime()}));//子节点
                    if(childElement.length){
                        item.children=childElement;
                        renders(item.children,arr);
                    } 
               });
            }
            renders(fatherElement,arr);
            sendResponse(res,200,sucessCallbackVal(code.successCode,fatherElement,'成功',true));
    }))
    public getMenuList=asyncHandler(async(req: Request, res: Response)=>{
        let result=await  this.findMenuList();
        sendResponse(res,200,sucessCallbackVal(code.successCode,result.data,'成功',true));
    })
}
export default new AccessModule;
