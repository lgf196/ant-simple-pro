import { Router } from 'express';
import {userInfo,login,fileDown} from '../controllers/userController'
import authorToken from '../middleware/author'
const router = Router();

router.get('/user',authorToken.verifyToken,userInfo);
router.get('/fileDown',authorToken.verifyToken,fileDown);
router.post('/login',login);

export default router