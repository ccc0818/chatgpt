<script setup>
import { ref } from 'vue';
import VueQr from 'vue-qr/src/packages/vue-qr.vue'
import useStore from '../store';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Header from '@/components/Header';
import RobotImg from '@/assets/images/chat/robot-avatar.png';
// import promoteQrcodeImg from '@/assets/images/promote-qrcode.jpg';

const router = useRouter();
const { commisionStore, userStore } = useStore();
const { user } = storeToRefs(userStore);
const { commision } = storeToRefs(commisionStore);
commisionStore.getCommision(user.value);
const qrNode = ref(null);
const qrcodeUrl = location.origin + `/?parent_user_id=${user.value.id}`;

// methods
const downloadQr = () => {
  const a = document.createElement('a');
  a.href = qrNode.value.imgUrl;
  // a.href = promoteQrcodeImg;
  // console.log(a.href)
  a.download = 'qrcode';
  a.click();
}
</script>

<template>
  <div class="marketcenter-container">
    <Header @onBack="router.back()" title="合伙人中心" />
    <main>
      <div class="card">
        <div class="icon-w"></div>
        <div class="mid">
          <span>可提现佣金</span>
          <span>{{ user.yongjin }}</span>
        </div>
        <span class="btn" @click="router.push({ name: 'withdraw' })">提现</span>
      </div>
      <div class="card">
        <div class="icon-r"></div>
        <div class="mid">
          <span>总佣金</span>
          <span>{{ commision.commision }}</span>
        </div>
        <span class="btn" @click="router.push({ name: 'market_customer' })">佣金记录</span>
      </div>

      <!-- 二维码 -->
      <div class="card code">
        <p class='title'>请联系商务经理或拨打服务热线:<a href="tel:4006688546">4006688546</a></p>
        <div class="wrapper">
          <div class="inner">
            <VueQr ref="qrNode" :text="qrcodeUrl" :correctLevel="3" :size="256" colorDark="#000000" colorLight="#ffffff"
              :logoSrc="RobotImg" :logoMargin="0" logoBackgroundColor="#ffffff">
            </VueQr>
            <!-- <img src="@/assets/images/promote-qrcode.jpg" width="256" height="256"> -->
          </div>
        </div>
      </div>

      <div class="download-qr" @click="downloadQr">下载推广二维码</div>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/icon-fonts/iconfont.css';

.marketcenter-container {
  height: 100%;
  // background-color: #eee;
  overflow-y: scroll;
  padding-top: 50px;

  &::-webkit-scrollbar {
    display: none;
  }

  main {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 15px;

    @media (prefers-color-scheme: dark) {
      .card {
        background-color: lighten($background-dark, 20);
      }
    }

    @media (prefers-color-scheme: light) {
      .card {
        background-color: #fff;
      }
    }

    .card {
      width: 100%;
      height: 100px;
      border-radius: 25px;
      // background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin-top: 25px;
      flex-shrink: 0;
      border: 1px solid $theme;

      .icon-w {
        height: 80%;
        aspect-ratio: 1/1;
        border-radius: 15px;
        background: #F4F3F4 url('/assets/images/market/icon-w.png') no-repeat center/60% 60%;
      }

      .icon-r {
        height: 80%;
        aspect-ratio: 1/1;
        border-radius: 15px;
        background: #F4F3F4 url('/assets/images/market/icon-r.png') no-repeat center/contain;
      }

      .mid {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;
        justify-content: space-around;
        padding: 0 15px;
        max-width: 40%;

        span {
          &:nth-of-type(1) {
            color: #A06784;
            font-weight: 700;
          }

          &:nth-of-type(2) {
            color: #AAA6C0;
            font-size: 14px;
          }
        }
      }

      .btn {
        display: inline-block;
        flex-shrink: 0;
        width: 100px;
        padding: 10px 15px;
        font-size: 12px;
        color: #6C5461;
        background-color: #E3F3FF;
        border-radius: 10px;
        text-align: center;
      }
    }

    .code {
      display: block;
      height: auto;

      .title {
        color: #69515D;
        font-weight: 700;
        font-size: 16px;
        text-align: center;
      }

      .wrapper {
        width: 258px;
        height: 258px;
        background-image: linear-gradient(to right top, #F1AA92, #76BBED);
        margin: 10px auto;
        border-radius: 15px;
        padding: 2px;
        overflow: hidden;

        .inner {
          width: 100%;
          height: 100%;
          background-color: #fff;
          border-radius: 15px;
          overflow: hidden;
        }
      }
    }

    .download-qr {
      margin: 20px auto;
      width: 80%;
      height: 60px;
      background-image: linear-gradient(-45deg, #F1AA92, #76BBED);
      line-height: 60px;
      font-size: 16px;
      // color: #fff;
      text-align: center;
      border-radius: 15px;
      user-select: none;
    }
  }
}
</style>
