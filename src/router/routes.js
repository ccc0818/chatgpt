export default [
  {
    path: "/",
    redirect: "/home/chat",
    children: [
      {
        name: "home",
        path: "home",
        component: () => import("../layouts/Home.vue"),
        children: [
          { path: "chat", component: () => import("../pages/Chat.vue") },
          { path: "robot", component: () => import("../pages/Robot.vue") },
          { path: "user", component: () => import("../pages/User.vue") },
        ],
      },
      { name: "vip", path: "vip", component: () => import("../pages/Vip.vue") },
      { name: "market", path: "market", component: () => import("../pages/Market.vue") },
      {
        name: "market_detail",
        path: "market_center",
        component: () => import("../pages/MarketCenter.vue"),
      },
      {
        name: "market_customer",
        path: "market_center/customer",
        component: () => import("../pages/Customer.vue"),
      },
      {
        name: "withdraw",
        path: "market_center/withdraw",
        component: () => import("../pages/WithDraw.vue"),
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: "/" }, //其它没有的路由都跳转到主页
];
