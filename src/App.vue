<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.app-container {
  overflow: hidden;
  background-color: #fff;
  height: 100%;
}

@media (width > 750px) {
  .app-container {
    position: relative;
    width: clamp(375px, 800px, 800px);
    height: 80vh;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    border: 3px solid $theme;
    box-shadow: 50px 50px 100px lighten($theme, 20),
      -50px -50px 100px darken($color: $theme, $amount: 20);
  }
}
</style>
