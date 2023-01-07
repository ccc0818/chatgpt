<script setup>
import { ref, nextTick, onUpdated } from 'vue';
import Bubble from '../components/Bubble.vue';
import { request } from '../api/chatgpt';
import { reqFreeQueryTimes } from '../api/service';
import useUserStore from '../stores/user';
import { showConfirmDialog } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user } = useUserStore();
const inputData = ref('');
const mainEl = ref('null');
const input = ref('');
let id = 0;
const msgList = ref([
  { id: id++, isUser: false, message: '你好，我是最强人工智能ChatGPT，我能回答你所有问题，快来和我聊天吧！' }
]);

onUpdated(() => {
  // 自动滚动到底部
  nextTick(() => mainEl.value.scrollTop = mainEl.value.scrollHeight);
});

// 发送聊天消息
const onSubmit = async () => {
  // 不允许输入为空
  if (inputData.value.trimStart() === '') {
    inputData.value = '';
    return;
  }
  //vip 检查
  if (user.vip === 0) {
    //检查user 能否发信息
    try {
      const res = await reqFreeQueryTimes(user.id);
      user.number = res.data;
    } catch (error) {
      console.log('获取剩余体验次数失败!');
      return;
    }

    if (user.number <= 0) {
      // 弹出开会员对话框
      showConfirmDialog({
        message: '免费体验次数用完了, 开通会员享无限畅聊。',
        confirmButtonText: '去开通',
        confirmButtonColor: '#cca4e3',
        cancelButtonText: '再想想',
        // closeOnClickOverlay: false,
        overlay: false,
        // theme: 'round-button'
        className: 'popup'
      }).then(() => {
        // on confirm
        router.push('/vip');
      }).catch(() => {
        // on cancel
      });
      return;
    }
  }

  // 保存用户输入的信息
  const userInp = inputData.value.trimStart();
  msgList.value.push({ id: id++, isUser: true, message: userInp })

  // 清除输入框
  inputData.value = '';

  let queryStr = '';
  msgList.value.forEach(e => {
    if (e.isUser) {
      queryStr += `You: ${e.message}\n`;
    } else {
      queryStr += `AI: ${e.message}\n`;
    }
  });

  queryStr = queryStr.replace('AI: ', '');
  // console.log(queryStr);
  // 获取到收到的数据
  const newId = id++;
  request(queryStr, user.chatKey, (content) => {
    const item = msgList.value.find(i => i.id === newId);
    if (item)
      item.message = content.replace('AI:', '').trimStart();
    else
      msgList.value.push({ id: newId, isUser: false, message: content.replace('AI:', '').trimStart() });
  });
}

const inputEnterEvent = (e) => {
  if (e.charCode === 13) {
    inputData.value.length && onSubmit()
  }
}

const compositionEvent = (state) => {
  if (state) { //start
    input.value.removeEventListener('keypress', inputEnterEvent);
  } else {
    input.value.addEventListener('keypress', inputEnterEvent);
  }
}
</script>

<template>
  <div class="chat-page">
    <!-- main -->
    <div class="main" ref="mainEl" overflow="scroll-y">
      <Bubble v-for="item of msgList" :key="item.id" :isUser="item.isUser"
        :avatar="item.isUser ? user.avatar : '/assets/images/openai.png'" :message="item.message">
      </Bubble>
    </div>
    <!-- input -->
    <div class="panel">
      <input ref="input" class="ipt" type="text" v-model="inputData" placeholder="你想和我聊点什么?"
        @compositionstart="compositionEvent(1)" @compositionend="compositionEvent(0)">
      <div class="btn" :class="!inputData.length ? 'disable' : ''" @click="inputData.length && onSubmit()">
        <img class="img" src="/assets/images/chat/send.png">
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.main {
  flex: 1;
  width: calc(100% + 17px);
  height: 100%;
  box-sizing: border-box;
  padding-right: 17px;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.panel {
  height: 45px;
  width: 100%;
  border: 1px solid #eee;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  transition: width .1s linear;
}

.panel .ipt {
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
}

.panel .ipt::placeholder {
  font-size: 14px;
  color: #aaa;
}

.panel .btn {
  margin: 0 10px;
  height: 27px;
  width: 27px;
  cursor: pointer;
}

.panel .btn .img {
  width: 100%;
  height: 100%;
  background-color: transparent;
  -webkit-user-drag: none;
  object-fit: contain;
}

.panel .disable {
  filter: grayscale(0.5);
}

.el-confirm {
  background: #f4c86d !important;
  border: none !important;
}
</style>
