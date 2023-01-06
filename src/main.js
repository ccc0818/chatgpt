import { createApp } from 'vue';
import App from './layouts/App.vue';
import router from './router/router';
import pinia from './plugins/pinia';
import axios from 'axios';
import request from './plugins/axios';

//引入全局样式
import 'element-plus/dist/index.css';
import './assets/common.css';

//加载配置文件
axios.get('/config.json').then(res => {
  const config = res.data;
  request.defaults.baseURL = config.serverUrl;
  console.log(request.defaults.baseURL)

  const app = createApp(App);
  //注册vue-router路由
  app.use(router);
  //注册pinia状态管理
  app.use(pinia);
  app.mount('#app');
})

















