<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { activityGetById } from '@/apis/activity_list';

const route = useRoute();

let activity_id = route.params.id;
let activity = reactive({
  id: '',
  creator_id: '',
  activity_creator: '',
  activity_name: '',
  activity_content: '',
  activity_description: '',
  activity_time: '',
  activity_location: '',
  activity_image: '',
  createdAt: '',
  updatedAt: '',
});
const getActivityInfo = async () => {
  let { data } = await activityGetById(activity_id);
  console.log(data);
  activity = data;
  console.log(activity);
};

onMounted(async () => {
  await getActivityInfo();
});
</script>

<template>
  <div class="activity_info">
    {{ route.params.id }}
    <div class="image">
      <van-image width="100" height="100" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
    </div>
    <div class="act_name">{{ activity.activity_name }}</div>
    <div class="act_content">{{ activity.activity_content }}</div>
    <div class="time">{{ activity.activity_time }}</div>
    <div class="location">活动位置</div>
    <div class="creator">活动创建人</div>
    <div class="unit">活动组织单位</div>
  </div>
</template>

<style lang="scss"></style>
