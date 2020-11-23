/**
 * @description node -xlxs定义声明
 */
export type paramsType={
    name:string;
    data:any[]
}
declare module 'node-xlsx' {
    export function build(x:paramsType[],option?:object):Buffer;
}

