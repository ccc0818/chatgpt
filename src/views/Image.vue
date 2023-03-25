<script setup>
import { ref } from 'vue'
import ChatView from '@/components/ChatView.vue'
import { gptReqImage } from '@/api';
import { showMessage } from '@/utils'
import useStore from '@/store'
import { storeToRefs } from 'pinia'

const { userStore } = useStore()
const { user } = storeToRefs(userStore)

let id = 0;
const chatList = ref([{ id: 0, isUser: false, type: 'text', content: '现在你可以对我描述你想要的图片。' }]);

// 发送聊天消息
const sendHandle = async (data) => {
  // 不允许输入为空
  if (!data.length) {
    return;
  }

  // vip 检查
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
  chatList.value.push({ id: id++, role: "user", content: data })

  // 获取到收到的数据
  try {
    const res = await gptReqImage(data, user.value.chat_key);
    if (res.status === 200 && res.data.data.length > 0) {
      const url = res.data.data[0].url;
      chatList.value.push({
        id: id++,
        isUser: false,
        content: url,
        type: 'image'
      })
    }
  } catch (error) {
    showMessage({
      type: 'error',
      message: '请求gpt画图失败！',
    })
  }

}
</script>

<template>
  <ChatView :chatList="chatList" @onSend="sendHandle" placeholder="描述你的图片" />
</template>

<style scoped lang="scss"></style>
