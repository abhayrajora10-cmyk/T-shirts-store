import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  addReview,
  getFeaturedProducts,
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.post('/:id/review', protect, addReview);

export default router;
