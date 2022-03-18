import mysql from 'mysql'
import {code,sucessCallbackVal} from '../utils/variable'
import {dbType} from '../interface'
class mysqlDb<T> {   //创建数据库class
    public connect(){
      let connection= mysql.createPool({  //连接mysql配置
            // host     : 'localhost',
            host     : '',
            user     : 'root',
            password : 'lgf196',
            database : 'ant-simple-pro'
        });
        return connection;
    }
    public  execute(sql:string,params?:any[] | object):Promise<dbType>{  //处理查询的逻辑
        return new Promise((resolve,reject)=>{
            this.connect().getConnection((err, connection)=> {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql,params, (err, rows) => {
                      err? reject(err):resolve(sucessCallbackVal(code.successCode,rows));
                      //connection.release();    // 结束会话
                      connection.destroy();  
                    })
                  }
            });
        })
    }
}
export default new mysqlDb();

