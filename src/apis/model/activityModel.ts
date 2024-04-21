//定义请求参数
export interface ActivityParams {
  activity_name: string;
  activity_description: string;
  activity_content: string;
  activity_image: string;
  activity_time: string;
  activity_location: string;
  organizing_unit: string;
}

//定义接口返回数据
export interface ActivityModel {
  activity_name: string;
  activity_description: string;
  activity_content: string;
  activity_image: string;
  activity_time: string;
  activity_location: string;
  organizing_unit: string;
}

// 报名表接口请求参数
export interface signup{
  activityId: string;
  userId: string;
  activityName: string;
  userName: string;
}