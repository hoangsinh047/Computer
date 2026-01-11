import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { getToken } from '../utils/auth';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// NOTE: response interceptor 401/403 tốt nhất nên xử lý ở AuthContext (logout + navigate).
// Ở đây giữ tối giản để không tạo vòng phụ thuộc router.

