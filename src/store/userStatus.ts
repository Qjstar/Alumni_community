import { defineStore } from 'pinia';

// defineStore 第一个参数是id，必需且值唯一
export const useUserStatusStore = defineStore('user_status', {
  //state返回一个函数，防止作用域污染
  state: () => {
    return {
      token: '',
    };
  },
  getters: {

  },
  actions: {
    //更新基础数据类型
    updateToken(token: string) {
      this.token = token;
    },
  },
  // 开始数据持久化
  //   persist: true,
  persist: {
    key: 'user_status', // 修改存储的键名，默认为当前 Store 的 id
    storage: window.localStorage, // 存储位置修改为 sessionStorage
  },
});
