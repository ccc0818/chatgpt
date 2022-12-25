import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router/router';
import pinia from './plugins/pinia';
import { setServerUrl } from './api/api';

//引入全局样式
import './style.css';
import 'element-plus/dist/index.css';

axios.get("/config/config.json").then(res => {
  localStorage.setItem('serverUrl', res.data.serverUrl);
  setServerUrl(res.data.serverUrl);
  
  const app = createApp(App);
  //注册vue-router路由
  app.use(router);
  //注册pinia状态管理
  app.use(pinia);
  app.mount('#app');
})










