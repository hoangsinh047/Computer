import { axiosClient } from './axiosClient';
import { API_ENDPOINTS } from '../utils/constants';

export const productApi = {
  list: async (params) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.products, { params });
    return data;
  },
  getById: async (id) => {
    const { data } = await axiosClient.get(`${API_ENDPOINTS.products}/${id}`);
    return data;
  },
  create: async (body) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.products, body);
    return data;
  },
  update: async (id, body) => {
    const { data } = await axiosClient.put(`${API_ENDPOINTS.products}/${id}`, body);
    return data;
  },
  remove: async (id) => {
    await axiosClient.delete(`${API_ENDPOINTS.products}/${id}`);
  },
};
