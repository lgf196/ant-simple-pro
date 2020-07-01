import {resquest} from '../http'

type loginType={
    email:string;
    password:string
}
export  const login=<T extends loginType>(data:T):Promise<any>=>resquest('post',`/login`,{data});  