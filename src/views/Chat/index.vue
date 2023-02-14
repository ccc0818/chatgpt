<script setup>
import { ref, nextTick, onUpdated, onActivated } from 'vue';
import Bubble from './components/Bubble.vue';
import Input from './components/Input.vue';
import { gptSendMessage } from '@/services';
import RobotAvatarImg from '@/assets/images/chat/robot-avatar.png';

const chatDom = ref();
const msgList = ref([
  { id: 0, isUser: false, message: "你好，我是您的聊天助手。"}
]);
let id = 0;

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
const sendHandle = async (data) => {
  // 不允许输入为空
  if (!data.length) {
    return;
  }

  // 保存用户输入的信息
  msgList.value.push({ id: id++, isUser: true, message: data })

  // 获取到收到的数据
  let newIndex = null;
  gptSendMessage(msgList.value, (content) => {
    if (newIndex === null)
      newIndex = msgList.value.push({ id: id++, isUser: false, message: content }) - 1;
    else
      msgList.value[newIndex].message = content;
  });
}
</script>

<template>
  <div class="chat-container">
    <!-- main -->
    <div class="chat-list" ref="chatDom">
      <Bubble v-for="item of msgList" :key="item.id" :isUser="item.isUser" :avatar="item.isUser ? undefined : RobotAvatarImg" :message="item.message">
      </Bubble>
    </div>
    <!-- 输入框 -->
    <Input class="input" @send="sendHandle" />
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
    background: #fff;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }

  .input {
    position: fixed;
    bottom: 0;
  }
}
</style>
