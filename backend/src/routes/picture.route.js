import express from 'express';
import ProductController from '../controllers/picture.controller.js';
import middlewareController from '../controllers/middleware.controller.js';
//api/picture
const router = express.Router();

router.post('/add', ProductController.addProduct);
router.put('/update/:id',middlewareController.verifyTokenAndAdminAuthPOST,ProductController.updateProduct);
router.delete('/delete/:id',middlewareController.verifyTokenAndAdminAuth, ProductController.deleteProduct);
router.get('/stored', ProductController.getAllProduct);
router.get('/product/:id', ProductController.getOneProduct);
router.put('/updateQuantity', ProductController.updatedQuantity);

export default router;
