import mysql from 'mysql'
import {code,sucessCallbackVal} from '../utils/variable'
import {dbType} from '../interface'
class mysqlDb<T> {   //创建数据库class
    public connect(){
      let connection= mysql.createPool({  //连接mysql配置
            host     : 'localhost',
            user     : 'root',
            password : 'lgf196',
            database : 'ts_express'
        });
        return connection;
    }
    public  execute(sql:string):Promise<dbType>{  //处理查询的逻辑
        return new Promise((resolve,reject)=>{
            this.connect().getConnection((err, connection)=> {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, (err, rows) => {
                        console.log('rows', rows)
                      err? resolve(sucessCallbackVal(code.failedCode,err)):resolve(sucessCallbackVal(code.successCode,rows));
                      connection.release();    // 结束会话
                    })
                  }
            });
        })
    }
}
export default new mysqlDb();

