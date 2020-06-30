import { Router } from 'express';
import {userInfo,login} from '../controllers/userController'
import authorToken from '../middleware/author'
const router = Router();

router.get('/user',authorToken.verifyToken,userInfo);
router.post('/login',login);

export default router