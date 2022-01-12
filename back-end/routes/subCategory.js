import { Router } from 'express';
const router = Router();
import { getAllSubCategory, createSubCategory, getNumberComment, adminGetAllSubCategory, adminUpdateSubCategoryImg, deleteSubCategory, getSearchSubCategory, reportSubCategory, GetAllReportSubCategory, ApprouvedReportSubCategory, DeleteReportSubCategory} from '../controllers/subCategory.js';
import { auth } from '../middleware/auth.js';
import multer from '../middleware/multer-config.js';
import { authAdmin } from '../middleware/authAdmin.js';


router.post('/createSubCategory', auth, multer, createSubCategory);
router.get('/getAllSubCategory', getAllSubCategory);
router.get('/getNumberComment', getNumberComment);
router.get('/adminGetAllSubCategory', adminGetAllSubCategory);
router.post('/adminGetAllSubCategory',authAdmin, multer ,adminUpdateSubCategoryImg);
router.post('/deleteSubCategory', auth, deleteSubCategory);
router.post('/deleteSubCategory', auth, getSearchSubCategory);
router.post('/reportSubCategory', auth, reportSubCategory);
router.get('/GetAllReportSubCategory', GetAllReportSubCategory);
router.post('/approuvedReportSubCategory', authAdmin, ApprouvedReportSubCategory);
router.post('/deleteReportSubCategory', authAdmin, DeleteReportSubCategory);

export default router;