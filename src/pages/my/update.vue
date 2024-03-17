<script setup lang="ts">
const onClickLeft = () => {
  history.back();
};
</script>

<template>
  <div class="update">
    <van-nav-bar title="检查更新" left-text="返回" left-arrow @click-left="onClickLeft" />
    <h1>当前版本0.0.01</h1>
    <span>已是最新版本</span>
  </div>
</template>
