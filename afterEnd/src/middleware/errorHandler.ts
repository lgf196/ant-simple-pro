import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import ErrorResponse from '../utils/errorResponse';
import {code} from '../utils/variable'
const errorHandler: ErrorRequestHandler = (
  error: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  console.log(error.stack);
  res.status(error.statusCode ?? code.serverErrorCode).json({
    success: false,
    // error: error.message ?? 'Server Error',
    code:error.statusCode ?? code.serverErrorCode,
    mes:error.message ?? 'Server Error'
  });
};

export default errorHandler;