import apiClient from './apiClient';

export const orderService = {
  checkout: async (payload = {}) => {
    try {
      const response = await apiClient.post('/orders/checkout', payload);
      return response.data.order;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error.response?.data || error;
    }
  },

  getMyOrderById: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data.order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error.response?.data || error;
    }
  },
};
