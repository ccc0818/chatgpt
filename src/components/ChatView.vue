<script setup>
import { ref, nextTick, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import Bubble from './Bubble.vue';
import Input from './Input.vue';
import useStore from '@/store';

const { userStore } = useStore()
const { user } = storeToRefs(userStore)

const props = defineProps({
  chatList: {
    type: Array,
    require: true,
    defalut: []
  },
  robotAvatar: {},
  placeholder: String
})

const emits = defineEmits(['onSend'])

onUpdated(() => {
  scrollToBottom();
});

const chatElRef = ref(null);
function scrollToBottom(isSmooth = true) {
  nextTick(() => {
    if (isSmooth) {
      chatElRef.value.style.scrollBehavior = 'smooth';
      chatElRef.value.scrollTop = chatElRef.value.scrollHeight;
    } else {
      chatElRef.value.style.scrollBehavior = 'unset';
      chatElRef.value.scrollTop = chatElRef.value.scrollHeight;
    }
  })
}
</script>

<template>
  <div class="chat-container">
    <!-- main -->
    <div class="chat-list" ref="chatElRef">
      <Bubble v-for="(v, i) of chatList" :key="i" :isUser="v.role === 'user'" :content="v.content" :type="v.type"
      :avatar="v.role === 'user' ? user?.avatar : robotAvatar" />
    </div>
    <!-- 输入框 -->
    <Input @send="(e) => emits('onSend', e)" :placeholder="placeholder" />
  </div>
</template>

<style scoped lang="scss">
.chat-container {
  position: relative;

  .chat-list {
    height: 100%;
    padding-top: 20px;
    padding-bottom: 50px;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
}
</style>