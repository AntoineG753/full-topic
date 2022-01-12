import { Router } from 'express';
const router = Router();
import {GetSubCategory, GetAllMessage, CreateMessage, DeleteMessage, ReportMessage, GetAllReportMessage, ApprouvedReportMessage, DeleteReportMessage, LikeSubCategory, DisLikeSubCategory } from '../controllers/chatRoom.js';
import { auth } from '../middleware/auth.js';
import multer from '../middleware/multer-config.js';
import { authAdmin } from '../middleware/authAdmin.js';

router.get('/getAllMessage', GetAllMessage);
router.get('/getSubCategory', GetSubCategory);
router.post('/createMessage', auth, multer, CreateMessage);
router.post('/deleteMessage', auth, DeleteMessage);
router.post('/ReportMessage', auth, ReportMessage);
router.get('/getAllReportMessage', authAdmin, GetAllReportMessage);
router.post('/approuvedReportMessage', authAdmin, ApprouvedReportMessage);
router.post('/deleteReportMessage', authAdmin, DeleteReportMessage);
router.post('/LikeSubCategory', auth, LikeSubCategory);
router.post('/DisLikeSubCategory', auth, DisLikeSubCategory);


export default router;