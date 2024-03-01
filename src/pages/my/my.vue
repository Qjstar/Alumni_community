<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user'; //路径别名，引入store
import {useUserStatusStore} from "@/store/userStatus"
const userStore = useUserStore();

//storeToRefs 会跳过所有的 action 属性
const { userInfo } = storeToRefs(userStore);

//action 属性直接解构
const { updateToken } = userStore;
const imgUrl = userInfo.value.avatar ? userInfo.value.avatar : "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"

const userStatusStore = useUserStatusStore();
const userStatustoken = userStatusStore.token;

import router from '@/router';
import { showSuccessToast } from 'vant';
const outlogin = () => {
  showSuccessToast('注销成功');
  updateToken('');
  router.push('/login');
};
</script>
<template>
  <div class="my">
    <div class="my-container">
      <div class="my-header">
        <img :src="imgUrl" alt="头像" class="avatar" />
        <div class="user-info">
          <div class="username">{{userInfo.nickname}}</div>
          <div class="role">{{ userInfo.role }}</div>
        </div>
      </div>
      <div class="my-content">
        <van-cell-group>
          <van-cell is-link to="/my/signature"><div class="signature">个性签名：{{ userInfo.signature ? userInfo.signature : "签名" }}</div></van-cell>
          <van-cell is-link to="userStatustoken=='未提交' ? '/my/user_status' : false"><div class="user_status">校园认证: {{userInfo.user_status ? userInfo.user_status : "未认证"}}{{ userStatustoken=='已提交' ? '-审核中' : '' }}</div></van-cell>
          <van-cell title="我的收藏" is-link to="/my/addresses" />
          <van-cell title="检查更新" is-link to="/my/check_update" />
          <van-cell title="关于" is-link to="/my/about" />
          <van-cell title="设置" is-link to="/my/settings" />
        </van-cell-group>
    <van-button @click="outlogin" block color="#f10"> 退出登录 </van-button>

      </div>
    </div>

  </div>
</template>

<style scoped>
.my-container {
  padding: 20px;
}
.user_status{
    text-align: left;
    color: #000;
}
.signature{
    text-align: left;
    color: #000;
}

.my-header {
  display: flex;
  align-items: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.user-info {
  margin-left: 20px;
}

.username {
  font-size: 20px;
  font-weight: bold;
}

.role {
  font-size: 14px;
  color: #666;
}

.my-content {
  margin-top: 20px;
}
</style>
