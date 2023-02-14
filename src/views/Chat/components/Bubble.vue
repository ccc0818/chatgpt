<script setup>
import { ref } from 'vue';
import { showMessage } from '@/utils'
const copyBtn = ref();

const props = defineProps({
  isUser: {
    type: Boolean,
    require: true,
    default: false,
  },
  avatar: {
    type: String,
    default: undefined
  },
  message: String
});

const copyHandle = () => {
  navigator.clipboard.writeText(props.message);
  // hidecopyHandle();
  showMessage({
    message: "已复制",
    duration: 500
  });
}
</script>

<template>
  <div v-if="!isUser" class="wrapper">
    <div class="avatar">
      <img class="img" :src="avatar">
    </div>
    <div class="msg-box">
      <div class="blob blob-ai">
        {{ message }}
      </div>
      <span ref="copyBtn" class="iconfont icon-fuzhi copy-btn" @click.stop="copyHandle"></span>
    </div>
  </div>
  <div v-else class="wrapper wrapper-user">
    <div class="blob blob-user">
      {{ message }}
    </div>
    <div v-if="avatar !== undefined" class="avatar avatar-user">
      <img class="img" :src="avatar">
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/icon-fonts/iconfont.css';

.wrapper {
  width: 100%;
  min-height: 80px;
  padding: 10px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  .msg-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: auto;

    .copy-btn {
      display: block;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      user-select: none;
      background-color: lighten($theme, 25%);
      border-radius: 50%;
      margin-left: 10px;
      flex: 0 0 auto;
      cursor: pointer;
      transition: .2s;
      // transform: scale(1);
    }

    .blob-ai {
      max-width: 80%;
    }
  }

  @media (width > 750px) {
    .copy-btn {
      transform: scale(0);
    }
    &:hover .copy-btn {
      transform: scale(1);
    }
  }
}

.wrapper-user {
  justify-content: flex-end
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  border: 2px solid #fff;
  background-color: #fff;
  flex-shrink: 0;
}

.avatar-user {
  margin-right: 0px;
  margin-left: 10px;
}

.avatar .img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-user-drag: none;
}

.blob {
  font-size: 14px;
  background-color: #d7d8db;
  color: #000;
  max-width: 70%;
  padding: 15px;
  border-radius: 3px 12px 12px 12px;
  box-sizing: border-box;
  word-break: break-all;
  white-space: pre-wrap;
  transition: width height .3s linear;
  // user-select: none;
}

.blob-user {
  border-radius: 12px 3px 12px 12px;
  color: #f1f2f6;
  background-color: $theme;
}
</style>
