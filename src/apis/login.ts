import HttpClient from '@/utils/axios';
import type { UserParams, UserModel } from './model/loginModel';

export const login = (params:UserParams) => {
  return HttpClient.post<UserModel>('/auth/login', params);
};
