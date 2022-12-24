<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { ElLoading, ElMessage } from 'element-plus';
import { wxAuthorize } from './api/api';
import { useUserStore } from './stores/user';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

onBeforeMount(() => {
  // 获取wx授权
  wxAuthorize((res) => {
    const { user } = storeToRefs(useUserStore());
    if (res.openid) {
      const { name, img, state, id, openid } = res;
      user.value = { login: true, id, name, avatar: img, vip: state === "0" ? false : true, openid };
    } 
  });
});

const tabChange = (path) => {
  if (route.path !== path) {
    router.push(path);
  }
}
</script>

<template>
  <div class="viewport">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
    <div class="tabbar">
      <div :class="route.path === '/chat' ? 'active' : ''" @click="tabChange('/chat')">chatgpt</div>
      <div :class="route.path === '/user' ? 'active' : ''" @click="tabChange('/user')">个人中心</div>
    </div>
  </div>
</template>

<style scoped>
.viewport {
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media screen and (max-width: 750px) {
  .viewport {
    width: 100%;
    height: 100vh;
    bottom: 0;
    left: 0;
  }
}

@media screen and (min-width: 751px) {
  .viewport {
    width: 800px;
    height: 80vh;
    min-width: 375px;
    max-height: 80vh;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
    border: 8px solid var(--theme-color);
    border-radius: 10px;
    box-shadow: 0 0 30px 3px var(--theme-color);
  }
}

.tabbar {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  user-select: none;
  cursor: pointer;
}

.tabbar div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.45;
}

@media screen and (max-width:750px) {
  .tabbar .active {
    color: mediumpurple;
  }

  .tabbar {
    box-shadow: 0 -5px 5px -3px grey;
    border-top: 1px solid grey;
  }

  .tabbar div {
    font-size: 16px;
    width: 80px;
    height: 100%;
    outline: none;
    border: none;
    color: var(--theme-color);
    cursor: pointer;
  }

  .tabbar div:active {
    background-color: transparent;
  }
}

@media screen and (min-width:751px) {
  .tabbar .active {
    background-color: #515151;
  }

  .tabbar {
    background-color: var(--theme-color);
  }

  .tabbar div {
    /* flex: 0.3; */
    height: 80%;
    border-radius: 3px;
    outline: none;
    border: none;
    color: #fff;
    cursor: pointer;
    background-color: transparent;
  }

  .tabbar div:hover {
    background-color: #515151;
  }
}
</style>
