import express from 'express';
import {userRouter,listRouter} from './routes'
import errorHandler from './middleware/errorHandler'
import error404 from './middleware/404'
const app = express();

// app.get('/', (request, response) => {
//   const user = {
//     name: 'Manel do Mock',
//     email: 'maneldomock@email.com',
//     gender: 'masculino'
//   }

//   response.json(user);
// });

app.use('/api',[userRouter,listRouter]);
app.use(error404);
app.use(errorHandler);

app.listen(3000,()=>{
  console.log('111', 111)
});