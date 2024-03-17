<script setup lang="ts">
import { ref, reactive } from 'vue';
import { fileUpdata, filesUpdata } from '@/apis/file';
import router from '@/router';
import { showSuccessToast } from 'vant';
import { activityCreate } from '@/apis/activity_list';
interface Lol {
  activity_name: string;
  activity_description: string;
  activity_content: string;
  activity_image: Array<any>;
  activity_time: string;
  activity_location: string;
  organizing_unit: string;
}
let activity = reactive<Lol>({
  activity_name: '',
  activity_description: '',
  activity_content: '',
  activity_image: [],
  activity_time: '',
  activity_location: '',
  organizing_unit: '',
});

const onSubmit = async (values: any) => {
  console.log('submit', values);
  console.log(activity);
  await activityCreate({
    activity_name: activity.activity_name,
    activity_description: activity.activity_description,
    activity_content: activity.activity_content,
    activity_image: activity.activity_image[0],
    activity_time: activity.activity_time,
    activity_location: activity.activity_location,
    organizing_unit: activity.organizing_unit,
  });
  showSuccessToast('发布成功');
  router.push('/activity');
};
const onClickLeft = () => {
  history.back();
};
const columns = [
  { text: '班级', value: 'Banji' },
  { text: '院级', value: 'Yuanji' },
  { text: '社团', value: 'Shetuan' },
  { text: '组织', value: 'Zuzhi' },
  { text: '校级', value: 'Xiaoji' },
];
const afterRead = async (file: any) => {
  // console.log(file);
  const formData = new FormData();

  if (file.length > 1) {
    file.map((value: any) => {
      formData.append('filelist', value.file);
    });
    let { data } = await filesUpdata(formData);
    activity.activity_image = data.filePath;
    console.log(activity.activity_image);
  } else {
    formData.append('file', file.file);
    let { data } = await fileUpdata(formData);
    // console.log(data)
    activity.activity_image = [];
    activity.activity_image.push(data.filePath);
    console.log(activity.activity_image);
  }
};
const showPicker = ref(false);
const showPicker2 = ref(false);
const onConfirm = ({ selectedValues }: any) => {
  activity.activity_time = selectedValues.join('/');
  showPicker.value = false;
};

const onConUnit = ({ selectedOptions }: any) => {
  activity.organizing_unit = selectedOptions[0]?.text;
  showPicker2.value = false;
};
</script>

<template>
  <div class="activity_post">
    <van-nav-bar title="发布活动" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- <div>activity_post</div> -->
    <div class="post_form">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="activity.activity_name"
            name="activity_name"
            label="活动名"
            placeholder="活动名"
            :rules="[{ required: true, message: '请填写活动名' }]"
          />

          <van-field
            v-model="activity.activity_description"
            name="activity_description"
            rows="3"
            autosize
            label="活动简介"
            type="textarea"
            maxlength="50"
            placeholder="请输入活动简介"
            show-word-limit
            :rules="[{ required: true, message: '请填写活动简介' }]"
          />
          <van-field
            v-model="activity.activity_content"
            name="activity_content"
            rows="4"
            autosize
            label="活动内容"
            type="textarea"
            maxlength="200"
            placeholder="请输入活动内容"
            show-word-limit
            :rules="[{ required: true, message: '请填写活动内容' }]"
          />
          <h4>选择图片</h4>
          <van-uploader
            v-model="activity.activity_image"
            label="选择图片"
            name="activity_image"
            multiple
            :max-count="3"
            :after-read="afterRead"
          />
          <van-field
            v-model="activity.activity_time"
            is-link
            readonly
            name="activity_time"
            label="时间选择"
            placeholder="点击选择时间"
            @click="showPicker = true"
          />

          <van-popup v-model:show="showPicker" position="bottom">
            <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
          </van-popup>

          <van-field
            v-model="activity.activity_location"
            name="activity_location"
            label="活动地点"
            type="text"
            placeholder="请输入活动地点"
            :rules="[{ required: true, message: '请填写活动地点' }]"
          />
          <van-field
            v-model="activity.organizing_unit"
            is-link
            readonly
            name="organizing_unit"
            label="选择组织"
            placeholder="点击选择组织单位"
            @click="showPicker2 = true"
          />
          <van-popup v-model:show="showPicker2" position="bottom">
            <van-picker :columns="columns" @confirm="onConUnit" @cancel="showPicker2 = false" />
          </van-popup>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 提交 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
