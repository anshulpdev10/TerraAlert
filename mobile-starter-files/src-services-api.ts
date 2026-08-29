/**
 * API Client Configuration
 * 
 * This file sets up Axios for making HTTP requests to the backend API.
 * Copy this to: mobile/src/services/api.ts
 */

import axios from 'axios';
import {API_BASE_URL} from '@env';

const apiClient = axios.create({
  baseURL: API_BASE_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  async config => {
    // TODO: Get token from auth context/storage
    // const token = await getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.status, error.response.data);
      
      if (error.response.status === 401) {
        // Handle unauthorized - logout user
        // TODO: Trigger logout
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      // Error in request setup
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  },
);

export default apiClient;
