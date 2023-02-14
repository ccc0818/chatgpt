<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style lang="scss">
* {
  font-family: "苹方-简", "微软雅黑", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html {
  width: 100%;
  height: 100%;
}

#app {
  height: 100%;
  -webkit-tap-highlight-color: transparent;
  // background-color: $background;
}

.app-container {
  overflow: hidden;
  background-color: #fff;
  height: 100%;
  position: relative;
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
    // border: 3px solid $theme;
    // box-shadow: 50px 50px 100px lighten($theme, 20),
    //   -50px -50px 100px darken($color: $theme, $amount: 20);
  }
}
</style>
