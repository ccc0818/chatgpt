//1. 引入路由创建函数
import { createRouter, createWebHashHistory } from "vue-router";
import routes from './routes';

export default createRouter({ routes, history: createWebHashHistory() });

