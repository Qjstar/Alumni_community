<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Image as VanImage } from 'vant';
import jpg1 from '@/assets/images/1.jpg';
import jpg2 from '@/assets/images/2.jpg';
import jpg3 from '@/assets/images/3.jpg';
// import TopBar from '@/components/TopBar.vue';
import { activityList } from '@/apis/activity_list';
import { campusList } from '@/apis/campus_list';
import router from '@/router';
import { computed } from 'vue';
// console.log(router.getRoutes());
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

const tj_list = ref([
  {
    id: '',
    title: '',
    username: '',
    createdAt: '',
    content: '',
    image: '',
  },
]);
let activity_list = ref([
  {
    activity_image: '',
    activity_name: '',
  },
]);
const barrage_list = ref([
  { id: 100, text: '大帅哥' },
  { id: 101, text: '大美女' },
  { id: 102, text: '来呀' },
  { id: 103, text: '快来呀' },
  { id: 106, text: '666' },
]);
const addBarrage = () => {
  barrage_list.value.push({ id: Math.random(), text: '由本帅开发' });
};
computed((barrage_list) => {
  barrage_list.value.push({ id: Math.random(), text: '由本帅开发' });
});
const error = ref(false);
const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
  // 异步更新数据
  let { data } = await activityList(1, 3);
  activity_list.value = data.rows.map((row: any) => row);
  let { data: tj_data } = await campusList(1, 10);
  tj_list.value = tj_data.rows.map((row: any) => row);
  // 加载状态结束
  loading.value = false;

  // 数据全部加载完成
  if (tj_list.value.length >= 10) {
    finished.value = true;
  }
};
function toAffiche() {
  router.push('/affiche');
}
function goTo(url: any) {
  window.open(url);
}
</script>

<template>
  <div class="home">
    <top-bar title="深圳职业技术大学" @click="addBarrage"><van-icon name="bell" @click="toAffiche()" />公告</top-bar>
    <van-barrage v-model="barrage_list">
      <div class="banner video">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#f05" lazy-render>
          <van-swipe-item v-for="(item, index) in carousel_list" :key="index">
            <van-image :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </van-barrage>
    <div class="hot_activity">
      <div class="box-title">热门活动</div>
      <div class="hot_body">
        <van-row :gutter="0" justify="space-around">
          <van-col v-for="(item, index) in activity_list" :key="index" span="7">
            <van-image class="hotImage" width="80" height="80"  :src="item.activity_image" alt="" />
            <div>{{ item.activity_name }}</div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="tj_content">
      <div class="box-title">推荐</div>
      <div class="tj_body">
        <van-list
          v-model:loading="loading"
          v-model:error="error"
          error-text="请求失败，点击重新加载"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in tj_list" :key="item.id" class="tj_item">
            <div class="tj_box">
              <van-row :gutter="20">
                <van-col span="6">
                  <img :src="item.image" alt="" />
                </van-col>
                <van-col span="18">
                  <div class="title">{{ item.title }}</div>
                  <div class="desc">
                    <van-text-ellipsis :content="item.content" rows="2" />
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

<style scoped lang="scss">
.home {
  .box-title {
    font-weight: 700;
    font-style: 18rem;
    margin: 10px 0;
  }
  .my-swipe {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .hot_body{
    text-align: center;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .hot_body > div >div{
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    border: 2px solid salmon;
    padding: 10px;
    border-radius: 10px;
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
    .tj_item {
      background: rgb(238, 234, 234);
      border-radius: 5px;
      margin-bottom: 10px;
    }
    .tj_box {
      height: auto;
      color: #000;
      text-align: left;
      .title {
        font-size: 1.05rem;
      }
      .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
img{
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0 auto;
}

</style>
