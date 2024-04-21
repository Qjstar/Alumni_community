//定义请求参数
export interface UserParams {
  id: string;
  username: string; //用户
  nickname: string; //昵称
  phone: string; //手机号
  password: string; //密码
  role: string; //身份
  signature: string; //签名
  avatar: string; //  用户图像地址
  stuNo: string; // 学号
  stuCard: string; //校园卡图像
}

//定义接口返回数据
export interface UserModel {
  account: string;
  auth_status: string;
  token: string;
  username: string;
  phone: string;
  userId: string;
  nickname: string;
  signature: string; //签名
  avatar: string; //用户图像地址
  user_status: string; //用户状态
  role: string; //身份
  stuNo: string; // 学号
  stuCard: string; //校园卡图像
  code: string;

}
