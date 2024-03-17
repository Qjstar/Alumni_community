import router from '@/router';
import axios from 'axios';
import { useUserStore } from '@/store/user';
/*
 * 创建实例
 * 与后端服务通信
 */
const HttpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

/**
 * 请求拦截器
 * 功能：配置请求头
 */
HttpClient.interceptors.request.use(
  (config) => {
    const storekey: any = localStorage.getItem('storekey');
    const token = JSON.parse(storekey).token;
    // console.log(token);

    config.headers.authorization = 'Bearer ' + token;
    return config;
  },
  (error) => {
    console.error('网络错误，请稍后重试');
    return Promise.reject(error);
  },
);

/**
 * 响应拦截器
 * 功能：处理异常
 */
HttpClient.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    const user = useUserStore();
    const status = error.response.status;
    if (status === 403) {
      user.updateToken('');
      router.push('login');
    }
    return Promise.reject(error);
  },
);

export default HttpClient;
