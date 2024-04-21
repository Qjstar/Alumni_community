<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
const active = ref(0);
import { useUserStore } from '@/store/user';
import { showFailToast } from 'vant';
const user = useUserStore();
const isStatus = ()=>{
  if(user.userInfo.user_status == "已认证"){
    router.push('/activity');
  }else{
    showFailToast("你尚未完成校园认证，正在为你跳转认证页面")
    router.push('/my/user_status');
  }
}
</script>
<template>
  <div class="tab_bar">
    <van-tabbar v-model="active" active-color="#ee0a24">
      <van-tabbar-item icon="wap-home" replace to="/home"> 首页 </van-tabbar-item>
      <van-tabbar-item icon="wechat-moments" replace to="/alumni_circle"> 校友圈 </van-tabbar-item>
      <van-tabbar-item icon="fire" replace to="" @click="isStatus"> 活动 </van-tabbar-item>
      <van-tabbar-item icon="contact" replace to="/my"> 我的 </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.tabBar {
}
</style>
