<script setup>
</script>

<template>
  <div class="viewport">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </div>
</template>

<style scoped lang="scss">
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
    border: 3px solid $theme;
    box-shadow: 0 20px 30px -20px var(--theme-color);
  }
}
</style>
