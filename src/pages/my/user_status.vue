<script setup>
import imageCode from '@/components/imageCode.vue';
import { ref, reactive } from 'vue';
import md5 from 'md5';
import {useUserStatusStore} from "@/store/userStatus"
import { showSuccessToast, showFailToast } from 'vant';
import router from '@/router';


const form = reactive({
  username: '',
  stuNo: '',
  imgUrl: [],
});

const userStatusStore = useUserStatusStore();
const {updateToken,token} = userStatusStore;

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

const onSubmit = () => {
    updateToken("已提交")
    console.log(token)
    showSuccessToast("提交成功")
    router.push("/my")
}
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
            @getCode="backImageCode"
          ></image-code>
        </van-col>
      </van-row>
      <van-cell>
        请上传学生证或者学生卡：
      <van-uploader v-model="form.imgUrl.value" multiple :max-count="1" />
      </van-cell>
    </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
