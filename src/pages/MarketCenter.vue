<script setup>
import { ref } from 'vue';
import VueQr from 'vue-qr/src/packages/vue-qr.vue'
import useUserStore from '../stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user } = useUserStore();
const data = ref({
  withDraw: user.commision,
  commission: 0,
  qrcodeUrl: location.origin + `/?parent_user_id=${user.id}`
});

// console.log(data.value.qrcodeUrl);
const qrNode = ref(null);
const downloadQr = () => {
  const a = document.createElement('a');
  a.href = qrNode.value.imgUrl;
  a.download = 'qrcode.png';
  a.click();
}
</script>

<template>
  <div class="contain">
    <!-- 返回 -->
    <span class="iconfont icon-fanhui1 back" @click="() => router.back()"></span>
    <!-- header -->
    <header>合伙人中心</header>
    <main>
      <div class="card">
        <div class="icon-w"></div>
        <div class="mid">
          <span>可提现佣金</span>
          <span>{{ data.withDraw }}</span>
        </div>
        <span class="btn" @click="router.push('market_center/withdraw')">提现</span>
      </div>
      <div class="card">
        <div class="icon-r"></div>
        <div class="mid">
          <span>总佣金</span>
          <span>{{ data.commission }}</span>
        </div>
        <span class="btn" @click="router.push('market_center/customer')">佣金记录</span>
      </div>

      <!-- 二维码 -->
      <div class="card code">
        <p class='title'>长按保存推广二维码</p>
        <div class="wrapper">
          <div class="inner">
            <VueQr ref="qrNode" 
            :text="data.qrcodeUrl" 
            :correctLevel="3" 
            :size="256" 
            colorDark="#000000"
            colorLight="#ffffff" 
            logoSrc="/assets/images/openai.png"
            :logoMargin="0"
            logoBackgroundColor="#ffffff"
            ></VueQr>
          </div>
        </div>
      </div>

      <div class="download-qr" @click="downloadQr">下载推广二维码</div>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/icon-fonts/iconfont.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.contain {
  width: 100%;
  height: 100vh;
  background-color: #eee;
  position: relative;
  padding: 30px 15px 15px 15px;
  display: flex;
  flex-direction: column;

  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 30px;
    left: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    background-image: linear-gradient(to right bottom, #d7d7d7, rgb(241, 240, 240));
    border-radius: 15px;
  }

  header {
    text-align: center;
    font-size: 24px;
    color: #69515D;
    height: 40px;
    line-height: 40px;
    flex-shrink: 0;
  }

  main {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    .card {
      width: 100%;
      height: 100px;
      border-radius: 25px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin-top: 25px;

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
      color: #fff;
      text-align: center;
      border-radius: 15px;
      user-select: none;
    }
  }
}
</style>
