<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user'; //路径别名，引入store
import router from '@/router';
import { showSuccessToast } from 'vant';
import { REMOVE_TOKEN } from '@/utils/token';
const userStore = useUserStore();

// //storeToRefs 会跳过所有的 action 属性
const { userInfo } = storeToRefs(userStore);

//action 属性直接解构
// const imgUrl = userStore.userInfo.avatar ? userStore.userInfo.avatar : 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg';

const user_status = userStore.userInfo.user_status;

const outlogin = () => {
  showSuccessToast('注销成功');
  REMOVE_TOKEN();
  router.push('/login');
};
</script>
<template>
  <div class="my">
    <div class="my-container">
      <div class="my-header">
        <img :src="userInfo.avatar" alt="头像" class="avatar" />
        <div class="user-info">
          <div class="username">{{ userInfo.nickname }}</div>
          <div class="role">{{ userInfo.role }}</div>
        </div>
      </div>
      <div class="my-content">
        <van-cell-group>
          <van-cell is-link to="/my/signature"
            ><div class="signature">个性签名：{{ userInfo.signature ? userInfo.signature : '签名' }}</div></van-cell
          >
          <van-cell is-link :to="userInfo.user_status == '未认证' ? '/my/user_status' : false"
            ><div class="user_status">
              校园认证: {{ userInfo.user_status ? userInfo.user_status : '未认证'
              }}{{  userInfo.user_status != '已认证' ? '-审核中' : '' }}
            </div></van-cell
          >
          <!-- <van-cell title="我的收藏" is-link to="/my/addresses" /> -->
          <van-cell title="用户管理" is-link to="/user-manage" v-if="userInfo.role == '管理员'" />
          <!-- <van-cell title="公告管理" is-link to="/user-manage" v-if="userInfo.role == '管理员'" /> -->
          <van-cell title="发布活动" is-link to="/activity_post" v-if="userInfo.role == '管理员'" />
          <van-cell title="检查更新" is-link to="/my/update" />
          <van-cell title="关于帮助" is-link to="/my/about" />
          <van-cell title="设置" is-link to="/my/settings" />
        </van-cell-group>
        <van-button block color="#f10" @click="outlogin"> 退出登录 </van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-container {
  padding: 20px;
}
.user_status {
  text-align: left;
  color: #000;
}
.signature {
  text-align: left;
  color: #000;
}

.my-header {
  display: flex;
  align-items: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.user-info {
  margin-left: 20px;
}

.username {
  font-size: 20px;
  font-weight: bold;
}

.role {
  font-size: 14px;
  color: #666;
}

.my-content {
  margin-top: 20px;
}
</style>
