import { Router } from 'express';
import {userInfo,login,fileDown,upload,userEdit} from '../controllers/userController'
import authorToken from '../middleware/author'
import multer from 'multer'
const router = Router();
router.post('/login',login);
router.get('/fileDown',authorToken.verifyToken,fileDown);
router.post('/fileUpload',multer({ dest: './src/public/'}).single('file'),upload);
router.get('/user/find',authorToken.verifyToken,userInfo);
router.post('/user/edit',userEdit);
export default router