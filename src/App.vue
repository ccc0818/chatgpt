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
  color: inherit;
}

body,
html {
  width: 100%;
  height: 100%;
}

@media (prefers-color-scheme: light) {
  body {
    color: $color;
    background-color: $background;
  }

  :root {
    --van-field-input-text-color: #000 !important;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    color: $color-dark;
    background-color: $background-dark;
  }

  :root {
    --van-field-input-text-color: #fff !important;
  }
}

li {
  list-style: none;
}

a {
  text-align: center;
  text-decoration: none;
  color: inherit;
}

#app {
  height: 100%;
  -webkit-tap-highlight-color: transparent;
}

.popup {
  box-shadow:
    0px 0px 76.2px rgba(0, 0, 0, 0.079),
    0px 0px 89.2px rgba(0, 0, 0, 0.09),
    0px 0px 149px rgba(0, 0, 0, 0.14) !important;
}


.app-container {
  overflow: hidden;
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
  }
}
</style>
