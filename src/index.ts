import express from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import {userRouter,accseeRouter} from './routes'
import errorHandler from './middleware/errorHandler'
import error404 from './middleware/404'
import path from 'path';
const app = express();
app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Headers", "X-Requested-With,accesstoken");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  next();  
}); 
app.use(express.static(path.join(__dirname, 'public'))); //全局设置静态文件目录路劲
app.use(morgan('dev')); 
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use('/api',[userRouter,accseeRouter]);
app.use(error404);
app.use(errorHandler);

app.listen(8080,()=>{
  console.log('服务启动成功:=>', new Date().toLocaleString())
});