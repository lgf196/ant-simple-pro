import ErrorResponse from '../utils/errorResponse';

declare global {
    namespace Express {
        interface Request{
            decoded:string | object | undefined
        }
    }
  }