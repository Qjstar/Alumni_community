<template>
  <div class="userManage">
    <van-nav-bar title="用户管理" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-search v-model="search" placeholder="搜索用户" @change="searchUser(search)" />
    <van-button type="primary" @click="addUser">添加用户</van-button>

    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="(user, index) in users"
        :key="index"
        :title="user.username"
        :value="user.role"
        :label="user.phone"
        is-link
        @click="editUser(user)"
      >
        <template #right-icon>
          <van-icon name="delete" @click="deleteUser(user)" />
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
<script setup>
import { queryUserList, queryUserById, userCreate, userUpdate, userDelete } from '@/apis/user_list';
import { ref } from 'vue';
import { listdecrypt } from '@/utils/mdPwd';
import { showConfirmDialog } from 'vant';
const users = ref([]);
const loading = ref(false);
const finished = ref(false);
const search = ref('');

const onLoad = async () => {
  let { data } = await queryUserList();
  console.log(data);

  data.forEach((us) => {
    users.value.push(us);
  });
  loading.value = false;
  finished.value = users.value.length >= 15;
  console.log(users.value);
};

const addUser = () => {
  // 添加用户逻辑
};

const editUser = (user) => {
  // 编辑用户逻辑
};
const onClickLeft = () => {
  history.back();
};
const searchUser = (user) => {
  // await queryUserById(user.id).then((res) => {
  //   users.value = res.data
  // });
  // console.log(user.id);
  // users.value =  users.value.filter((item) => {
  //   return item.username.includes(user);
  // });
};
const deleteUser = (user) => {
  showConfirmDialog({ message: '确定要删除这个用户吗？', theme: 'round-button' })
    .then(() => {
      users.value = users.value.filter((item) => item !== user);
      console.log(user.id)
      userDelete(user.id)
    })
    .catch((e) => {
      e;
    });
};
</script>

<style lang="scss" scoped></style>
