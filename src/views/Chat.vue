<script setup>
import { ref, onActivated, toRefs } from 'vue';
import ChatView from '@/components/ChatView.vue'
import { reqFreeQueryTimes, useChatGPT } from '@/api';
import { showConfirmDialog } from 'vant';
import { storeToRefs } from 'pinia';
import useStore from '@/store';
import { useRouter } from 'vue-router';

const router = useRouter();
const { userStore, robotStore } = useStore();
const { user } = storeToRefs(userStore);
const { robots } = storeToRefs(robotStore);
const { messages, say, setSystem } = useChatGPT()

// 初始化机器人 created 周期
robots.value.currentRobot = robots.value.robots[0];
setSystem(robots.value.robots[0].type, robots.value.robots[0].salutation)


onActivated(() => {
  // 判断是否需要切换机器人
  if (robots.value.changed) {
    setSystem(robots.value.currentRobot.type, robots.value.currentRobot.salutation)
    robots.value.changed = false;
  }
});

// 发送聊天消息
const sendHandle = async (data) => {
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
        confirmButtonColor: '#9370d8',
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

  say(data, user.value.chat_key);
}
</script>

<template>
  <ChatView :chatList="messages" @onSend="sendHandle" :robotAvatar="robots.currentRobot.avatar" placeholder="你想和我聊点什么?" />
</template>

<style scoped lang="scss"></style>
