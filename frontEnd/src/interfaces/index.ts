import {requestCode} from '@/utils/varbile'
import {buttonProps} from '@/components/button'
export type statusCode=requestCode;
export type sortType='desc' | 'asc';
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
  name?:string;
  path: string;
  title:string;
  [params:string]:any
}

export type grounpProps={
    title:string,
    func?:Function,
    icon:React.ReactNode
}
export interface LayoutTableProps {
    btnGrounp?:(buttonProps & Pick<grounpProps,'func'>)[],
    iconGrounp?:grounpProps[],
    tableTitle?:string
}

export interface pagaTionBackData {
  list:menuAccessType[],
  total:number
}
export interface pagationType {
  page?:number;
  size?:number;
  sort?:sortType;
}