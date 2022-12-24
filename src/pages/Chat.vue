<script setup>
import { ref, nextTick, onUpdated } from 'vue';
import Bubble from '../components/Bubble.vue';
import { request } from '../api/chatgpt';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { ElMessageBox } from 'element-plus';
import { wxPayVip, getReqAviaible } from '../api/api';

const { user } = storeToRefs(useUserStore());
const inputData = ref('');
const mainEl = ref('null');
const pageEl = ref('null');
const input = ref('');
let id = 0;
const msgList = ref([
  { id: id++, isUser: false, message: '你好, 我是chatGPT.' }
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
  if (!user.value.vip) {
    let state = true;
    try {
      const res = await getReqAviaible(user.value.id);
      if (res.data === 2)
        state = false;
    } catch (err) {
      console.log(err);
      state = false;
    }
    if (!state) {
      // 弹出开会员对话框
      ElMessageBox.alert('免费次数已用完,开通会员享无限畅聊', '', {
        confirmButtonText: '去开通',
        cancelButtonText: '取消',
        confirmButtonClass: 'el-confirm',
        center: true,
        roundButton: true,
        showCancelButton: true,
        closeOnHashChange: true,
        showClose: false,
        appendTo: pageEl.value,
        callback: (action) => {
          if (action === 'confirm')
            wxPayVip({ id: user.value.id, openid: user.value.openid, money: 0.01 });
        },
      })
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

  queryStr.replace('AI: ', '');
  // 获取到收到的数据
  const newId = id++;
  request(queryStr, (content) => {
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
  <div ref="pageEl" class="chat-page">
    <!-- main -->
    <div class="main" ref="mainEl" overflow="scroll-y">
      <Bubble v-for="item of msgList" :key="item.id" :isUser="item.isUser"
        :avatar="item.isUser ? user.avatar : '/assets/images/openai.png'" :message="item.message">
      </Bubble>
    </div>
    <!-- input -->
    <div class="input-block">
      <div class="panel">
        <input ref="input" class="ipt" type="text" v-model="inputData" placeholder="你想和我聊点什么?"
          @compositionstart="compositionEvent(1)" @compositionend="compositionEvent(0)">
        <button class="btn" :class="!inputData.length ? 'disable' : ''"
          @click="inputData.length && onSubmit()"></button>
      </div>
    </div>
  </div>
</template>

<style>
.el-overlay-message-box {
  margin-top: 50%;
}

.el-overlay-message-box::after {
  content: '';
  width: 0 !important;
  height: 0 !important;
}

.chat-page {
  width: 100%;
  height: 100%;
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

.input-block {
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
  background-color: var(--theme-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 750px) {
  .input-block {
    border-radius: 25px;
  }
}

.panel {
  flex: 1;
  height: 45px;
  width: 90%;
  border-radius: 25px;
  background-color: #fff;
  box-shadow: inset 0 0 3px 0 var(--theme-color);
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
  height: 100%;
  text-align: center;
  color: #828284;
  background-color: transparent;
  font-size: 16px;
  margin: 0 10px;
}

.panel .btn {
  min-width: 40px;
  min-height: 40px;
  cursor: pointer;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80px;
  background-color: transparent;
  border-width: 0;
  background-image: url('../assets/images/send.png');
}

.panel .disable {
  filter: grayscale(0.5);
}

.el-confirm {
  background: #f4c86d !important;
  border: none !important;
}
</style>
