import { Router } from 'express';
import  AccessModule from '../controllers/accessController'

const router = Router();
router.get('/menu/getCurrentUserMenuAuthTree',AccessModule.getCurrentUserMenuAuthTree);
router.get('/menu/getCurrentList',AccessModule.getMenuList);

export default router