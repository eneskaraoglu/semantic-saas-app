import axios from 'axios';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API methods
const authApi = {
  login: (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },
  
  register: (data: {
    companyName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    return api.post('/auth/register', data);
  },
  
  getCurrentUser: () => {
    return api.get('/auth/me');
  },
};

// User API methods
const userApi = {
  getUsers: () => {
    return api.get('/users');
  },
  
  getUserById: (id: number) => {
    return api.get(`/users/${id}`);
  },
  
  createUser: (data: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    roles: string[];
  }) => {
    return api.post('/users', data);
  },
  
  updateUser: (id: number, data: any) => {
    return api.put(`/users/${id}`, data);
  },
  
  deleteUser: (id: number) => {
    return api.delete(`/users/${id}`);
  },
};

export { api, authApi, userApi };
