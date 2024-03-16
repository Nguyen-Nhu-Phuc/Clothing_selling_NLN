import express from 'express';
import BrandController from '../controllers/Brand.controller.js';
import middlewareController from '../controllers/middleware.controller.js';

const router = express.Router();
///api/Brand
router.post('/add',BrandController.addBrand);
router.put('/update/:id',BrandController.updateBrand);
router.delete('/delete/:id', BrandController.deleteBrand);
router.get('/stored',BrandController.getAllBrand);

export default router;
