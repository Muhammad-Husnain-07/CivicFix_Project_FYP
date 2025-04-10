import {getData, removeData, storeData} from '@/hooks/useLocalStorage';
import axios from 'axios';
import {URL} from './baseURL';

// Automatically determine the server IP
const BASE_URL = URL; // Default port is 8000, adjust if needed

// Create Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to the header
apiClient.interceptors.request.use(async config => {
  if (config.url === '/token/refresh') {
    return config;
  }
  let token = await getData('access_token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

// Request interceptor
const refreshToken = async error => {
  if (error.response?.status === 401 && error.config && !error.config.__isRetryRequest) {
    error.config.__isRetryRequest = true;
    try {
      const refreshToken = await getData('refresh_token');
      const response = await apiClient.post('/token/refresh', {
        data: {refresh_token: refreshToken},
      });
      storeData('access_token', response.data.access_token);
      storeData('refresh_token', response.data.refresh_token);
      error.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
      return apiClient(error.config);
    } catch (error) {
      if (error.response?.status === 500) {
        removeData();
      }
      console.log('Refresh token failed:', error?.message);
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

apiClient.interceptors.request.use(config => {
  console.log(`Requesting [${config.method.toUpperCase()}] ${config.url}`);
  return config;
}, refreshToken);

// Response interceptor
apiClient.interceptors.response.use(
  response => {
    return response.data; // Simplify response handling
  },
  error => {
    console.log('Response Error:', error.message);
    if (error.response) {
      console.log('Error Response Data:', error.response.data);
    }
    return refreshToken(error);
  },
);

export default apiClient;
