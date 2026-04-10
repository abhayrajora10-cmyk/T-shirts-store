import apiClient from './apiClient';

const parseJwtPayload = (token) => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

const isTokenExpired = (token) => {
  const payload = parseJwtPayload(token);
  if (!payload?.exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now;
};

export const authService = {
  // User signup
  signup: async (username, email, password) => {
    try {
      const response = await apiClient.post('/auth/signup', {
        username,
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error.response?.data || error;
    }
  },

  // User login
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error.response?.data || error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data.user;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/auth/profile', profileData);
      return response.data.user;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error.response?.data || error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  },

  // Check if user is logged in
  isLoggedIn: () => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    if (isTokenExpired(token)) {
      localStorage.removeItem('authToken');
      return false;
    }

    return true;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('authToken');
  },
};