export default [
  {
    path: "/",
    redirect: "/home/chat",
    children: [
      {
        name: "home",
        path: "home",
        component: () => import("@/views/Home"),
        children: [
          {
            name: "chat",
            path: "chat",
            component: () => import("@/views/Chat"),
          },
          {
            name: "robot",
            path: "robot",
            component: () => import("@/views/Robot"),
          },
          {
            name: "image",
            path: "image",
            component: () => import("@/views/Image"),
          },
          {
            name: "user",
            path: "user",
            component: () => import("@/views/User"),
          },
        ],
      },
      { name: "vip", path: "vip", component: () => import("@/views/Vip") },
      {
        name: "market",
        path: "market",
        component: () => import("@/views/Market"),
      },
      {
        name: "market_detail",
        path: "market_center",
        component: () => import("@/views/MarketCenter"),
      },
      {
        name: "market_customer",
        path: "market_center/customer",
        component: () => import("@/views/Customer"),
      },
      {
        name: "withdraw",
        path: "market_center/withdraw",
        component: () => import("@/views/WithDraw"),
      },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" }, //其它没有的路由都跳转到主页
];
