<template>
  <div class="userManage">
    <van-nav-bar title="用户管理" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-search show-action v-model="search" placeholder="搜索用户" @change="searchUser(search)" @cancel="onCancel" />
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
        <div>{{ user.role }}</div>
        <div>{{ user.stuNo }}</div>
        <template #right-icon>
          <van-icon name="delete" @click="deleteUser(user)" />
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
<script setup>
import { queryUserList, queryUserById, userCreate, userUpdate, userDelete } from '@/apis/user_list';
import { ref,onMounted } from 'vue';
import { listdecrypt } from '@/utils/mdPwd';
import { showConfirmDialog } from 'vant';
import { useRouter } from 'vue-router';

const users = ref([]);
const loading = ref(false);
const finished = ref(false);
const search = ref('');
const router = useRouter();
const onLoad = async () => {
  let { data } = await queryUserList();

  data.forEach((us) => {
    users.value.push(us);
  });
  loading.value = false;
  finished.value = users.value.length >= 15;
};

const addUser = () => {
  // 添加用户逻辑
  router.push('add-user');
};

const editUser = (user) => {
  // 编辑用户逻辑
};
const onCancel = async () => {
  search.value = '';
  let { data } = await queryUserList();

  data.forEach((us) => {
    users.value.push(us);
  });
};
const onClickLeft = () => {
  history.back();
};
const searchUser = async (user) => {
  users.value = users.value.filter((item) => {
    return item.username.includes(user);
  });
};
const deleteUser = (user) => {
  showConfirmDialog({ message: '确定要删除这个用户吗？', theme: 'round-button' })
    .then(() => {
      users.value = users.value.filter((item) => item !== user);
      userDelete(user.id);
    })
    .catch((e) => {
      e;
    });
};
onMounted(() => {
  onLoad();
});
</script>

<style lang="scss" scoped></style>
