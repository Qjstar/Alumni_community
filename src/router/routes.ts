import { useUserStatusStore } from '@/store/userStatus';

const routes = [
  {
    path: "/login",
    component: () => import("@/pages/login.vue"),
  },
  {
    path: "/register",
    component: () => import("@/pages/register.vue"),

  },
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
    redirect: '/home', 
    children: [
      {
        path: "/home",
        name: 'home',
        component: () => import('@/pages/home.vue'),
        meta:{
          title: "home",
          icon: "lock",
          roles: ["admin","editor"]
        }
      },
      {
        path: "alumni_circle",
        component: () => import('@/pages/alumni_circle.vue'),
      },
      {
        path: "activity",
        component: () => import("@/pages/activity.vue"),
      },
      {
        path: "my",
        component: () => import("@/pages/my.vue"),
      },
    ],
  },
  {
    path: "/my/user_status",
    component: () => import("@/pages/my/user_status.vue"),
    beforeEnter: (to:any, from:any, next:Function) => {
      const userStatusStore = useUserStatusStore();

      if(to.path == '/my/user_status'){
        if(userStatusStore.token != "已提交"){
            next();
        }else{
          alert("已认证")
          next({name:'home'})
        }
      }
    }
  },
  {
    path: "/push_alumni_content",
    component: () => import('@/pages/push_alumni_content.vue'),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/notFound.vue"),
  },
];

export default routes;
