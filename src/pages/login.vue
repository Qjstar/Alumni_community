<script setup>
import md5 from 'md5';
import router from '@/router';
import { showSuccessToast, showFailToast } from 'vant';
import { ref, reactive } from 'vue';
import { useUserStore } from '@/store/user'; //路径别名，引入store
import { login } from '@/apis/login';
import imageCode from '@/components/imageCode.vue';
const userStore = useUserStore();
const { updateToken, updateUserInfo } = userStore;

const phone = ref('');
const password = ref('');
const passwordVisible = ref(false);
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
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};


const onSubmit = async (values) => {
  const { data } = await login({ phone: values.phone, password: values.password });
  if (!data) {
    showFailToast('用户名或密码错误');
  }
  console.log(data)
  if (data.token != null) {
    updateUserInfo({
      userId: data.id,
      name: data.username,
      nickname: data.nickname,
      signature: data.signature ? data.signature : null,
      role: data.role,
      avatar: data.avatar,
      user_status: data.user_status,
    });
    updateToken(data.token);
    if (data.user_status == '已认证') {
      router.push('/');
      showSuccessToast('登录成功');
    } else {
      router.push('/user_status');
      showSuccessToast('登录成功');
    }
    // console.log('submit', values);
  }
};

const toRegister = () => {
  router.push('/register');
};
</script>
<template>
  <div class="login">
    <van-nav-bar title="登录" />

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="phone"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          :type="passwordVisible ? 'text' : 'password'"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          right-icon="eye-o"
          @click-right-icon="togglePasswordVisible"
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
      </van-cell-group>

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 登录 </van-button>
      </div>
    </van-form>
    <div style="margin: 16px">
      <van-button round block type="primary" @click="toRegister"> 去注册 </van-button>
    </div>
  </div>
</template>

<style scoped>
.login {
}
</style>
