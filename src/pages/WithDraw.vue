<script setup>
import { ref, defineAsyncComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
const Header = defineAsyncComponent(() => import('../components/Header.vue'));

const router = useRouter();
const checked = reactive({
  ant: false,
})
const inputPrice = ref('');
const balance = ref(1232)

const onAntChecked = () => {
  checked.ant = true;
}

const onWithDraw = () => {
  // TODO: 提现逻辑
}
</script>

<template>
  <div class="contain">
    <Header title="提现" @onBack="router.back()"></Header>
    <main>
      <!-- 支付类型 -->
      <div class="pay-list">
        <div class="item" @click="onAntChecked">
          <img src="/assets/images/market/logo-ant.png" draggable="false">
          <span class="name">支付宝</span>
          <input class="radio" type="radio" name="pay-list" disabled :checked="checked.ant">
        </div>
      </div>
      <!-- 提现金额输入 -->
      <div class="withdraw">
        <p class="title">提现金额(元)</p>
        <div class="input-panel">
          <span>¥</span>
          <input type="number" placeholder="请输入提现金额" v-model="inputPrice">
        </div>
        <div class="balance">
          <span>余额¥{{ balance }}，</span>
          <span @click="inputPrice = balance">全部提现</span>
        </div>
      </div>
      <!-- 提现按钮 -->
      <div class="withdraw-btn" :class="parseFloat(inputPrice) > 0 ? 'active' : ''" @click="onWithDraw">提现</div>
    </main>
  </div>
</template>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.contain {
  width: 100%;
  height: 100vh;
  background-color: #eee;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    width: 100%;

    .pay-list {
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #eee;

      .item {
        height: 50px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;

        img {
          height: 30px;
        }

        .name {
          flex: 1;
          padding-left: 20px;
          font-size: 16px;
          color: #444;
        }

        .radio {
          appearance: unset;
          border: 1px solid #999;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          position: relative;

          &::after {
            content: '';
            width: 90%;
            height: 90%;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #16b6fb;
            ;
            display: none;
          }

          &:checked {
            &::after {
              display: block;
            }
          }
        }
      }
    }

    .withdraw {
      width: 100%;
      background-color: #fff;
      padding: 10px 15px 0 15px;

      .title {
        font-size: 13px;
        color: #222;
      }

      .input-panel {
        width: 100%;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        display: flex;
        align-items: center;

        span {
          font-size: 36px;
        }

        input {
          outline: none;
          border: none;
          padding-left: 15px;
          height: 100%;
          font-size: 28px;

          &::placeholder {
            font-size: 18px;
            color: #999;
          }
        }
      }

      .balance {
        font-size: 14px;
        color: #999;
        width: 100%;
        height: 40px;
        line-height: 40px;

        span {
          &:nth-of-type(2) {
            color: #16b6fb;
          }
        }
      }
    }

    .withdraw-btn {
      width: 80%;
      height: 50px;
      background-color: #ccc;
      margin: 30px auto;
      border-radius: 5px;
      text-align: center;
      line-height: 50px;
      color: #fff;

      &.active {
        background-color: #00c900;
      }
    }
  }
}
</style>
