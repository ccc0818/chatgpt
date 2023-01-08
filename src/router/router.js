//1. 引入路由创建函数
import { createRouter, createWebHashHistory } from "vue-router";

//2. 路由配置
const routes = [
  {
    path: '/', redirect: '/home/chat',
    children: [
      {
        path: 'home', component: () => import('../layouts/Home.vue'),
        children: [
          { path: 'chat', component: () => import('../pages/Chat.vue') },
          { path: 'robot', component: () => import('../pages/Robot.vue') },
          { path: 'user', component: () => import('../pages/User.vue') },
        ]
      },
      { path: 'vip', component: () => import('../pages/Vip.vue') },
      { path: 'market', component: () => import('../pages/Market.vue') },
      { path: 'market_center', component: () => import('../pages/MarketCenter.vue') },
      { path: 'market_center/customer', component: () => import('../pages/Customer.vue') },
      { path: 'market_center/withdraw', component: () => import('../pages/WithDraw.vue') },
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }, //其它没有的路由都跳转到主页
];

//3.路由实例
let router = createRouter({ routes, history: createWebHashHistory() });

//4.导出路由实例，让他去控制vue根
export default router;
