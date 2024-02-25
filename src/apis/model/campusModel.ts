//定义请求参数
export interface CampusParams {
    id: string;
    title: string; //标题
    content: string; //内容
    image: string; //图片链接
  }
  
  //定义接口返回数据
  export interface CampusModel {
    user_id: string;
    title: string;
    content: string;
    image: string;
    tag: string;
    post_type: string; 
  }
  