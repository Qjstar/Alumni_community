import HttpClient from '@/utils/axios';
export const fileUpdata = (params: any) => {
  return HttpClient.post(`/upload/file`, params);
};
export const filesUpdata = (params: any) => {
  return HttpClient.post(`/upload/files`, params);
};
