<script setup>
import { ref } from 'vue';
import sendImage from '@/assets/images/chat/send.png';
const input = ref('');

const emits = defineEmits(['send']);

function sendHandle() {
  emits('send', input.value);
  input.value = '';
}
</script>

<template>
  <div class="input-container">
    <input class="input" type="text" v-model.trim="input" placeholder="你想和我聊点什么?"
      @keydown.enter="!$event.isComposing && sendHandle()">
    <div class="send" :class="!input.length ? 'disable' : ''" @click="sendHandle()">
      <img :src="sendImage">
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-container {
  height: 50px;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  position: absolute;
  bottom: 50px;
  background-color: #fff;

  .input[type=text] {
    flex: 1;
    outline: none;
    border: none;
    border-radius: 8px;
    height: 80%;
    text-align: center;
    color: #828284;
    background-color: #eee;
    font-size: 16px;
    margin: 0 10px 0 0;

    &::placeholder {
      font-size: 14px;
      color: #aaa;
    }
  }

  .send {
    margin: 0 5px;
    height: 80%;
    aspect-ratio: 1/.7;
    padding: 5px;
    cursor: pointer;
    background-color: lighten($theme, 30);
    border: 2px solid $theme;
    border-radius: 10px;
    flex: 0 0 auto;

    &.disable {
      filter: grayscale(.8);
      cursor: not-allowed;
    }

    img {
      width: 100%;
      height: 100%;
      background-color: transparent;
      -webkit-user-drag: none;
      object-fit: contain;
    }
  }
}
</style>
