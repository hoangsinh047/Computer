import { axiosClient } from './axiosClient';
import { API_ENDPOINTS } from '../utils/constants';

export const brandApi = {
  list: async () => {
    const { data } = await axiosClient.get(API_ENDPOINTS.brands);
    return data;
  },
  create: async (body) => {
    const { data } = await axiosClient.post(API_ENDPOINTS.brands, body);
    return data;
  },
  update: async (id, body) => {
    const { data } = await axiosClient.put(`${API_ENDPOINTS.brands}/${id}`, body);
    return data;
  },
  remove: async (id) => {
    await axiosClient.delete(`${API_ENDPOINTS.brands}/${id}`);
  },
};
