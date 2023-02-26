<script setup>
import { ref, onActivated } from 'vue';
import ChatView from '@/components/ChatView.vue'
import { gptSendMessage, reqFreeQueryTimes } from '@/api';
import { showConfirmDialog } from 'vant';
import { storeToRefs } from 'pinia';
import useStore from '@/store';
import { useRouter } from 'vue-router';

const router = useRouter();
const { userStore, robotStore } = useStore();
const { user } = storeToRefs(userStore);
const { robots } = storeToRefs(robotStore);

const msgList = ref([]);
let id = 0;

// 初始化机器人 created 周期
robots.value.currentRobot = robots.value.robots[0];
msgList.value.push({
  id: id++,
  isUser: false,
  content: robots.value.robots[0].salutation,
});


onActivated(() => {
  // 判断是否需要切换机器人
  if (robots.value.changed) {
    id = 0;
    msgList.value = [{
      id: id++,
      isUser: false,
      content: robots.value.currentRobot.salutation
    }];

    let tmp = [
      ...msgList.value,
      { id, isUser: true, content: robots.value.currentRobot.type }
    ]
    gptSendMessage(tmp);
    robots.value.changed = false;
  }
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

  // 保存用户输入的信息
  msgList.value.push({ id: id++, isUser: true, content: data })

  // 获取到收到的数据
  let newIndex = null;
  gptSendMessage(msgList.value, (content) => {
    if (newIndex === null)
      newIndex = msgList.value.push({ id: id++, isUser: false, content: content }) - 1;
    else
      msgList.value[newIndex].content = content;
  });
}
</script>

<template>
  <ChatView :chatList="msgList" @onSend="sendHandle" :robotAvatar="robots.currentRobot.avatar" placeholder="你想和我聊点什么?" />
</template>

<style scoped lang="scss"></style>
