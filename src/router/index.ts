import { createRouter, createWebHistory } from 'vue-router';
import { routes,adminRouter } from './routes';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { useUserStore } from '@/store/user';
import { GET_TOKEN } from '@/utils/token';

const router = createRouter({
  history: createWebHistory(), //可传参数，配置base路径，例如'/app'
  routes,
});

const allowedRoutes = ['/login', '/register'];

router.beforeEach((to, from, next) => {
  // 这样做是可行的，因为路由器是在其被安装之后开始导航的，
  // 而此时 Pinia 也已经被安装。
  const userStore = useUserStore();
  nprogress.start();
  if (!userStore.token && !allowedRoutes.includes(to.path)) {
    // return '/login';
    next({ path: '/login' });
  } else {
    // if(to.path == '/login'){
    //   next({path: '/'})
    // }
    next();
  }
  // 针对自定义路由页面刷新的情况(刷新时to.name为null)
  if (!to.name) {
    router.addRoute(adminRouter);
    next({ ...to, replace: true });
  } else {
    next();
  }
  // if(userStore.token ){
  //   if(to.path == '/login'){
  //     next({path: '/'})
  //   }else{
  //     next();
  //   }
  // }

  // if (allowedRoutes.includes(to.path) && !userStore.token) {
  //   // next({ name: 'Login' })
  // } else{
  //   // next();
  // }
});
router.afterEach((to, from) => {
  nprogress.done();
});

export default router;
