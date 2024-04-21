<script setup>
import { ref, reactive } from 'vue';
import md5 from 'md5';
import { showSuccessToast, showFailToast } from 'vant';
import { userAuthenticate } from '@/apis/user_list';
import { fileUpdata } from '@/apis/file';
import { useUserStore } from '@/store/user';
import router from '@/router';
const user = useUserStore();

const form = reactive({
  username: '',
  stuNo: '',
  stuCard: [],
});

const image_code_pd = ref('');
const image_code = reactive({
  change_img_code: false, // 刷新验证码
  img_code: '', // 加密后的验证码值
});

// 刷新验证码操作
const changeImageCode = () => {
  image_code.change_img_code = !image_code.change_img_code;
};

// 接收组件返回加密后的验证码值
const backImageCode = (code) => {
  image_code.img_code = code;
  console.log('data', image_code.img_code);
};

//验证图片验证码
const validatorImgCode = (value) => {
  // 将用户输入的验证码值进行 MD5 加密
  const encryptedValue = md5(value.toLowerCase());

  // 比较加密后的验证码值是否与后端返回的加密验证码值相同
  if (encryptedValue === image_code.img_code) {
    return true;
  } else {
    return '验证码不正确';
  }
};

const onClickLeft = () => history.back();
// 图片上传
const afterRead = async (file) => {
  // console.log(file);
  const formData = new FormData();

  formData.append('file', file.file);
  console.log(typeof formData);

  let { data } = await fileUpdata(formData);
  form.stuCard.value = [];
  form.stuCard.value.push(data.filePath);

  console.log(form.stuCard);
};
const onSubmit = async () => {
  await userAuthenticate(user.getUserId, { username: form.username, stuNo: form.stuNo, stuCard: form.stuCard.value[0] })
    .then((res) => {
      showSuccessToast('认证成功');
      user.updateStatus("已认证")
      router.push('/my');
    })
    .catch((err) => {
      showFailToast(err.message);
    });
  // console.log(token);
  // showSuccessToast('提交成功');
};
</script>
<template>
  <div class="user_status">
    <van-nav-bar title="校园认证" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="form.username"
          label="姓名"
          placeholder="请输入姓名"
          name="username"
          :rules="[{ required: true, message: '请输入姓名' }]"
        ></van-field>
        <van-field
          v-model="form.stuNo"
          label="学号"
          placeholder="请输入学号"
          type="text"
          name="stuNo"
          :rules="[{ required: true, message: '请输入学号' }]"
        ></van-field>
        <van-row :gutter="5" justify="space-between">
          <van-col span="14">
            <van-field
              v-model="image_code_pd"
              type="text"
              name=" image_code"
              label="验证码"
              placeholder="验证码"
              :rules="[{ validator: validatorImgCode, required: true, message: '请填写验证码' }]"
            />
          </van-col>
          <van-col span="8">
            <image-code
              :change="image_code.change_img_code"
              @click="changeImageCode"
              @get-code="backImageCode"
            ></image-code>
          </van-col>
        </van-row>
        <van-cell>
          请上传学生证或者学生卡：
          <van-uploader v-model="form.stuCard" :max-count="1" :after-read="afterRead" />
        </van-cell>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
