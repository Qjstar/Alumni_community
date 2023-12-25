//定义请求参数
export interface UserParams {
  phone: string; //用户
  password: string; //密码
}

//定义接口返回数据
export interface UserModel {
  token: string;
  username: string;
  phone: string;
  userId: string;
  nickname: string;
}
