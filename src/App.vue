<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { wxUserInfo } from './api/api';
import { useUserStore } from './stores/user';

onBeforeMount(() => {
  // 获取wx用户信息
  wxUserInfo((res) => {
    const { user } = storeToRefs(useUserStore());
    const { name, img, state, id, key } = res;
    user.value = { login: true, id, name, avatar: img, vip: state === "0" ? false : true, key};
  });
});
</script>

<template>
  <div class="viewport">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
    <div class="tabbar">
      <RouterLink class="link" active-class="active" to="/chat">聊天</RouterLink>
      <RouterLink class="link" active-class="active" to="/user">个人中心</RouterLink>
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
    border-radius: 10px;
    border: 3px solid #9370d8;
    box-shadow: 0 20px 30px -20px var(--theme-color);
  }
}

.tabbar {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  user-select: none;
}

.tabbar .link {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.45;
  text-decoration: none;
}

.tabbar .active {
  color: #9370d8 !important;
}

.tabbar {
  border-top: 1px solid #eee;
}

.tabbar .link {
  font-size: 12px;
  height: 100%;
  color: #666666;
}
</style>
