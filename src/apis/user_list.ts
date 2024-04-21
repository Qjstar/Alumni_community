import HttpClient from '@/utils/axios';
import { UserParams, UserModel } from './model/userModel';
enum userUrl {
  query_user_url = '/user/queryUser',
  get_by_id = '/queryUserById/',
  create_url = '/user/create',
  update_url = '/updateUser/',
  delete_url = '/user/delete/',
  authentication_url = '/user/authenticateUser/',
}
export const queryUserList = () => {
  return HttpClient.get(userUrl.query_user_url);
};
export const queryUserById = (id: any) => {
  return HttpClient.get(userUrl.get_by_id + id);
};
export const userCreate = (params: UserParams) => {
  return HttpClient.post<UserModel>(userUrl.create_url, params);
};

export const userUpdate = (id: string) => {
  return HttpClient.get(userUrl.update_url + id);
};
export const userDelete = (id: string) => {
  return HttpClient.get(userUrl.delete_url + id);
};

//用户认证
export const userAuthenticate = (id:string,params: UserParams) => {
  return HttpClient.post<UserModel>(userUrl.authentication_url+id, params);
};