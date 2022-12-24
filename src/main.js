import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import 'element-plus/dist/index.css';
import router from './router/router';
import pinia from './plugins/pinia';
import { setServerUrl } from './api/api'
import { setAPI } from './api/chatgpt'

fetch("/config/config.json").then(res => {
  res.json().then(res => {
    const app = createApp(App);
    setServerUrl(res.serverUrl);
    setAPI(res.API);
    app.config.globalProperties.$config = res;

    //注册vue-router路由
    app.use(router);
    //注册pinia状态管理
    app.use(pinia);
    app.mount('#app');
  })
})






