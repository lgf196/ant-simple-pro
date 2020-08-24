import { Router } from 'express';
import  AccessModule from '../controllers/accessController'

const router = Router();
router.get('/menu/getCurrentUserMenuAuthTree',AccessModule.getCurrentUserMenuAuthTree);
router.get('/menu/getCurrentList',AccessModule.getMenuList);
router.post('/menu/getCurrentOption',AccessModule.getMenuOption);
router.post('/menu/delete',AccessModule.deleteGetMenu);

export default router