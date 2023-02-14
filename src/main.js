import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";

// 打印版本号
console.log("chatgpt version: v2.0.0");

createApp(App).use(router).mount("#app");
