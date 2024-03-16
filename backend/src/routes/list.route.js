import express from 'express';
import ListController from '../controllers/List.controller.js';
import middlewareController from '../controllers/middleware.controller.js';


///api/listupdateList
const router = express.Router();
router.post('/add', middlewareController.verifyTokenAndAdminAuthPOST, ListController.addList);
router.put('/update/:id', ListController.updateList);
router.delete('/delete/:id', ListController.deleteList);
router.get('/stored',ListController.getAllList);

export default router;
