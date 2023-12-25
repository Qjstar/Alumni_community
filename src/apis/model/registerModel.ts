//定义请求参数
export interface UserParams {
  username: string; //用户
  nickname: string; //昵称
  phone: string; //手机号
  password: string; //密码
  role: string; //身份
}

//定义接口返回数据
export interface UserModel {
  token: string;
  username: string;
  phone: string;
  userId: string;
  nickname: string;
}
