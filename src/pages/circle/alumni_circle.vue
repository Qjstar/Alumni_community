<script setup lang="ts">
import { showToast, showConfirmDialog } from 'vant';
import router from '@/router';
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import { campusList, campusMyList, campusDelete } from '@/apis/campus_list';
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const active = ref(0);
let alumni_list = ref([
  {
    id: '',
    title: '',
    username: '',
    createdAt: '',
    content: '',
    image: '',
  },
]);
let my_list = ref([
  {
    id: '',
    title: '',
    username: '',
    createdAt: '',
    content: '',
    image: '',
  },
]);
const userStore = useUserStore();
const { userInfo } = userStore;
const onLoad = async () => {
  await getList();
  // 加载状态结束
  loading.value = false;
  // 最大加载30条
  if (alumni_list.value.length >= 30) {
    // 数据全部加载完成
    finished.value = true;
  }
};

// onMounted(async () => {
//   getList();
// });
const onRefresh = () => {
  getList();
  showToast('刷新成功');
  refreshing.value = false;
};
const goToList = () => {
  if (userInfo.user_status == '已认证') {
    router.push('/push_alumni_content');
  } else {
    showConfirmDialog({
      title: '提示',
      message: '您当前未认证，请先认证再使用功能',
    })
      .then(() => {
        // on confirm
        router.push('/my/user_status');
      })
      .catch(() => {
        // on cancel
      });
  }
};
const deleteContent = (id: string) => {
  showConfirmDialog({
    title: '提示',
    message: '是否删除？',
    width: '50wv',
  }).then(async () => {
    await campusDelete(id);
    onRefresh();
  });
};

const editContent = async (id: string) => {
  router.push({
    path: '/push_alumni_content',
    query: {
      id: id,
      type: 'edit',
    },
  });
};
const getList = async () => {
  let { data } = await campusList(1, 30);
  alumni_list.value = data.rows.map((row: any) => row);

  let mydata = await campusMyList();
  my_list.value = mydata.data;
};
</script>
<template>
  <div class="alumni_circle">
    <top-bar title="校友贴">
      <div>
        <van-button class="post_message" block color="#fff" plain @click="goToList"> 发帖 </van-button>
      </div>
    </top-bar>
    <van-tabs v-model:active="active" swipeable>
      <van-tab title="校友贴">
        <div class="alumni_circle_info">
          <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in alumni_list" :key="item.id" class="content_body">
                <div class="title">话题：{{ item.title }}</div>
                <van-row :gutter="8">
                  <van-col span="16">
                    <div class="content">
                      <div class="info">
                        <span class="user">用户名:{{ item.username }}</span>
                        <br />
                        <span class="desc">时间: {{ item.createdAt.slice(0, 10) }}</span>
                      </div>
                      <div class="desc">
                        <van-text-ellipsis rows="3" :content="item.content" expand-text="展开" collapse-text="收起" />
                      </div>
                    </div>
                  </van-col>
                  <van-col span="8">
                    <div class="content_img">
                      <van-image :src="item.image" block error-icon="error">
                        <template #error>
                          <van-loading type="spinner" size="20" />
                        </template>
                      </van-image>
                    </div>
                  </van-col>
                </van-row>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
      <van-tab title="我的发帖">
        <van-swipe-cell v-for="item in my_list" :key="item.id" v-if="my_list.length != 0">
          <van-card :desc="item.content" :title="item.title" class="goods-card" :thumb="item.image?item.image:'暂无图片'" />
          <template #right>
            <van-button square text="编辑" type="primary" class="delete-button" @click="editContent(item.id)" />
            <van-button square text="删除" type="danger" class="delete-button" @click="deleteContent(item.id)" />
          </template>
        </van-swipe-cell>
        {{ my_list.length == 0 ? '暂无数据' : '' }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="scss">
.alumni_circle {
  .post_message {
    height: 30px;
    margin-top: 2vh;
    color: #f10 !important;
    font-weight: 500;
  }

  .alumni_circle_info {
    padding: 5px;
    .content_body {
      border-radius: 5px;
      display: flex;
      width: 100%;
      padding: 5px;
      border: 1px solid rgb(125, 122, 122);
      background: rgb(244, 244, 244);
      margin: 10px 0;
      color: #000;
      max-height: 30vh;
      .content {
        text-align: left;
        color: #000;
        div {
          margin: 5px 0;
        }
      }
      .title {
        font-weight: 700;
        font-size: 1.05rem;
        color: #000;
        text-align: left;
      }
      .info {
        color: #999;
      }
      .content_img img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .goods-card {
    margin: 0;
    background-color: #fff;
  }

  .delete-button {
    height: 100%;
  }
}
</style>
