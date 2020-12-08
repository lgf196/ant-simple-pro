import { resquest } from '../http'
export const login = (data) => resquest('post',`/login`,data);
export const xlsxFileDown = (data) => resquest('get',`/fileDown`,data);
export const getUserList =(data) => resquest('get',`/user/find`,data,'blob');
export const getAccessMenuList = () => resquest('get',`/menu/getCurrentUserMenuAuthTree`);
export const getAccessMenu = (data) => resquest('get', `/menu/getCurrentList`,data);
export const getAccesstOption = (data) => resquest('post',`/menu/getCurrentOption`,data);
export const delteAccesstOption = (data) => resquest('post',`/menu/delete`,data);
export const userList = (data) => resquest('get',`/user/find`,data);
export const userOption = (data) => resquest('post',`/user/edit`,data);
export const userInfo = () => resquest('get',`/user/info`);
