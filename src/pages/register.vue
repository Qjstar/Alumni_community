<script setup>
import md5 from 'md5';
import router from '@/router';
import { showSuccessToast, showFailToast } from 'vant';
import { ref, reactive } from 'vue';
import { register } from '@/apis/register';
//身份选择
const role = ref('');
const showPicker = ref(false);
const columns = reactive([
  { text: '学生', value: 'Student' },
  { text: '老师', value: 'Teacher' },
]);
const onConfirm = ({ selectedOptions }) => {
  role.value = selectedOptions[0]?.text;
  showPicker.value = false;
};

const username = ref('');
const nickname = ref('');
const phone = ref('');
const password = ref('');
const pass_rep = ref('');
function isValidPassword(password) {
  // 定义密码的正则表达式
  const regex = /^(?=.*[a-zA-Z])(?=.*[\u4000-\u9fa5])(?=.*[\d])(?=.*[\w\*])[a-zA-Z\u4000-\u9fa5\d\w\*]{8,}$/;
  return regex.test(password);
}

const passwordVisible = ref(false);

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};

const validatorPassword = () => {
  if (isValidPassword(password._value)) {
    return "密码格式不正确，需要包含大小写字符和特殊字符"
  }
};
const validatorMessage = () => {
  if (password._value != pass_rep._value) {
    return '密码不一致，请重新输入';
  } else {
    return true;
  }
};
const validatorPhone = () => {
  const regex = /^1[3-9]\d{9}$/;
  if (!regex.test(phone._value)) {
    return '手机号格式不正确';
  }
};
const onSubmit = async (values) => {
  await register({
    username: values.username,
    nickname: values.nickname,
    phone: values.phone,
    password: values.password,
    role: values.role,
  });
  showSuccessToast('注册成功');
  router.push('/login');
  console.log('submit', values);
};
const toLogin = () => {
  router.push('/login');
};

//验证码

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
  } else{
    "验证码不正确"
  }
};
</script>
<template>
  <div class="register">
    <van-nav-bar title="注册" />

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '姓名' }]"
        />
        <van-field
          v-model="nickname"
          name="nickname"
          label="昵称"
          placeholder="昵称0-8个字符"
          :rules="[{ required: true, message: '昵称' }]"
        />
        <van-field
          v-model="phone"
          type="tel"
          name="phone"
          label="手机号"
          placeholder="手机号"
          :rules="[{ validator: validatorPhone, required: true, message: '手机号' }]"
        />
        <van-field
          v-model="password"
          :type="passwordVisible ? 'text' : 'password'"
          name="password"
          label="密码"
          placeholder="密码：需要包含大小写和特殊字符"
          :rules="[{ validator: validatorPassword, required: true, message: '请输入密码' }]"
          right-icon="eye-o"
          @click-right-icon="togglePasswordVisible"
        />
        <van-field
          v-model="pass_rep"
          :type="passwordVisible ? 'text' : 'password'"
          name="pass_rep"
          label="重复密码"
          placeholder="重复密码"
          :rules="[{ validator: validatorMessage, required: true, message: '请再次输入密码' }]"
          right-icon="eye-o"
          @click-right-icon="togglePasswordVisible"
        />
        <van-field
          v-model="role"
          is-link
          readonly
          name="role"
          label="身份"
          placeholder="点击选择身份"
          @click="showPicker = true"
        />
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
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 注册 </van-button>
      </div>
    </van-form>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit" @click="toLogin"> 去登录 </van-button>
    </div>
  </div>
</template>
