//1. 引入路由创建函数
import { createRouter, createWebHashHistory } from "vue-router";

//2. 路由配置
const routes = [
  {
    path: '/', redirect: '/chat',
    children: [
      { path: '/chat', component: () => import('../pages/Chat.vue') },
      { path: '/user', component: () => import('../pages/User.vue') },
    ]
  },

  { path: '/:pathMatch(.*)*', redirect: '/' }, //其它没有的路由都跳转到主页
];

//3.路由实例
let router = createRouter({ routes, history: createWebHashHistory() });

//4.导出路由实例，让他去控制vue根
export default router;
