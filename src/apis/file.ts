import HttpClient from '@/utils/axios';
export const fileUpdata = (params:File) => {
    return HttpClient.post(`/upload/file`, params);
  };
  