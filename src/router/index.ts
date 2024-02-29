import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(), //可传参数，配置base路径，例如'/app'
  routes,
});
import { useUserStore } from '@/store/user';

const allowedRoutes = ['/login', '/register']

router.beforeEach((to, from) => {
  // 这样做是可行的，因为路由器是在其被安装之后开始导航的，
  // 而此时 Pinia 也已经被安装。
  const userStore = useUserStore();
  if (!userStore.token && userStore.token=="" && !allowedRoutes.includes(to.path)) {
    return "/login";
  }

  // if (allowedRoutes.includes(to.path) && !userStore.token) {
  //   // next({ name: 'Login' })
  // } else{
  //   // next();
  // }
  
});

export default router;
