<script setup>
import { reactive } from 'vue';
import { getCurrentDateTimeFormatted } from '@/utils/date';
import { showSuccessToast } from 'vant';
import { useUserStore } from '@/store/user';

import { alumni_list } from '@/mock/alumni_circle_list';
import router from '@/router';

const userStore = useUserStore();

//storeToRefs 会跳过所有的 action 属性
const { userInfo, token } = userStore;

const alumni_info = reactive({
  id: Math.random() + 1,
  title: '',
  desc: '',
  imgUrl: [],
  user: userInfo.name,
  date: getCurrentDateTimeFormatted(),
});
const onClickLeft = () => history.back();
const push_list = () => {
  alumni_list.push(alumni_info);
  showSuccessToast("发布成功")
  router.push('/alumni_circle');
};
</script>
<template>
  <div class="push_alumni_content">
    <van-nav-bar title="发布内容" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="alumni_info.title"
          name="标题"
          label="标题"
          placeholder="标题"
          maxlength="35"
          :rules="[{ required: true, message: '请填写标题' }]"
        />

        <van-field
          v-model="alumni_info.desc"
          rows="5"
          autosize
          label="内容"
          type="textarea"
          maxlength="150"
          placeholder="请输入内容"
          show-word-limit
        />
      </van-cell-group>
      <van-uploader v-model="alumni_info.imgUrl" multiple :max-count="2" />

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit" @click="push_list"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped></style>
