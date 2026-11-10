import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor: automatically append JWT token if stored
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401s and format standard error messages
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized on protected route, clean stale token
      if (window.location.pathname.startsWith('/admin')) {
        localStorage.removeItem('portfolio_admin_token');
        localStorage.removeItem('portfolio_admin_user');
      }
    }
    const message = error.response?.data?.message || error.message || 'API Communication Error';
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
