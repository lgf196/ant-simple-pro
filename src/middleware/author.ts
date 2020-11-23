import jwt, { VerifyCallback } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middleware/asyncHandler'
import ErrorResponse from '../utils/errorResponse';
import {code} from '../utils/variable'
class SetToken<T> {
  public screenKey: jwt.Secret;
  public expiresIn: number | undefined;  //有效时间

  constructor() {
    this.screenKey = 'lgf';
    this.expiresIn = 36000;
  };

  public createToken(tokenJson: string | object) {
    return jwt.sign(tokenJson, this.screenKey, { expiresIn: this.expiresIn });
  }
  public verifyToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => { //判断是否含有token
    let token;
    if (req.headers.accesstoken) { //获取前端请求头发送过来的AccessToken
      token = req.headers.accesstoken;
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return next(new ErrorResponse('没有权限', code.noLoginTokenCode));
    }
    const callback: VerifyCallback = (err, decoded) => {  //回调函数
      if (err) {
        return next(
          new ErrorResponse('没有权限', code.noLoginTokenCode)
        );
      }
      req.decoded = decoded as decodedType;
      next();
    }
    jwt.verify(token, this.screenKey, callback);
  })
}
export default new SetToken();