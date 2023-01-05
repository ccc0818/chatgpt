import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router/router';
import pinia from './plugins/pinia';
import { setServerUrl, wxAuthorize } from './api/api';

//引入全局样式
import 'element-plus/dist/index.css';
import './common.css';

// 初始化配置
axios.get("/config/config.json").then(res => {
  localStorage.setItem('serverUrl', res.data.serverUrl);
  setServerUrl(res.data.serverUrl);
  
  // 获取wx授权
  // wxAuthorize();

  const app = createApp(App);
  //注册vue-router路由
  app.use(router);
  //注册pinia状态管理
  app.use(pinia);
  app.mount('#app');
})










