import { Router } from 'express';
const router = Router();
import { GetSearchSubCategory } from '../controllers/search.js';
import { auth } from '../middleware/auth.js';
import multer from '../middleware/multer-config.js';


router.post('/getSearchSubCategory',auth ,GetSearchSubCategory);


export default router;