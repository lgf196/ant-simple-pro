import ErrorResponse from '../utils/errorResponse';
declare global {
    interface decodedType<T=unknown> {
        id:number;
        [k:string]:T
    }
    namespace Express {
        interface Request{
            decoded:decodedType
        }
    }
  }