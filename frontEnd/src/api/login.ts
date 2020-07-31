import {resquest} from '../http'
type loginType={
    email:string;
    password:string
}
export  const login=<T extends loginType>(data:T):Promise<any>=>resquest('post',`/login`,{data});  
export  const xlsxFileDown=<T>(data?:T):Promise<any>=>resquest('get',`/fileDown`,data);  
export  const getUserList=<T>(data?:T):Promise<any>=>resquest('get',`/user`,data,'blod');  
export  const getAccessMenuList=<T>(data?:T):Promise<responseData>=>resquest('get',`/menu/getCurrentUserMenuAuthTree`);  



