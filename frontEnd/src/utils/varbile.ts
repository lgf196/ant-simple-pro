export enum requestCode {
    failedCode=111,         //失败
    successCode='000',        //成功
    noLoginTokenCode=202,   //无token
    noRouterCode=404,        //路劲找不到
    serverErrorCode=500      //服务错误
};

/**
 * @description token的判断
 * @return {Boolean} 
 */
export const isToken=():boolean=> localStorage.getItem('token')?true:false;
