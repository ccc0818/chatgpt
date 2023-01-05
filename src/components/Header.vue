<script setup>
import {defineProps, defineEmits} from 'vue';
defineProps({
  title: String,
})
const emits = defineEmits(['onBack']);
</script>

<template>
  <div class="header">
    <span class="iconfont icon-fanhui1 back" @click="emits('onBack')"></span>
    <span class="title" v-if="title">{{title}}</span>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/icon-fonts/iconfont.css';

.header {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: #fff;
  color: #222;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;

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
}
</style>
