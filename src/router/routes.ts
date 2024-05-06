import { useUserStore } from '@/store/user';
export const routes: any = [
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
  },
  {
    path: '/register',
    component: () => import('@/pages/register.vue'),
  },
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/home.vue'),
        meta: {
          title: 'home',
          icon: 'lock',
          role: ['管理员', '学生'],
        },
      },
      {
        path: 'alumni_circle',
        component: () => import('@/pages/circle/alumni_circle.vue'),
      },
      {
        path: 'activity',
        component: () => import('@/pages/activity/activity.vue'),
        meta: {
          title: '首页', //菜单名称
          role: ['管理员'], //当前菜单哪些角色可以看到
        },
      },
      {
        path: 'my',
        component: () => import('@/pages/my/my.vue'),
      },
      {
        path: 'affiche',
        component: () => import('@/pages/affiche.vue'),
      },
    ],
  },
  {
    path: '/push_alumni_content',
    component: () => import('@/pages/circle/push_alumni_content.vue'),
  },
  {
    path: '/activity_info/:id',
    name: 'activity_info',
    component: () => import('@/pages/activity/activity_info.vue'),
  },
  {
    path: '/activity_post',
    component: () => import('@/pages/activity/activity_post.vue'),
  },
  {
    path: '/my/update',
    name: 'update',
    component: () => import('@/pages/my/update.vue'),
  },
  {
    path: '/my/about',
    name: 'about',
    component: () => import('@/pages/my/about.vue'),
  },
  {
    path: '/my/user_status',
    component: () => import('@/pages/my/user_status.vue'),
    // beforeEnter: (to: any, next: Function) => {

    //   if (to.path == '/my/user_status') {
    //     if (useUserStore().getUserStatus != '已认证') {
    //       next();
    //     } else {
    //       alert('已认证');
    //       next({ name: 'home' });
    //     }
    //   }
    // },
  },
  {
    path: '/user-manage',
    name: 'userManage',
    component: () => import('@/pages/userManage/index.vue'),
  },
  {
    path: '/add-user',
    name: 'addUser',
    component: () => import('@/pages/userManage/addUser.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/notFound.vue'),
  },
];

export const adminRouter: any = [
  {
    path: '/user-manage',
    name: 'userManage',
    component: () => import('@/pages/userManage/index.vue'),
  },
];
