<script setup>
import { ref } from 'vue';
import sendImage from '@/assets/images/chat/send.png';
const input = ref('');
const emits = defineEmits(['send']);
const props = defineProps({
  placeholder: {
    default: ''
  }
})

function sendHandle() {
  emits('send', input.value);
  input.value = '';
}
</script>

<template>
  <div class="input-container">
    <input class="input" type="text" v-model.trim="input" :placeholder="placeholder"
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
  backdrop-filter: blur(20px);

  @media (prefers-color-scheme: light) {
    .input[type=text] {
      background-color: #fff;

      &::placeholder {
        font-size: 14px;
        color: lighten($color: $color, $amount: 20);
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    .input[type=text] {
      background-color: lighten($color: $background-dark, $amount: 20);

      &::placeholder {
        font-size: 14px;
        color: darken($color: $color-dark, $amount: 20);
      }
    }
  }

  .input[type=text] {
    flex: 1;
    outline: none;
    border: none;
    border-radius: 8px;
    height: 80%;
    text-align: center;
    font-size: 16px;
    margin: 0 10px 0 0;
  }

  .send {
    margin: 0 5px;
    height: 80%;
    aspect-ratio: 1/.7;
    padding: 5px;
    cursor: pointer;
    background-color: lighten($theme, 20);
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
