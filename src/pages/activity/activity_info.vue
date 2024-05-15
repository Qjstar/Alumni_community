<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { activityGetById, activitySignup, getSignupCount, isSignup } from '@/apis/activity_list';
import { useUserStore } from '@/store/user';
import { showSuccessToast } from 'vant';
const user = useUserStore();
const route = useRoute();

let activity_id: any = route.params.id;
const activity = ref({
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
  act_count: '',
  createdAt: '',
  updatedAt: '',
});
let isRegistr: any = ref(false);
const getActivityInfo = async () => {
  let { data } = await activityGetById(activity_id);
  let { data: count } = await getSignupCount(activity_id);
  activity.value = data;
  activity.value.act_count = count.signupCount;
};
const onClickLeft = () => {
  history.back();
};
const getList = async () => {
  await getActivityInfo();
  let { data } = await isSignup(user.getUserInfo.userId, activity_id);
  if (data.isSignedUp == 0) {
    isRegistr.value = false;
  } else {
    isRegistr.value = true;
  }
};
onMounted(async () => {
  getList();
});
const subActivity = async () => {
  if (isRegistr.value == false) {
    await activitySignup({
      activityId: activity.value.id,
      activityName: activity.value.activity_name,
      userId: user.getUserInfo.userId,
      userName: user.getUserInfo.name,
    })
      .then(() => {
        isRegistr.value = true;
        getList();
        showSuccessToast('报名成功');
      })
      .catch((e) => {});
  } else {
    showSuccessToast('已经报名过此活动');
  }
};
</script>

<template>
  <div class="activity_info">
    <van-nav-bar title="活动详情" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="box">
      <h2 class="act_name">活动名{{ activity.activity_name }}</h2>
      <p class="creator">发起人：{{ activity.activity_creator }}</p>
      <p class="time">活动时间：{{ activity.activity_time.slice(0, 10) }}</p>
      <p class="location">活动地点：{{ activity.activity_location }}</p>
      <p class="unit">活动组织单位:{{ activity.organizing_unit }}</p>
      <div class="image">
        <van-image width="100" height="100" :src="activity.activity_image" />
      </div>
      <p class="act_content">活动内容：{{ activity.activity_content }}</p>
      <p>当前报名人数：{{ activity.act_count }}</p>
    </div>
    <van-button :type="isRegistr ? 'success' : 'primary'" block class="btn-sub" @click="subActivity()">{{
      isRegistr ? '已报名' : '报名活动'
    }}</van-button>
  </div>
</template>

<style lang="scss">
.activity_info {
}
.act_name {
  text-align: center;
  font-size: 18px;
  margin: 5px 0;
  font-weight: 600;
}
.box {
  padding: 0 20px 20px;
  p {
    line-height: 1.3;
    margin: 5px 0;
  }
}
.image {
  margin: 2vh 0;
}
.btn-sub {
  margin: 5vh 0;
}
</style>
