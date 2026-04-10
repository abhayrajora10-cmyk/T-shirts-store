import apiClient from './apiClient';

export const productService = {
  // Get all products with filters
  getAllProducts: async (filters = {}) => {
    try {
      const response = await apiClient.get('/products', { params: filters });
      return response.data.products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data.product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/products/category/${category}`);
      return response.data.products || [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  // Get featured products
  getFeaturedProducts: async () => {
    try {
      const response = await apiClient.get('/products/featured');
      return response.data.products || [];
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  },

  // Add review to product
  addReview: async (productId, rating, comment) => {
    try {
      const response = await apiClient.post(`/products/${productId}/review`, {
        rating,
        comment,
      });
      return response.data.product;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },
};
