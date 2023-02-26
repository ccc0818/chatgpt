<script setup>
import { ref } from 'vue';
import { showMessage } from '@/utils'
import RobotImg from '@/assets/images/chat/robot-avatar.png'

const copyBtn = ref();
const imgElRef = ref(null);

const props = defineProps({
  isUser: {
    type: Boolean,
    require: true,
    default: false,
  },
  avatar: {
    default: RobotImg
  },
  type: { // text image
    default: 'text',
  },
  content: String,
});

// methods
// const showcopyHandle = () => {
//   copyBtn.value.style.transform = 'scale(1)';
// }

// const hidecopyHandle = () => {
//   copyBtn.value.style.transform = 'scale(0)';
// }

function copyImg() { 
  window.getSelection().removeAllRanges();
  let range = document.createRange()
  range.selectNode(imgElRef.value);
  window.getSelection().addRange(range);
  document.execCommand("Copy");
  window.getSelection().removeAllRanges();
}

const copyHandle = () => {
  if (props.type === 'text') {
    navigator.clipboard.writeText(props.content);
  } else if (props.type === 'image'){ 
    copyImg();
  }

  showMessage({
    type: 'success',
    message: '已复制到剪切板'
  })
}
</script>

<template>
  <div v-if="!isUser" class="wrapper">
    <div class="avatar">
      <img class="img" :src="avatar">
    </div>
    <div class="msg-box">
      <div class="blob blob-ai" style="color: #2c2c2c;">
        <template v-if="type === 'text'" >
          {{ content }}
        </template>
        <template v-else-if="type === 'image'">
          <img ref="imgElRef" class="img-msg" :src="content" alt="图片加载失败">
        </template>
      </div>
      <span ref="copyBtn" class="iconfont icon-fuzhi copy-btn" @click.stop="copyHandle"></span>
    </div>
  </div>
  <div v-else class="wrapper wrapper-user">
    <div class="blob blob-user">
      {{ content }}
    </div>
    <div v-if="avatar" class="avatar avatar-user">
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

    .copy-btn {
      display: block;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      user-select: none;
      background-color: $theme;
      border-radius: 50%;
      margin-left: 10px;
      flex: 0 0 auto;
      cursor: pointer;
      transition: .2s;
      // transform: scale(1);
    }

    .blob-ai {
      flex-grow: 1;
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
  border: 1px solid #fff;
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
  max-width: 70%;
  padding: 15px;
  border-radius: 3px 12px 12px 12px;
  box-sizing: border-box;
  word-break: break-all;
  white-space: pre-wrap;
  transition: width height .3s linear;
  // user-select: none;

  .img-msg {
    width: 100%;
  }
}

.blob-user {
  border-radius: 12px 3px 12px 12px;
  // color: #f1f2f6;
  background-color: lighten($theme, 10) ;
}
</style>
