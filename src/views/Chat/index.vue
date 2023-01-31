<script setup>
import { ref, nextTick, onUpdated, onActivated } from 'vue';
import Bubble from './components/Bubble.vue';
import Input from './components/Input.vue';
import { gptSendMessage, reqFreeQueryTimes } from '@/api';
import { showConfirmDialog } from 'vant';
import { storeToRefs } from 'pinia';
import useStore from '@/store';

const { userStore, robotStore } = useStore();
const { user } = storeToRefs(userStore);
const { robots } = storeToRefs(robotStore);

const chatDom = ref();
const msgList = ref([]);
let id = 0;

// 初始化机器人 created 周期
robots.value.currentRobot = robots.value.robots[0];
msgList.value.push({
  id: id++,
  isUser: false,
  message: robots.value.robots[0].salutation
});

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

  // 判断是否需要切换机器人
  if (robots.value.changed) {
    id = 0;
    msgList.value = [{
      id: id++,
      isUser: false,
      message: robots.value.currentRobot.salutation
    }];

    let tmp = [
      ...msgList.value,
      { id, isUser: true, message: robots.value.currentRobot.type }
    ]
    gptSendMessage(tmp);
    robots.value.changed = false;
  }
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

  //vip 检查
  if (user.value.state === 0) {
    let freeCount = 0;
    //检查user 能否发信息
    const res = await reqFreeQueryTimes(user.value.id);
    freeCount = res.data;

    if (freeCount <= 0) {
      // 弹出开会员对话框
      showConfirmDialog({
        message: '免费体验次数用完了, 开通会员享无限畅聊。',
        confirmButtonText: '去开通',
        confirmButtonColor: '#cca4e3',
        cancelButtonText: '再想想',
        // closeOnClickOverlay: false,
        overlay: false,
        // theme: 'round-button'
        className: 'popup',
      }).then(() => {
        // on confirm
        router.push({ name: 'vip' });
      });
      return;
    }
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
      <Bubble v-for="item of msgList" :key="item.id" :isUser="item.isUser"
        :avatar="item.isUser ? user.avatar : robots.currentRobot.avatar" :message="item.message">
      </Bubble>
    </div>
    <!-- 输入框 -->
    <Input @send="sendHandle" />
  </div>
</template>

<style scoped lang="scss">
.chat-container {
  position: relative;

  .chat-list {
    height: 100%;
    padding-top: 20px;
    padding-bottom: 50px;
    background: #eee;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
}
</style>
