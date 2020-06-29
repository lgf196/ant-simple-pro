import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import asyncHandler from '../middleware/asyncHandler'
import ErrorResponse from '../utils/errorResponse';

class SetToken<T> {   
    public screenKey:jwt.Secret;
    public expiresIn:number | undefined;  //有效时间

    constructor(){
       this.screenKey='lgf';
       this.expiresIn=60;
    };

    public createToken(tokenJson:string | object){
       return jwt.sign(tokenJson, this.screenKey, {expiresIn:this.expiresIn});
    }
    public verifyToken=asyncHandler(async (req: any, res: Response, next: NextFunction)=>{ //判断是否含有token
           let token;
           if(req.headers.accesstoken){ //获取前端请求头发送过来的AccessToken
                token = req.headers.accesstoken;
           }else if(req.cookies.token){
                token = req.cookies.token;
           }
           if (!token) {
            return next(new ErrorResponse('没有权限', 401));
          }
          try {
            /*const decoded = jwt.verify(token, this.screenKey);
            req.decoded = decoded; //将解码信息储存于req中方便其他路由使用*/
            jwt.verify(token, this.screenKey,{algorithms:['RS256']},(err,decoded)=>{
              if(err){
                 return next(
                  new ErrorResponse('没有权限', 401)
                );
              }
              console.log('decoded', decoded)
              req.decoded = decoded;
            })
            next();
          } catch (err) {
            return next(
              new ErrorResponse('没有权限', 401)
            );
          }
        })
}
export default new SetToken();