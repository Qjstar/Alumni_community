import HttpClient from '@/utils/axios';
import { ActivityParams, ActivityModel,signup } from './model/activityModel';
enum ActivityUrl {
  get_by_id = '/activity/query/',
  create_url = '/activity/create',
  unit_url = '/activity/queryByUnit/',
  signup_url = '/activity/signup',
  getSignupCount = '/activity/getSignupCount/'
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

// 活动报名
export const activitySignup = (params: signup) => {
  return HttpClient.post(ActivityUrl.signup_url,params);
};
// 报名人数
export const getSignupCount = (id: string) => {
  return HttpClient.get(ActivityUrl.getSignupCount + id);
};
// 是否已报名活动
export const isSignup = (userId: string,activityId: string) => {
  return HttpClient.get('/activity/checkSignup/'+userId+'/'+activityId);
};