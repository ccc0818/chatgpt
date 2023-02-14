//1. 引入路由创建函数
import { createRouter, createWebHistory } from "vue-router";
import routes from './routes';
import { checkSecretKey } from "@/services";
import { showMessage} from "@/utils"

const router = createRouter({
  routes,
  history: createWebHistory()
});

// 前置守卫
router.beforeEach(async (to, from, next) => { 
  if (to.meta.needLogin) { 
    const res = await checkSecretKey(to.query.key);
    console.log(res);
    if (res !== 1) {
      if (from.path === '/home') { 
        showMessage({ type: "error", message: "无效的密钥,请检查!" });
        return
      }
      next({ name: "home" })
      return;
    }
  }
  next();
});


export default router;