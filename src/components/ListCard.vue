<script setup lang="ts">
defineProps<{
  desc?: string;
  name?: string;
  themeimg?: string;
  time: string;
}>();
</script>
<template>
  <div class="listCard">
    <van-row :gutter="8">
      <van-col span="8">
        <van-image :src="themeimg" block error-icon="error">
          <template v-slot:error>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </van-col>
      <van-col span="16">
        <h2 class="creator">{{ name }}</h2>
        <p class="desc"><van-text-ellipsis rows="3" :content="desc" expand-text="展开" collapse-text="收起" /></p>
        <p class="time">
          <span>{{ time }}</span>
        </p>
      </van-col>
    </van-row>
  </div>
</template>
<style scoped lang="scss">
.listCard {
  padding-bottom: 0.5vh;
  margin: 1vh;
  border-bottom: 2px solid #ccc;

  .creator {
    font-size: 18px;
  }
  .desc {
    font-size: 14px;
  }
  .time {
    color: #899;
    font-size: 12px;
  }
}
</style>
