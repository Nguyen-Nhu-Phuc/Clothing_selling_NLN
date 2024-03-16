import express from 'express';
import CartController from '../controllers/Cart.controller.js';
import middlewareController from '../controllers/middleware.controller.js';

///api/cart
const router = express.Router();

router.post("/add/:id", middlewareController.verifyTokenPOST, CartController.addCart)
router.put("/update/:id", middlewareController.verifyTokenPOST, CartController.updatedQuantity)
router.get("/show/:id", middlewareController.verifyToken, CartController.getAllCart)
router.delete("/delete/:id", middlewareController.verifyToken, CartController.deleteProductInCart)
router.post("/oder/:id", CartController.Oder)
export default router;
