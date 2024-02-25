<script setup lang="ts">
    defineProps<{
        title: string,
    }>()
</script>
<template>
  <div class="topbar">
    <van-row justify="space-between">
      <van-col>
        <div>{{ title }}</div>
      </van-col>
      <van-col>
        <slot></slot>
      </van-col>
    </van-row>
  </div>
</template>

<style>
.topbar {
  background: rgb(178, 17, 6);
  border-radius: 8px;
  height: 8vh;
  line-height: 8vh;
  padding: 0 5vw;
  color: #fff;
 
}
</style>
