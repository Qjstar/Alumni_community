import HttpClient from '@/utils/axios';
import { ActivityParams, ActivityModel } from './model/activityModel';
enum ActivityUrl {
  get_by_id = '/activity/query/',
  create_url = '/activity/create',
  unit_url = '/activity/queryByUnit/',
}
export const activityList = (page: number, pageSize: number) => {
  return HttpClient.get(`/activity/query?page=${page}&pageSize=${pageSize}`);
};
export const activityGetById = (id: any) => {
  return HttpClient.get(ActivityUrl.get_by_id + id);
};
export const activityCreate = (params: ActivityParams) => {
  return HttpClient.post<ActivityModel>(ActivityUrl.create_url, params);
};

export const activityQueryByUnit = (unit: string) => {
  return HttpClient.get(ActivityUrl.unit_url + unit);
};
