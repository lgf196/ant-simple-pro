import {requestCode} from '@/utils/varbile'
export type statusCode=requestCode;
export interface menuAccessType {  //权限列表
    id:number;
    pid:number;
    title:string;
    icon:string;
    url:string;
    createTime:Date;
    children?:menuAccessType[]
}
export interface layoutProps {
  collapsed:boolean
}

export interface tagPropsType {
  name:string;
  path:string;
  title:string;
  [parms:string]:any
}