import { Router } from 'express';
const router = Router();
import { getAllCategory, getSearchCategory, CreateCategory, UpdateCategory, deleteCategory} from '../controllers/category.js';
import { authAdmin } from '../middleware/authAdmin.js';
import multer from '../middleware/multer-config.js';

router.get('/getAllCategory', getAllCategory);
router.post('/getSearchCategory', getSearchCategory);
router.post('/createCategory',authAdmin, multer, CreateCategory);
router.post('/updateCategory',authAdmin, multer, UpdateCategory);
router.post('/deleteCategory',authAdmin, deleteCategory);


export default router;
