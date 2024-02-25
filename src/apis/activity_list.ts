import HttpClient from '@/utils/axios';

export const activityList = (page:number,pageSize:number) => {
  return HttpClient.get(`/activity/query?page=${page}&pageSize=${pageSize}`);
};
export const activityGetById = (id:any) => {
  return HttpClient.get(`/activity/query/${id}`);
};
// export const campusDelete = (id:number) => {
//   return HttpClient.delete(`/blogs/delete/${id}`);
// };