<script setup lang="ts">
const onClickLeft = () => {
  history.back();
};
</script>

<template>
  <div class="about">
    <van-nav-bar title="关于" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="auth_info">
      <h3>作者：张嘉文</h3>
      <p>如遇到功能缺陷或者其他问题可以加以下联系方式</p>
      <p>联系方式：123456789</p>
    </div>
  </div>
</template>
<style scoped>
.auth_info {
  margin: 2vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
