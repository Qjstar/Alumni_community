<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { activityGetById } from '@/apis/activity_list';
const route = useRoute();

let activity_id = route.params.id;
let activity = ref({
  id: '',
  creator_id: '',
  activity_creator: '',
  activity_name: '',
  activity_content: '',
  activity_description: '',
  activity_time: '',
  activity_location: '',
  activity_image: '',
  organizing_unit: '',
  createdAt: '',
  updatedAt: '',
});
let subText = ref(false);
const getActivityInfo = async () => {
  let { data } = await activityGetById(activity_id);
  // console.log(data);
  activity.value = data;
};
const onClickLeft = () => {
  history.back();
};
onMounted(async () => {
  await getActivityInfo();
});
const subActivity = () => {
  console.log('true');
  if (subText.value == false) {
    subText.value = true;
  } else {
    subText.value = false;
  }
};
</script>

<template>
  <div class="activity_info">
    <van-nav-bar title="活动详情" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="box">
      <h2>{{ activity.activity_name }}</h2>
      <div class="creator">发起人：{{ activity.activity_creator }}</div>
      <div class="time">活动时间：{{ activity.activity_time.slice(0, 10) }}</div>
      <div class="location">活动地点：{{ activity.activity_location }}</div>
      <div class="unit">活动组织单位:{{ activity.organizing_unit }}</div>
      <div class="image">
        <van-image width="100" height="100" :src="activity.activity_image" />
      </div>
      <div class="act_name">{{ activity.activity_name }}</div>
      <div class="act_content">{{ activity.activity_content }}</div>
    </div>
    <van-button :type="subText ? 'success' : 'primary'" block class="btn-sub" @click="subActivity()">{{
      subText ? '已报名' : '报名活动'
    }}</van-button>
  </div>
</template>

<style lang="scss">
.activity_info {
}
.box {
  padding: 15px;
}
.image {
  margin: 2vh 0;
}
.btn-sub {
  margin: 5vh 0;
}
</style>
