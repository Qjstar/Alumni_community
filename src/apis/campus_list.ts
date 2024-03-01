import HttpClient from '@/utils/axios';
// import type { CampusParams, CampusModel } from './model/campusModel';

export const campusList = (page:number,pageSize:number) => {
  return HttpClient.get(`/blogs/query?page=${page}&pageSize=${pageSize}`);
};
export const campusMyList = () => {
  return HttpClient.get(`/blogs/queryUser`);
};
export const campusDelete = (id:string) => {
  return HttpClient.delete(`/blogs/delete/${id}`);
};