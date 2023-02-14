<script setup>
import { ref, onMounted } from 'vue';
import { showMessage } from '@/utils'

const secret = ref('')

onMounted(() => {
  const key = localStorage.getItem("secret");
  secret.value = key ?? "";
})

// method
function saveHandle() {
  localStorage.setItem("secret", secret.value);
  showMessage({ type: 'success', message: '已保存' })
}
</script>

<template>
  <Transition name="secret">
    <div class="secret-container">
      <div class="input-container">
        <textarea placeholder="你需要输入你的密钥" v-model.lazy.trim="secret"></textarea>
        <button class="save" @click="saveHandle">保存</button>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.secret-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: .3s;
  transform-origin: right top;

  .input-container {
    max-height: 60%;
    padding: 0 30px;
    width: 100%;

    textarea {
      resize: none;
      width: 100%;
      min-height: 40px;
      border: 1px solid $theme;
      border-radius: 8px;
      padding: 8px;
      font-size: 12px;
      font-weight: 200;
      color: inherit;

      &::placeholder {
        color: inherit;
      }

      &:focus {
        outline: none;
      }
    }

    .save {
      display: block;
      border: none;
      background-color: $theme;
      padding: 10px 50px;
      color: #fff;
      border-radius: 8px;
      margin: 10px auto;
      user-select: none;
    }
  }
}

.secret-enter-from,
.secret-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>