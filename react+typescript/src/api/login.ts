import { resquest } from '../http';
import { menuAccessType, pagationType, getUserType } from '@/interfaces';
type loginType = {
  email: string;
  password: string;
};
export type userListType = Partial<Pick<getUserType, 'username'>>;

export const login = <T extends loginType>(data: T): Promise<responseData> =>
  resquest('post', `/login`, data);

export const xlsxFileDown = <T>(data?: T): Promise<any> => resquest('get', `/fileDown`, data);

export const getUserList = <T>(data?: T): Promise<any> =>
  resquest('get', `/user/find`, data, 'blob');

export const getAccessMenuList = <T>(data?: T): Promise<responseData> =>
  resquest('get', `/menu/getCurrentUserMenuAuthTree`);

export const getAccessMenu = <T extends pagationType>(data: T): Promise<responseData> =>
  resquest('get', `/menu/getCurrentList`, data);

export const getAccesstOption = (data: Partial<menuAccessType>): Promise<responseData> =>
  resquest('post', `/menu/getCurrentOption`, data);

export const delteAccesstOption = (data: Pick<menuAccessType, 'id'>): Promise<responseData> =>
  resquest('post', `/menu/delete`, data);

export const userList = <T extends userListType>(data?: T): Promise<responseData> =>
  resquest('get', `/user/find`, data);

export const userOption = (data?: Partial<getUserType>): Promise<responseData> =>
  resquest('post', `/user/edit`, data);

export const userInfo = (): Promise<responseData> => resquest('get', `/user/info`);
