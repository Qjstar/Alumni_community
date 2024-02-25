import HttpClient from '@/utils/axios';
import type { CampusParams, CampusModel } from './model/campusModel';

export const campusCreate = (params:CampusParams) => {
  return HttpClient.post<CampusModel>('/blogs/create', params);
};
