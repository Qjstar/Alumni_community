<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { activityList, activityQueryByUnit } from '@/apis/activity_list';
import router from '@/router';
import { useUserStore } from '@/store/user';
import { showToast } from 'vant/lib/toast/function-call';

const userStore = useUserStore();

//storeToRefs 会跳过所有的 action 属性
const { userInfo } = userStore;

const active = ref(0);
// interface list {
//   id: '';
//   creator_id: '';
//   activity_creator: '';
//   activity_name: '';
//   activity_content: '';
//   activity_description: '';
//   activity_time: '';
//   activity_location: '';
//   activity_image: '';
//   createdAt: '';
//   updatedAt: '';
// }

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
let xy_list = ref([
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
let bj_list = ref([
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
watchEffect([active, activity_list, xy_list, bj_list], async () => {
  if (active.value == 1) {
    let { data } = await activityQueryByUnit('院级');
    // console.log(data);
    xy_list.value = data.map((row: any) => row);
    // console.log(xy_list);
  }
  if (active.value == 2) {
    let { data } = await activityQueryByUnit('班级');
    // console.log(data);
    bj_list.value = data.map((row: any) => row);
    // console.log(xy_list);
  }
});

const getList = async () => {
  let { data } = await activityList(1, 30);
  activity_list.value = data.rows.map((row: any) => row);
  let { data: xydata } = await activityQueryByUnit('院级');
  // console.log(data);
  xy_list.value = xydata.map((row: any) => row);
  let { data: bjdata } = await activityQueryByUnit('班级');
  // console.log(data);
  bj_list.value = bjdata.map((row: any) => row);
};

const get_activity_info = (e: string) => {
  router.push(`/activity_info/${e}`);
};

onMounted(async () => {
  await getList();
});
const pagereload = () => {
  window.location.reload();
};
const refreshing = ref(false);
const onRefresh = () => {
  getList();
  showToast('刷新成功');
  refreshing.value = false;
};

//管理员
const searchQuery = ref('');
const adrefreshing = ref(false);

let filteredActivities = ref(activity_list);

const adonSearch = () => {
  filteredActivities.value = activity_list.value.filter(
    (activity: any) =>
      activity.activity_name.includes(searchQuery.value) || activity.activity_description.includes(searchQuery.value),
  );
};
const onCancel = () => {
  searchQuery.value = '';
};
const adonRefresh = () => {
  // 这里可以调用API刷新活动列表数据
  adrefreshing.value = false;
};



const editActivity = (id: any) => {
  // 这里可以编辑活动
  console.log('编辑活动', id);
};

const deleteActivity = (id: any) => {
  // 这里可以删除活动
  console.log('删除活动', id);
};
</script>
<template>
  <div class="activity">
    <TopBar title="活动页">
      <van-button class="reload" block color="#fff" plain @click="pagereload"> 刷新 </van-button>
    </TopBar>
    <van-tabs v-model:active="active" swipeable>
      <van-tab title="全部">
        <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
          <div v-for="item in activity_list" :key="item.id">
            <ListCard
              :name="item.activity_name"
              :desc="item.activity_description"
              :time="item.activity_time.slice(0, 10)"
              :themeimg="item.activity_image"
              @click="get_activity_info(item.id)"
            />
          </div>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="学院">
        <div v-for="item in xy_list" :key="item.id">
          <ListCard
            :name="item.activity_name"
            :desc="item.activity_description"
            :time="item.activity_time.slice(0, 10)"
            :themeimg="item.activity_image"
            @click="get_activity_info(item.id)"
          />
        </div>
      </van-tab>
      <van-tab title="班级">
        <div v-for="item in bj_list" :key="item.id">
          <ListCard
            :name="item.activity_name"
            :desc="item.activity_description"
            :time="item.activity_time.slice(0, 10)"
            :themeimg="item.activity_image"
            @click="get_activity_info(item.id)"
          />
        </div>
      </van-tab>
      <van-tab title="活动管理" v-if="userInfo.role == '管理员'">
        <div class="activity-management-page">
          <van-search show-action v-model="searchQuery" placeholder="请输入搜索关键词" @search="adonSearch" @cancel="onCancel" />
          <van-pull-refresh v-model="adrefreshing" success-text="刷新成功" @refresh="adonRefresh">
            <div v-for="item in filteredActivities" :key="item.id" class="activity-card">
              <ListCard
                :name="item.activity_name"
                :desc="item.activity_description"
                :time="item.activity_time.slice(0, 10)"
                :themeimg="item.activity_image"
                @click="get_activity_info(item.id)"
              />
              <div class="action-buttons">
                <van-button type="warning" size="small" @click="editActivity(item.id)">编辑</van-button>
                <van-button type="danger" size="small" @click="deleteActivity(item.id)">删除</van-button>
              </div>
            </div>
          </van-pull-refresh>
        </div></van-tab
      >
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
.activity-management-page {
  padding: 10px;
}
.activity-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 10px;
}
.action-buttons {
  display: flex;
  gap: 10px;
}
</style>
