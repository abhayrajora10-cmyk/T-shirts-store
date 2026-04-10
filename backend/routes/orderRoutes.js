import express from 'express';
import { protect } from '../middleware/auth.js';
import { checkout, getMyOrders, getMyOrderById } from '../controllers/orderController.js';

const router = express.Router();

router.post('/checkout', protect, checkout);
router.get('/my', protect, getMyOrders);
router.get('/:id', protect, getMyOrderById);

export default router;
