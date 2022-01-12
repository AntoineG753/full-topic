import { Router } from 'express';
const router = Router();
import { signup, login, updateAccount, deleteAccount, getAccount, allAccount, connectAuth, updateImgAccount, adminUpdateAccount, getSearchAccount } from '../controllers/user.js';
import { check } from 'express-validator';
import { auth } from '../middleware/auth.js';
import multer from '../middleware/multer-config.js';
import { authAdmin } from '../middleware/authAdmin.js';







router.post('/signup', [check('email', 'Veuillez entrer une adresse email valide')
    .isEmail(),
    check('pseudo', 'Le pseudo doit contenir entre 4 et 20 caractères, les caractères spéciaux ne sont pas autorisés !')
    .matches(/^[a-zA-Z0-9]+$/)
    .isLength({ min: 4, max: 20 }),
    check('password', 'Le mot de passe doit contenir entre 8 et 15 caractéres dont une minuscule, une majuscule et un chiffre')
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9&_\.-]{8,15})$/)], signup);
router.post('/login', login);
router.get('/getAccount', auth, getAccount);
router.get('/allAccount', allAccount);
router.put('/updateAccount', auth, [check('email', 'Veuillez entrer une adresse email valide')
.isEmail(),
check('pseudo', 'Le pseudo doit contenir entre 4 et 20 caractères, les caractères spéciaux ne sont pas autorisés !')
.matches(/^[a-zA-Z0-9]+$/)
.isLength({ min: 4, max: 20 }),
check('password', 'Le mot de passe doit contenir entre 8 et 15 caractéres dont une minuscule, une majuscule et un chiffre')
.matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9&_\.-]{8,15})$/)] ,updateAccount);
router.put('/updateImgAccount', auth, multer, updateImgAccount);
router.post('/deleteAccount',auth, deleteAccount);
router.post('/adminUpdateAccount', authAdmin, multer, adminUpdateAccount);
router.post('/getSearchAccount', auth, getSearchAccount);
router.post('/connectAuth', connectAuth);



export default router;
