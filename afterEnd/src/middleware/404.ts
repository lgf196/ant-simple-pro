import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/errorResponse';
const noFindRouter=(req:Request,res:Response,next:NextFunction)=>{
    var err = new ErrorResponse('Not Found router',404);
    next(err);  //必须加，否则后面的中间件不能执行，终止了
}
export default noFindRouter;