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
        component: () => import('@/pages/home.vue'),
      },
      {
        path: "/alumni_circle",
        component: () => import('@/pages/alumni_circle.vue'),
      },
      {
        path: "/activity",
        component: () => import("@/pages/activity.vue"),
      },
      {
        path: "/my",
        component: () => import("@/pages/my.vue"),
      },
    ],
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
