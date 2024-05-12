<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { useUserStore } from '@/store/user';
import { showFailToast, showDialog } from 'vant';

const active = ref(0);
const user = useUserStore();
const isStatus = () => {
  if (user.userInfo.user_status == '已认证') {
    router.push('/activity');
  } else {
    showDialog({
      title: '提示',
      message: '你尚未完成校园认证，将为你跳转认证页面',
      width: '80vw',
    }).then(() => {
      router.push('/my/user_status');
    });
  }
};
</script>
<template>
  <div class="tab_bar">
    <van-tabbar v-model="active" active-color="#ee0a24">
      <van-tabbar-item icon="wap-home" replace to="/home"> 首页 </van-tabbar-item>
      <van-tabbar-item icon="wechat-moments" replace to="/alumni_circle"> 校友贴 </van-tabbar-item>
      <van-tabbar-item icon="fire" replace to="" @click="isStatus"> 活动 </van-tabbar-item>
      <van-tabbar-item icon="contact" replace to="/my"> 我的 </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.tabBar {
}
</style>
