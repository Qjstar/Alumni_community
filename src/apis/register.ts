import HttpClient from '@/utils/axios';
import type { UserParams } from './model/userModel';

export const register = (params:UserParams) => {
  return HttpClient.post('/auth/register', params);
};
