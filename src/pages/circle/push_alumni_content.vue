<script setup>
import { reactive, onMounted } from 'vue';
import { showSuccessToast, showToast } from 'vant';
import { useUserStore } from '@/store/user';

import router from '@/router';
import { campusCreate, campusDetail, campusUpdate } from '@/apis/campus_list';
import { fileUpdata, filesUpdata } from '@/apis/file';
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.query.id;
const type = route.query.type;
const userStore = useUserStore();

//storeToRefs 会跳过所有的 action 属性
const { token } = userStore;
const alumni_info = reactive({
  id: Math.random() + 1,
  title: '',
  content: '',
  image: [],
});
const onClickLeft = () => history.back();
const onSubmit = async (value) => {
  let api = type == 'edit' ? campusUpdate : campusCreate;
  await api({
    id: id,
    title: value.title,
    content: value.content,
    image: alumni_info.image.length == 1 ? alumni_info.image[0].url : null,
  }).then(() => {
    showSuccessToast({ message: type == 'edit' ? '编辑成功' : '发布成功', });
    router.push('/alumni_circle');
  });
};

const afterRead = async (file) => {
  const formData = new FormData();
  //多文件
  if (file.length > 1) {
    file.map((value) => {
      formData.append('filelist', value.file);
    });
    let { data } = await filesUpdata(formData);
    alumni_info.image = data.filePath;
  } else {
    // 单文件
    formData.append('file', file.file);
    let { data } = await fileUpdata(formData);
    alumni_info.image[0].url = data.filePath;
  }
};

onMounted(() => {
  if (type == 'edit') {
    campusDetail(id).then((res) => {
      alumni_info.title = res.data.title;
      alumni_info.content = res.data.content;
      alumni_info.image = [{ url: res.data.image }];
    });
  }
});
</script>
<template>
  <div class="push_alumni_content">
    <van-nav-bar
      :title="type == 'edit' ? '编辑内容' : '发布内容'"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
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
        <van-button round block type="primary" native-type="submit">{{ type == 'edit' ? '修改' : '发布' }} </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped></style>
