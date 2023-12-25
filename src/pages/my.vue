<script setup lang="ts">
import { useUserStore } from '@/store/user'; //路径别名，引入store

const userStore = useUserStore();
const { updateToken } = userStore;
import router from '@/router';
import { showSuccessToast  } from 'vant';
    const outlogin = () =>{
        showSuccessToast('注销成功');
        updateToken('');
        router.push("/login")
    }
</script>
<template>
    <div class="my">
        <van-button @click="outlogin">
            退出登录
        </van-button>
    </div>
</template>