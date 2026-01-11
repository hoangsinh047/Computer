import { axiosClient } from './axiosClient';
import { API_ENDPOINTS } from '../utils/constants';

export const categoryApi = {
  list: async () => {
    const { data } = await axiosClient.get(API_ENDPOINTS.categories);
    return data;
  },
  create: async (body) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.categories, body);
    return data;
  },
  update: async (id, body) => {
    const { data } = await axiosClient.put(`${API_ENDPOINTS.categories}/${id}`, body);
    return data;
  },
  remove: async (id) => {
    await axiosClient.delete(`${API_ENDPOINTS.categories}/${id}`);
  },
};
