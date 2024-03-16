import express from 'express';
import Revenuecontroller from '../controllers/revenue.controller.js';
const router = express.Router();

router.post('/create', Revenuecontroller.createRevenue);
router.get('/getAll',Revenuecontroller.getAllRevenue)
export default router;