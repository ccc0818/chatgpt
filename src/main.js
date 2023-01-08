import { createApp } from 'vue';
import App from './layouts/App.vue';
import router from './router/router';
import pinia from './plugins/pinia';
import axios from 'axios';
import request from './plugins/axios';
import { wxLogin } from './api/service';
//引入全局样式
import './assets/base.css';
import 'vant/lib/index.css';

// 打印版本号
console.log('current version: v1.0.14');
console.log('欢迎使用 chatgpt web !');

//加载配置文件
axios.get('/config.json').then(async res => {
  const config = res.data;
  request.defaults.baseURL = config.serverUrl;
  localStorage.setItem('serverUrl', config.serverUrl)

  // 微信登陆
  wxLogin();

  const app = createApp(App);
  //注册vue-router路由
  app.use(router);
  //注册pinia状态管理
  app.use(pinia);
  app.mount('#app');
})
