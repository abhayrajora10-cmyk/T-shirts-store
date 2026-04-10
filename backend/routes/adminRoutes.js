import express from 'express';
import {
  adminLogin,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductActive,
  getAllProductsAdmin,
  getAllUsers,
  getUserById,
  toggleUserActive,
  getAllOrders,
  updateOrderStatus,
  createAdmin,
  getAllAdmins,
  updateAdmin,
  getDashboardStats,
} from '../controllers/adminController.js';
import { adminProtect, adminAuthorize } from '../middleware/auth.js';
import { validateProduct } from '../middleware/validation.js';

const router = express.Router();

// Admin Authentication
router.post('/login', adminLogin);

// Dashboard
router.get('/dashboard/stats', adminProtect, getDashboardStats);

// ==================== PRODUCT MANAGEMENT ====================
router.get('/products', adminProtect, adminAuthorize('manageProducts'), getAllProductsAdmin);
router.post('/products', adminProtect, adminAuthorize('manageProducts'), validateProduct, createProduct);
router.put('/products/:id', adminProtect, adminAuthorize('manageProducts'), updateProduct);
router.delete('/products/:id', adminProtect, adminAuthorize('manageProducts'), deleteProduct);
router.patch('/products/:id/toggle', adminProtect, adminAuthorize('manageProducts'), toggleProductActive);

// ==================== USER MANAGEMENT ====================
router.get('/users', adminProtect, adminAuthorize('manageUsers'), getAllUsers);
router.get('/users/:id', adminProtect, adminAuthorize('manageUsers'), getUserById);
router.patch('/users/:id/toggle', adminProtect, adminAuthorize('manageUsers'), toggleUserActive);

// ==================== ORDER MANAGEMENT ====================
router.get('/orders', adminProtect, adminAuthorize('manageOrders'), getAllOrders);
router.put('/orders/:id', adminProtect, adminAuthorize('manageOrders'), updateOrderStatus);

// ==================== ADMIN MANAGEMENT ====================
router.post('/admins', adminProtect, adminAuthorize('manageAdmins'), createAdmin);
router.get('/admins', adminProtect, adminAuthorize('manageAdmins'), getAllAdmins);
router.put('/admins/:id', adminProtect, adminAuthorize('manageAdmins'), updateAdmin);

export default router;
