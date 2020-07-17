import { Response } from 'express';
import {sucessCallbackValType} from '../interface'

export const sendResponse = (res: Response,statusCode:number,parmas:sucessCallbackValType) => {
    res.status(statusCode).json(parmas);
};