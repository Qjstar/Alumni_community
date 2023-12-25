<template>
  <div>
    <el-card class="box-card" shadow="always">
      <h1>error -- 找不到页面</h1>
    </el-card>
    <br />

    <router-link to="/home">
      <el-button type="primary" plain>跳转home</el-button>
    </router-link>
    <span class="gutter"></span>
    <el-button type="primary" plain @click="handleLogin">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogin = () => {
  router.push('/login');
};
</script>

<style>
.gutter{
    margin: 0 40px;
}
</style>