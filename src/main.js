import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "vant/lib/index.css";

// 打印版本号
console.log("chatgpt version: v2.0.0");

//加载配置文件
fetch("/config.json").then(async res => {
  const config = await res.json(); 
  localStorage.setItem("config", JSON.stringify(config));

  createApp(App)
    .use(router)
    .mount("#app");
});
