import { Router } from 'express';
import mysqlDb from '../config/db'
import {code,sucessCallbackVal} from '../utils/variable'
const router = Router();
router.get('/user',async (req, res,next)=>{
    const sqlStr = `select * from a_user`;
    const db=await mysqlDb.execute(sqlStr);
    if(db.code===code.successCode){
        res.send(sucessCallbackVal(code.successCode,db.data,'成功'));
    }else{
        res.send(sucessCallbackVal(code.failedCode,db.data,'失败'));
    }
});
export default router