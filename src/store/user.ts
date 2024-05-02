import { defineStore } from 'pinia';
import router from '@/router';
import { routes, adminRouter } from '@/router/routes';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
import { login } from '@/apis/login';
import cloneDeep from 'lodash/cloneDeep';
// defineStore 第一个参数是id，必需且值唯一
export const useUserStore = defineStore('user', {
  //state返回一个函数，防止作用域污染
  state: () => {
    return {
      userInfo: {
        userId: '',
        name: '',
        nickname: '',
        signature: '',
        role: '',
        avatar: '',
        user_status: '',
      },
      token: GET_TOKEN(),
    };
  },
  getters: {
    vipName: (state) => state.userInfo.nickname + 'vip',
    getUserInfo: (state) => state.userInfo,
    getUserId: (state) => state.userInfo.userId,
    getUserStatus: (state) => state.userInfo.user_status,
  },
  actions: {
    //更新整个对象
    updateUserInfo(userInfo: {
      userId: string;
      name: string;
      nickname: string;
      signature: string;
      role: string;
      avatar: string;
      user_status: string;
    }) {
      this.userInfo = userInfo;
    },
    //更新对象中某个属性
    updateName(name: string) {
      this.userInfo.name = name;
    },
    updateStatus(role: string) {
      this.userInfo.user_status = role;
    },
    //更新基础数据类型
    updateToken(token: string) {
      this.token = token;
    },
    async userLogin(data: any) {
      let res = await login(data);
      this.token = res.data.token as unknown as string;
      SET_TOKEN(res.data.token);
      // 持久化
      SET_TOKEN(res.data as unknown as string);
      this.userInfo.userId = res.data.userId as string;
      this.userInfo.name = res.data.account as string;
      this.userInfo.role = res.data.role as string;
      this.userInfo.avatar = res.data.avatar as string;
      this.userInfo.user_status = res.data.user_status as string;
      if (this.userInfo.role == '管理员') {
        let ad = cloneDeep([...adminRouter]);
        ad.forEach((item: any) => {
          router.addRoute(item); // 动态添加路由
        });
        console.log(router.getRoutes());
      }
      return 'ok';
    },
  },
  // 开始数据持久化
  //   persist: true,
  persist: {
    key: 'storekey', // 修改存储的键名，默认为当前 Store 的 id
    storage: window.localStorage, // 存储位置修改为 sessionStorage
  },
  // 自定义持久化字段
  //     persist: {
  //     paths: ['userInfo.name'], //存储userInfo的name
  //   },
});
