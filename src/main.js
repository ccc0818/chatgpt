import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import 'element-plus/dist/index.css';
import router from './router/router';
import pinia from './plugins/pinia';

const app = createApp(App);
//注册vue-router路由
app.use(router);
//注册pinia状态管理
app.use(pinia);
app.mount('#app');




