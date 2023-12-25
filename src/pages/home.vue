<script setup lang="ts">
import { ref, reactive } from 'vue';
import jpg1 from '@/assets/images/1.jpg';
import jpg2 from '@/assets/images/2.jpg';
import jpg3 from '@/assets/images/3.jpg';
const carousel_list = reactive([
  {
    carouselUrl: jpg1,
    redirectUrl: jpg1,
  },
  {
    carouselUrl: jpg2,
    redirectUrl: jpg2,
  },
  {
    carouselUrl: jpg3,
    redirectUrl: jpg3,
  },
]);

const activity = reactive([
  {
    title: 'hello',
    url: jpg1,
  },
  {
    title: 'hello2',
    url: jpg2,
  },
  {
    title: 'hello3',
    url: jpg3,
  },
]);
const text = ref("介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容介绍内容内容")
const tj_list = ref([1, 2, 3, 4, 5]);
const error = ref(false);
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      tj_list.value.push(tj_list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (tj_list.value.length >= 50) {
      finished.value = true;
    }
  }, 1000);
};

function goTo(url: any) {
  window.open(url);
}
</script>

<template>
  <div class="home">
    <div class="topbar">
      <van-row justify="space-between">
        <van-col :span="20">深圳职业技术大学</van-col>
        <van-col :span="4"><van-icon name="bell" />公告</van-col>
      </van-row>
    </div>
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#f05" lazy-render>
        <van-swipe-item v-for="(item, index) in carousel_list" :key="index">
          <img :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hot_activity">
      <div>热门活动</div>
      <div class="hot_body">
        <van-row :gutter="20" justify="space-around">
          <van-col span="8" v-for="(item, index) in activity" :key="index">
            <img :src="item.url" alt="" />
            <div>{{ item.title }}</div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="tj_content">
      <div>推荐</div>
      <div class="tj_body">
        <van-list
          v-model:loading="loading"
          v-model:error="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          :finished="finished"
          finished-text="没有更多了"
        >
          <van-cell v-for="item in tj_list" :key="item" class="tj_item">
            <div class="tj_box">
              <van-row :gutter="20">
                <van-col span="6">
                  <img src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="" />
                </van-col>
                <van-col span="18">
                  <div class="title">找一个搭子</div>
                  <div class="desc">
                    <van-text-ellipsis :content="text" rows="2" />
                  </div>
                </van-col>
              </van-row>
            </div>
          </van-cell>
        </van-list>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  .topbar {
    background: rgb(178, 17, 6);
    border-radius: 8px;
    height: 8vh;
    line-height: 8vh;
    padding: 0 5vw;
    color: #fff;
  }
  .my-swipe {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .hot_activity {
    margin-bottom: 5vh;
    height: auto;
    padding: 0.5vh 5vw;
    img {
      width: 100%;
      height: 100%;
    }
 
  }
  .tj_content {
    padding: 0.5vh 5vw;
    img {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .tj_item{
      background: rgb(238, 234, 234);
      border-radius: 5px;
      margin-bottom: 10px;

    }
    .tj_box {
      height: auto;
      color: #000;
      text-align: left;
      .title{
        font-size: 1.05rem;
      }
      .desc{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
