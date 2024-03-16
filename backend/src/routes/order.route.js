import express from 'express';
import middlewareController from '../controllers/middleware.controller.js';
import orderApi from '../controllers/order.controller.js';

///api/danhmuc
const router = express.Router();
router.get('/',middlewareController.verifyToken, orderApi.get);
router.get('/me',middlewareController.verifyToken, orderApi.getMe);
router.post('/',middlewareController.verifyToken, orderApi.add);
router.put('/:id',middlewareController.verifyTokenAndAdminAuth, orderApi.update);

export default router;
