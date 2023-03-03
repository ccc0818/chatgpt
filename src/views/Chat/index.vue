<script setup>
import { ref, nextTick, onUpdated, onActivated } from 'vue';
import Bubble from './components/Bubble.vue';
import Input from './components/Input.vue';
import { useChatGPT } from '@/services';
import RobotAvatarImg from '@/assets/images/chat/robot-avatar.png';
import SecretKey from './components/SecretKey.vue';

const chatDom = ref();
const showSecret = ref(false);
const { messages, say } = useChatGPT()


/**
 * 滚动到底部
 * @param {*} isSmooth 
 */
function scrollToBottom(isSmooth = true) {
  nextTick(() => {
    if (isSmooth) {
      chatDom.value.style.scrollBehavior = 'smooth';
      chatDom.value.scrollTop = chatDom.value.scrollHeight;
    } else {
      chatDom.value.style.scrollBehavior = 'unset';
      chatDom.value.scrollTop = chatDom.value.scrollHeight;
    }
  })
}

onActivated(() => {
  scrollToBottom(false);
});

onUpdated(() => {
  scrollToBottom();
});

// 发送聊天消息
const sendHandle = (data) => {
  // 不允许输入为空
  if (!data.length) {
    return;
  }

  const key = localStorage.getItem('secret');

  // say(data, key)
  say(data)
}
</script>

<template>
  <div class="chat-container">
    <!-- main -->
    <div class="chat-list" ref="chatDom">
      <Bubble v-for="(v, i) in messages" :key="i" :isUser="v.role === 'user'"
        :avatar="v.role === 'user' ? undefined : RobotAvatarImg" :message="v.content">
      </Bubble>
    </div>
    <!-- 输入框 -->
    <Input class="input" @send="sendHandle" />

    <span class="secret-switch" @click="showSecret = !showSecret">S</span>
    <SecretKey v-show="showSecret" />
  </div>
</template>

<style scoped lang="scss">
.chat-container {
  position: relative;
  height: 100%;

  .chat-list {
    height: 100%;
    padding-top: 20px;
    padding-bottom: 50px;
    // background: #fff;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }

  .input {
    position: fixed;
    bottom: 0;
    color: inherit;
  }

  @keyframes breath {
    from {
      transform: scale(0.9);
    }

    to {
      transform: scale(1);
    }
  }

  .secret-switch {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 5px solid $theme;
    color: $theme;
    font-size: 12px;
    text-align: center;
    line-height: 25px;
    font-weight: 900;
    box-shadow: 0 0 8px #2c2c2c;
    animation: breath 1s linear infinite alternate;
    z-index: 99;
    user-select: none;
    cursor: pointer;
    backdrop-filter: blur(20px);

    &:hover {
      animation-play-state: paused;
    }
  }
}
</style>
