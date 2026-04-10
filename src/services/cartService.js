import apiClient from './apiClient';

export const cartService = {
  // Get user cart
  getCart: async () => {
    try {
      const response = await apiClient.get('/cart');
      return response.data.cart;
    } catch (error) {
      console.error('Error fetching cart:', error);
      if (error.response?.status === 401) {
        throw {
          status: 401,
          message: error.response?.data?.message || 'Unauthorized',
        };
      }
      return null;
    }
  },

  // Add item to cart
  addToCart: async (productId, quantity, size, color) => {
    try {
      const response = await apiClient.post('/cart/add', {
        productId,
        quantity,
        size,
        color,
      });
      return response.data.cart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error.response?.data || error;
    }
  },

  // Update cart item
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await apiClient.put('/cart/update', {
        itemId,
        quantity,
      });
      return response.data.cart;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error.response?.data || error;
    }
  },

  // Remove from cart
  removeFromCart: async (itemId) => {
    try {
      const response = await apiClient.delete('/cart/remove', {
        data: { itemId },
      });
      return response.data.cart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error.response?.data || error;
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      const response = await apiClient.delete('/cart/clear');
      return response.data.cart;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error.response?.data || error;
    }
  },
};