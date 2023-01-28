import { createApp } from "vue";
import App from "./layouts/App.vue";
import router from "@/router";
import pinia from "./plugins/pinia";
import axios from "axios";
import request from "./plugins/axios";
import { wxLogin } from "./api/service";
import { vLongPress } from "@/directives";
//引入全局样式
import "@/styles/default.scss";
import "vant/lib/index.css";

// 打印版本号
console.log("current version: v1.4.0");
console.log("欢迎使用 chatgpt web !");

//加载配置文件
axios.get("/config.json").then(async (res) => {
  const config = res.data;
  request.defaults.baseURL = config.serverUrl;
  localStorage.setItem("serverUrl", config.serverUrl);

  const app = createApp(App);
  // 注册全局指令
  app.directive("longpress", vLongPress);
  //注册pinia状态管理
  app.use(pinia);
  //注册vue-router路由
  app.use(router);
  // 微信登陆
  // wxLogin() && app.mount("#app");
  app.mount("#app");
});
