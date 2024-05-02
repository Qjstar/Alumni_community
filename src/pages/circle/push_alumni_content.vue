<script setup>
import { reactive } from 'vue';
import { showSuccessToast } from 'vant';
import { useUserStore } from '@/store/user';

// import { alumni_list } from '@/mock/alumni_circle_list';
import router from '@/router';
import { campusCreate } from '@/apis/create_campus';
import { fileUpdata, filesUpdata } from '@/apis/file';

const userStore = useUserStore();

//storeToRefs 会跳过所有的 action 属性
const { token } = userStore;
// const fileList = ref([]);
const alumni_info = reactive({
  id: Math.random() + 1,
  title: '',
  content: '',
  image: [],
  // user: userInfo.name,
  // date: getCurrentDateTimeFormatted(),
});
const onClickLeft = () => history.back();
const onSubmit = async (value) => {
  await campusCreate({
    title: value.title,
    content: value.content,
    image: alumni_info.image.value.length > 1 ? alumni_info.image.value[0].path : alumni_info.image.value[0],
  });
  showSuccessToast('发布成功');
  router.push('/alumni_circle');
};

const afterRead = async (file) => {
  const formData = new FormData();
  //多文件
  if (file.length > 1) {
    file.map((value) => {
      formData.append('filelist', value.file);
    });
    let { data } = await filesUpdata(formData);
    alumni_info.image.value = data.filePath;
  } else {
    // 单文件
    formData.append('file', file.file);
    let { data } = await fileUpdata(formData);
    alumni_info.image.value = [];
    alumni_info.image.value.push(data.filePath);
  }
};
</script>
<template>
  <div class="push_alumni_content">
    <van-nav-bar title="发布内容" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="alumni_info.title"
          name="title"
          label="标题"
          placeholder="标题"
          maxlength="15"
          :rules="[{ required: true, message: '请填写标题' }]"
        />

        <van-field
          v-model="alumni_info.content"
          name="content"
          rows="5"
          autosize
          label="内容"
          type="textarea"
          maxlength="150"
          placeholder="请输入内容"
          show-word-limit
        />
       
      </van-cell-group>
      <van-uploader v-model="alumni_info.image" :max-count="3" :after-read="afterRead" />

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped></style>
