import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('Missing required environment variable: VITE_API_BASE_URL');
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to all requests automatically
apiClient.interceptors.request.use((config) => {
  const isAdminRequest = config.url?.startsWith('/admin');
  const tokenKey = isAdminRequest ? 'adminToken' : 'authToken';
  const token = localStorage.getItem(tokenKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token but let route-level logic handle navigation.
      const isAdminRequest = error.config?.url?.startsWith('/admin');
      const tokenKey = isAdminRequest ? 'adminToken' : 'authToken';
      localStorage.removeItem(tokenKey);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
