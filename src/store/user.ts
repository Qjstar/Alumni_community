import { defineStore } from 'pinia';

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
      token: '',
    };
  },
  getters: {
    vipName: (state) => state.userInfo.nickname + 'vip',
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
    //更新基础数据类型
    updateToken(token: string) {
      this.token = token;
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
