import express from 'express';
import userController from '../controllers/user.controller.js';
import middlewareController from '../controllers/middleware.controller.js';

const router = express.Router();
///api/user
router.get("/", middlewareController.verifyTokenAndAdminAuth, userController.getAllUser);
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);
router.get('/show', middlewareController.verifyToken, userController.getOneUser);
router.get('/me', middlewareController.verifyToken, userController.getMe);
router.put('/me', middlewareController.verifyToken, userController.updateMe);
export default router;