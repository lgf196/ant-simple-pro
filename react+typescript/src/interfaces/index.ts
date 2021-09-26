import { requestCode } from '@/utils/varbile'
import { buttonProps } from '@/components/button'

export type statusCode = requestCode;

export type sortType = 'desc' | 'asc';
export interface menuAccessType {  //权限列表
  id: number;
  pid: number | number[];
  title: string;
  icon: string;
  url: string;
  createTime: Date;
  children?: menuAccessType[]
}
export interface layoutProps {
  collapsed: boolean,
  width?: number,
  setIsMobileDrawer?: Function
}

export interface tagPropsType {
  name?: string;
  path: string;
  title: string;
  [params: string]: any
}

export type grounpProps = {
  title?: string,
  func?: Function,
  icon?: React.ReactNode,
  component?: React.ReactNode,
}
export interface LayoutTableProps {
  btnGrounp?: (buttonProps & Pick<grounpProps, 'func' | 'component'>)[],
  iconGrounp?: grounpProps[],
  tableTitle?: string,
}

export interface pagaTionBackData {
  list: menuAccessType[],
  total: number
}
export interface pagationType {
  page?: number;
  size?: number;
  sort?: sortType;
}
export interface getUserType<T = string> {
  id: number,
  email: string,
  username: string,
  introduct: string,
  iconUrl: T
}
export interface selectListType<T = number> {
  label:string;
  value:T
}
