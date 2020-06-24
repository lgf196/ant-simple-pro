import { Router } from 'express';
const router = Router();
router.get('/list',(req, res,next)=>{
    console.log('list-router', '我是list路由');
    res.send('我是list路由')
   
});
export default router