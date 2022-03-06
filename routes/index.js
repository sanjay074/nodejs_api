import express  from "express";
const router = express.Router();
import registerController from '../controllers/auth/registerController' ;
import loginController from '../controllers/auth/loginController';
import userController from '../controllers/auth/userController';
import productController from '../controllers/productController';
import auth from '../middlewares/auth';
router.post('/register' ,registerController.register);
router.post('/login' ,loginController.login);
router.get('/userlist',auth ,userController.userlist);
router.get('/userdetails/:id',auth ,userController.userdetails);
router.post('/uploadProduct',auth ,productController.uploadProduct);
router.get('/productlist',auth ,productController.productlist);

export default router;