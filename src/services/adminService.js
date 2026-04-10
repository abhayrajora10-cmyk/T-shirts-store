import apiClient from './apiClient';

export const adminService = {
  // Admin login
  loginAdmin: async (email, password) => {
    try {
      const response = await apiClient.post('/admin/login', {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Admin login error:', error);
      throw error.response?.data || error;
    }
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return null;
    }
  },

  // ========== PRODUCT MANAGEMENT ==========
  getAllProducts: async () => {
    try {
      const response = await apiClient.get('/admin/products');
      return response.data.products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await apiClient.post('/admin/products', productData);
      return response.data.product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error.response?.data || error;
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      const response = await apiClient.put(`/admin/products/${productId}`, productData);
      return response.data.product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error.response?.data || error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      await apiClient.delete(`/admin/products/${productId}`);
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error.response?.data || error;
    }
  },

  toggleProductActive: async (productId) => {
    try {
      const response = await apiClient.patch(`/admin/products/${productId}/toggle`);
      return response.data.product;
    } catch (error) {
      console.error('Error toggling product:', error);
      throw error.response?.data || error;
    }
  },

  // ========== USER MANAGEMENT ==========
  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/admin/users');
      return response.data.users || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await apiClient.get(`/admin/users/${userId}`);
      return response.data.user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  toggleUserActive: async (userId) => {
    try {
      const response = await apiClient.patch(`/admin/users/${userId}/toggle`);
      return response.data.user;
    } catch (error) {
      console.error('Error toggling user:', error);
      throw error.response?.data || error;
    }
  },

  // ========== ORDER MANAGEMENT ==========
  getAllOrders: async () => {
    try {
      const response = await apiClient.get('/admin/orders');
      return response.data.orders || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  updateOrderStatus: async (orderId, status, paymentStatus) => {
    try {
      const response = await apiClient.put(`/admin/orders/${orderId}`, {
        status,
        paymentStatus,
      });
      return response.data.order;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error.response?.data || error;
    }
  },

  // ========== ADMIN MANAGEMENT ==========
  getAllAdmins: async () => {
    try {
      const response = await apiClient.get('/admin/admins');
      return response.data.admins || [];
    } catch (error) {
      console.error('Error fetching admins:', error);
      return [];
    }
  },

  createAdmin: async (adminData) => {
    try {
      const response = await apiClient.post('/admin/admins', adminData);
      return response.data.admin;
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error.response?.data || error;
    }
  },

  updateAdmin: async (adminId, adminData) => {
    try {
      const response = await apiClient.put(`/admin/admins/${adminId}`, adminData);
      return response.data.admin;
    } catch (error) {
      console.error('Error updating admin:', error);
      throw error.response?.data || error;
    }
  },

  // Logout
  logoutAdmin: () => {
    localStorage.removeItem('adminToken');
  },

  // Check if admin is logged in
  isAdminLoggedIn: () => {
    return !!localStorage.getItem('adminToken');
  },

  // Get admin token
  getAdminToken: () => {
    return localStorage.getItem('adminToken');
  },
};
