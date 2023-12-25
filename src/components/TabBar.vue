<script setup lang="ts">
import { ref } from 'vue';
const active = ref(0);
</script>
<template>
  <div class="tab_bar">
    <van-tabbar v-model="active" active-color="#ee0a24">
      <van-tabbar-item icon="wap-home" replace to="/home"> 首页 </van-tabbar-item>
      <van-tabbar-item icon="wechat-moments" replace to="/alumni_circle"> 校友圈 </van-tabbar-item>
      <van-tabbar-item icon="fire" replace to="/activity"> 活动 </van-tabbar-item>
      <van-tabbar-item icon="contact" replace to="/my"> 我的 </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.tabBar {
}
</style>
