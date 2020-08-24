import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler'
import mysqlDb from '../config/db'
import {code,sucessCallbackVal} from '../utils/variable'
import {menuAccessType} from '../interface'
import {sendResponse} from '../middleware/response'
import tools from '../utils'
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
        let result=await this.findMenuList();
        if(result.data.length){
            result.data=result.data.map((item:menuAccessType)=>Object.assign({},item,{createTime:new Date(item.createTime).getTime()}));
        }
        sendResponse(res,200,sucessCallbackVal(code.successCode,result.data,'成功',true));
    })
    /**
     * @description 新增和修改操作
     */
    public getMenuOption=asyncHandler(async(req: Request, res: Response)=>{
        const {title, url, icon,id} = req.body;
        const {sqlKey,sqlVal,sqlObj} =tools.sqlDeal(req.body);
        let result=null;
        if(id){  //修改
            if(!title && !url && !icon){
                return sendResponse(res,400,sucessCallbackVal(code.failedCode,null,'至少修改一项',false));
            }
            const  upDate= `update access set ${sqlKey} where id=?`;
            result=await mysqlDb.execute(upDate,[...sqlVal,id]);
        }else{   //新增
            if(!title || !url){
               return sendResponse(res,400,sucessCallbackVal(code.failedCode,null,'title,url必传',false));
            }
            const  add=`insert into access set ?`;
            result=await mysqlDb.execute(add,sqlObj);
        }
         sendResponse(res,200,sucessCallbackVal(code.successCode,null,'成功',true));
    })
    public deleteGetMenu=asyncHandler(async(req: Request, res: Response)=>{
        const {id} = req.body;
        if(!id){
            return sendResponse(res,400,sucessCallbackVal(code.failedCode,null,'id必须',false));
        }
        const sqlStr = `delete from access where id=?`;
        await mysqlDb.execute(sqlStr,[id]);
        sendResponse(res,200,sucessCallbackVal(code.successCode,null,'删除成功',true));
    })
}
export default new AccessModule;
