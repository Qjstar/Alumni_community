import { defineStore } from 'pinia';
import { useUserStore } from './user';

enum Sex {
  man = '男人',
  woman = '女人',
}

export const userSexStore = defineStore('user_sex', {
  state: () => {
    return {
      sex: Sex.man,
    };
  },
  actions: {
    updateSex() {
      const userStore = useUserStore(); // 引用其他store
      if (userStore.userInfo.name !== 'admin') this.sex = Sex.woman;
    },
  },
});
