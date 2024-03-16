import express from 'express';
import addressController from '../controllers/adress.controller.js';
import middlewareController from '../controllers/middleware.controller.js';


const router = express.Router();
//create
router.post('/', middlewareController.verifyToken, addressController.createAddress);
//update
router.put('/:id', middlewareController.verifyToken, addressController.updateAddress);
//get data
router.get('/', middlewareController.verifyToken, addressController.getAddressByUser);
//Refresh
router.delete('/:id', middlewareController.verifyToken, addressController.deleteAddress);

export default router;