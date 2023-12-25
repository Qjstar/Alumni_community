import { createApp } from 'vue';
import './style.css';
import App from './App.vue';


import { Icon } from 'vant'
// 2. 引入组件样式
import 'vant/lib/index.css';
import router from "./router/index";

import store from './store';

const app = createApp(App);
app.use(Icon);
app.use(router); //注册路由
app.use(store);



app.mount('#app');
