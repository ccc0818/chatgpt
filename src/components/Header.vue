<script setup>
// props
defineProps({
  title: String,
})

// emits
const emits = defineEmits(['onBack', 'onMenu']);
</script>

<template>
  <div class="header">
    <span class="iconfont icon-fanhui1 back" @click="emits('onBack')"></span>
    <span class="title" v-if="title">{{ title }}</span>
    <span class="menu" @click="emits('onMenu')">
      <slot name="menu"></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/icon-fonts/iconfont.css';

.header {
  position: absolute;
  width: 100%;
  height: 50px;
  // background-color: $tabbar-bg;
  color: $theme;
  backdrop-filter: blur(20px);
  top: 0;
  left: 0;
  z-index: 99;

  .back {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    font-weight: 500;
  }

  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    letter-spacing: 2px;
  }

  .menu {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
