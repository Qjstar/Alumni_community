<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ListCard from '@/components/ListCard.vue';
import { activityList } from '@/apis/activity_list';
import TopBar from '@/components/TopBar.vue';
import router from '@/router';
const active = ref(0);

let activity_list = ref([
  // {
  //   id: 7,
  //   creator_id: 1,
  //   activity_creator: '王五',
  //   activity_name: 'Yuen Kwok Ming',
  //   activity_content: '',
  //   activity_description: 'kV9wjAltrW',
  //   activity_time: '',
  //   activity_location: '',
  //   activity_image: 'https://img1.baidu.com/it/u=1991562588,2707489176&fm=253&fmt=auto&app=138&f=JPEG?w=407&h=500',
  //   createdAt: '2023-10-23T13:01:09.000Z',
  //   updatedAt: '2024-02-21T10:25:50.000Z',
  // },
  {
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
  },
]);

const getList = async () => {
  let { data } = await activityList(1, 10);
  activity_list = data.rows.map((row: any) => row);
};

const get_activity_info = (e:string) => {
  router.push(`/activity_info/${e}`)
}

onMounted(async () => {
  await getList();
});
const pagereload = () => {
  window.location.reload();
};
</script>
<template>
  <div class="activity">
    <TopBar title="活动页">
      <van-button class="reload" block color="#fff" plain @click="pagereload"> 刷新 </van-button>
    </TopBar>
    <van-tabs v-model:active="active" swipeable>
      <van-tab title="全部">
        <div v-for="item in activity_list" :key="item.id">
          <ListCard
            :name="item.activity_name"
            :desc="item.activity_description"
            :time="item.activity_time.slice(0, 10)"
            :themeimg="item.activity_image"
            @click="get_activity_info(item.id)"
          />
        </div>
      </van-tab>
      <van-tab title="学院" disabled>学院</van-tab>
      <van-tab title="学院">学院</van-tab>
      <van-tab title="班级">班级</van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.reload {
  height: 30px;
  margin-top: 2vh;
  color: #f10 !important;
  font-weight: 500;
}
</style>
