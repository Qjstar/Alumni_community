<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import { alumni_list } from '../mock/alumni_circle_list';
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const active = ref(0);

const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }

    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
const goToList = () => {
  router.push('/push_alumni_content');
};
</script>
<template>
  <div class="alumni_circle">
    <div class="topbar">
      <van-row justify="space-between">
        <van-col>
          <div>校友圈</div>
        </van-col>
        <van-col>
          <div>
            <van-button type="primary" class="post_message" block @click="goToList"> 发帖 </van-button>
          </div>
        </van-col>
      </van-row>
    </div>
    <van-tabs v-model:active="active" swipeable>
      <van-tab title="校友贴">
        <div class="alumni_circle_info">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in alumni_list" :key="item.id" class="content_body">
                <div class="title">标题:{{ item.title }}</div>
                <van-row :gutter="8">
                  <van-col span="16">
                    <div class="content">
                      <div class="info">
                        <span class="user">用户名:{{ item.user }}</span> |
                        <span class="desc">时间: {{ item.date }}</span>
                      </div>
                      <div class="desc">
                        <van-text-ellipsis rows="2" :content="item.desc" expand-text="展开" collapse-text="收起" />
                      </div>
                    </div>
                  </van-col>
                  <van-col span="8">
                    <div class="content_img">
                      <van-image :src="item.imgUrl" block error-icon="error">
                        <template v-slot:error>
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
        <van-swipe-cell>
          <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            class="goods-card"
            thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="scss">
.alumni_circle {
  .topbar {
    background: rgb(178, 17, 6);
    border-radius: 8px;
    height: 8vh;
    line-height: 8vh;
    padding: 0 5vw;
    color: #fff;
    .post_message {
      height: 30px;
      margin-top: 2vh;
    }
  }
  .alumni_circle_info {
    .content_body {
      border-radius: 5px;
      display: flex;
      width: 100%;
      padding: 5px;
      border: 1px solid rgb(125, 122, 122);
      background: rgb(244, 244, 244);
      margin: 10px 0;
      color: #000;
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
