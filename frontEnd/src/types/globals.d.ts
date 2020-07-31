interface Window { //给这个属性申明一下
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

interface responseData {  //定义全局的response相应数据模型
    code:statusCode,
    data:any[] | any,
    mes?:string | Error;
    success?:boolean
} 

interface reduceStoreType {  //所有reduce模块中的store类型
    user:userStore //对应userReduce
}

