//1. 引入路由创建函数
import { createRouter, createWebHistory } from "vue-router";
import routes from './routes';
import { checkSecretKey } from "@/services";
import { showFailToast } from "vant";

const router = createRouter({
  routes,
  history: createWebHistory()
});

// 前置守卫
router.beforeEach((to, from, next) => { 
  if (to.meta.needLogin) { 
    if (checkSecretKey(to.query.key) !== 1) {
      if (from.path === '/home') { 
        showFailToast("无效的密钥,请检查!");
        return
      }
      next({ name: "home" })
      return;
    }
  }
  next();
});


export default router;