<script setup>
</script>

<template>
  <RouterView class="view" v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
  <div class="tabbar">
    <RouterLink class="link" active-class="active" to="/home/chat">聊天</RouterLink>
    <RouterLink class="link" active-class="active" to="/home/user">个人中心</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.view {
  width: 100%;
  height: calc(100% - 50px);
}

.tabbar {
  width: 100%;
  height: 60px;
  padding-bottom: 10px;
  border-top: 1px solid #ddd !important;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  user-select: none;
  border-top: 1px solid #eee;
  font-size: 14px;

  .link {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.45;
    text-decoration: none;
    color: #2c2c2c;
  }

  .active {
    color: #9370d8 !important;
  }
}
</style>
