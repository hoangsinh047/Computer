import { axiosClient } from './axiosClient';
import { API_ENDPOINTS } from '../utils/constants';

export const orderApi = {
  list: async (params) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.orders, { params });
    return data;
  },
  getById: async (id) => {
    const { data } = await axiosClient.get(`${API_ENDPOINTS.orders}/${id}`);
    return data;
  },
  updateStatus: async (id, status) => {
    const { data } = await axiosClient.patch(`${API_ENDPOINTS.orders}/${id}/status`, { status });
    return data;
  },
};
