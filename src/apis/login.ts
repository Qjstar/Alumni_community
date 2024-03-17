import HttpClient from '@/utils/axios';
import type { UserParams, UserModel } from './model/userModel';

export const login = (params: UserParams) => {
  return HttpClient.post<UserModel>('/auth/login', params);
};
