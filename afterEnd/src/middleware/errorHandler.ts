import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import ErrorResponse from '../utils/errorResponse';
const errorHandler: ErrorRequestHandler = (
  error: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  console.log(error.stack);
  res.status(error.statusCode ?? 500).json({
    success: false,
    // error: error.message ?? 'Server Error',
    code:error.statusCode,
    mes:error.message ?? 'Server Error'
  });
};

export default errorHandler;