export default [
  {
    name: "chat",
    path: "/",
    component: () => import("@/views/Chat"),
    meta: {
      needLogin: true,
    },
  },
  {
    name: "home",
    path: "/home",
    component: () => import("@/views/Home.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];
