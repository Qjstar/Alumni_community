<script setup lang="ts">
const onClickLeft = () => {
  history.back();
};
</script>

<template>
  <div class="affiche">
    <van-nav-bar title="公告页" left-text="返回" left-arrow @click-left="onClickLeft" />
    公告页
  </div>
</template>
