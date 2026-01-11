export const APP_NAME = 'LINH KIỆN & PHỤ KIỆN MÁY TÍNH - Admin';

export const STORAGE_KEYS = {
  token: import.meta.env.VITE_TOKEN_STORAGE_KEY ?? 'admin_access_token',
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

// Tập trung khai báo endpoint để đổi backend dễ hơn.
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
    me: '/api/auth/me',
  },
  products: '/api/products',
  categories: '/api/categories',
  brands: '/api/brands',
  orders: '/api/orders',
  users: '/api/users',
};
