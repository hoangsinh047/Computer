import { axiosClient } from './axiosClient';
import { API_ENDPOINTS } from '../utils/constants';

export const userApi = {
  list: async (params) => {
    const { data } = await axiosClient.get(API_ENDPOINTS.users, { params });
    return data;
  },
};
