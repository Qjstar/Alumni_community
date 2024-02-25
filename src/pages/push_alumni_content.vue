<script setup>
import { reactive } from 'vue';
import { getCurrentDateTimeFormatted } from '@/utils/date';
import { showSuccessToast, showToast } from 'vant';
import { useUserStore } from '@/store/user';

// import { alumni_list } from '@/mock/alumni_circle_list';
import router from '@/router';
import { campusCreate } from '@/apis/create_campus';
import { fileUpdata } from '@/apis/file';

const userStore = useUserStore();

//storeToRefs 会跳过所有的 action 属性
const { userInfo, token } = userStore;

const alumni_info = reactive({
  id: Math.random() + 1,
  title: '',
  content: '',
  image: [{ url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }],
  // user: userInfo.name,
  // date: getCurrentDateTimeFormatted(),
});
const onClickLeft = () => history.back();
const onSubmit = async (value) => {
  // alumni_list.unshift(alumni_info);
  await campusCreate({
    title: value.title,
    content: value.content,
    image: alumni_info.image[0].objectUrl
      ? alumni_info.image[0].objectUrl
      : 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
  });
  showSuccessToast('发布成功');
  router.push('/alumni_circle');
};
const beforeRead = (file) => {
  // 在此处执行文件验证逻辑，例如检查文件类型、大小等
  // 如果文件无效，您可以返回 false 以阻止上传
  if (!file.type.includes('image/')) {
    showToast('请上传图片文件');
    return false;
  }
  return true;
};
const afterRead = async (filet) => {
  // 在此处执行文件上传操作
  const formData = new FormData();
  formData.append('file', filet.file);
  console.log(formData);
  try {
    const response = await fileUpdata(formData);
    if (response.status === 200) {
      const data = response.data;
      // 将上传后的文件地址添加到 alumni_info.image 数组中
      this.alumni_info.image.push(data.filePath);
    } else {
      showToast('文件上传失败');
    }
  } catch (error) {
    showToast('文件上传失败');
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
      <van-uploader
        v-model="alumni_info.image"
        multiple
        :max-count="1"
        :before-read="beforeRead"
        :after-read="afterRead"
      />

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit" @click="push_list"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped></style>
