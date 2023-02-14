<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const input = ref('');
const inputDom = ref();

// live hook
onMounted(() => {
  inputDom.value.focus();
})

// method
function loginHandle() {
  router.replace({ name: "chat", query: { key: input.value } })
}
</script>

<template>
  <div class="home-container">
    <header></header>
    <main>
      <div class="login">
        <label for="form-input"><span>*</span>登录验签</label>
        <span class="iconfont icon-qingchu clean" v-show="input.length" @click="input = ''"></span>
        <br>
        <input ref="inputDom" id="form-input" type="text" placeholder="请输入登录验签" v-model="input"
          @keydown.enter="!$event.isComposing && loginHandle()"><br>
        <button @click="loginHandle">开始使用</button>
      </div>

    </main>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/icon-fonts/iconfont.css';

.home-container {
  height: 100%;

  header {
    height: 50px;
    // background-color: aqua;
  }

  main {
    height: calc(100% - 50px);
    // background-color: skyblue;
    font-weight: 300;

    .login {
      padding: 0 20px;
      margin-top: 50%;

      label {
        font-size: 20px;

        span {
          color: red;
        }
      }

      .clean {
        color: $theme;
        float: right;
        font-size: 24px;
        margin-right: 5px;
        user-select: none;
        cursor: pointer;
      }

      @keyframes showInput {
        from {
          max-width: 0;
        }

        to {
          max-width: 100%;
        }
      }

      #form-input {
        width: 100%;
        outline: none;
        border: none;
        border-bottom: 1px solid #ccc;
        background-color: transparent;
        padding: 15px 0;
        position: relative;
        transform-origin: left;
        animation: showInput 1s;
      }

      button {
        display: block;
        border: none;
        padding: 8px 15px;
        background-color: $theme;
        color: #fff;
        font-size: 14px;
        border-radius: 3px;
        float: right;
        margin: 20px 0;
      }
    }
  }
}
</style>