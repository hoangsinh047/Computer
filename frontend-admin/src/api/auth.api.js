import { axiosClient } from './axiosClient';
import { API_ENDPOINTS } from '../utils/constants';

export const authApi = {
  login: async (body) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.auth.login, body);
    return data;
  },
  register: async (body) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.auth.register, body);
    return data;
  },
  forgotPassword: async (body) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.auth.forgotPassword, body);
    return data;
  },
  resetPassword: async (body) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.auth.resetPassword, body);
    return data;
  },
  me: async () => {
    const { data } = await axiosClient.get(API_ENDPOINTS.auth.me);
    return data;
  },
};
