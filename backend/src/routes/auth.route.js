import express from 'express';
import authController from '../controllers/auth.controller.js';
import middlewareController from '../controllers/middleware.controller.js';

const router = express.Router();
//Sign In
router.post('/register', authController.signUp);
//Sign Up
router.post('/login', authController.signIn);

//change password
router.post('/change-password', middlewareController.verifyToken, authController.changePass);

//Refresh
router.post('/refresh', authController.requestRefreshToken);

router.post('/signout', authController.signOut);

export default router;