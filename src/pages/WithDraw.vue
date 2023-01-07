<script setup>
import { ref, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Uploader, Popup, showNotify } from 'vant';
import { upload } from '../api/service';
import useUserStore from '../stores/user';
import useCommisionStore from '../stores/commision';
import { storeToRefs } from 'pinia';

const Header = defineAsyncComponent(() => import('../components/Header.vue'));
const router = useRouter();
const { user } = useUserStore();
const { commision } = storeToRefs(useCommisionStore())

const balance = ref(commision.value.withDraw);
const inputPrice = ref(null);
const showPopup = ref(false); 
const fileList = ref([]);
const uploadFile = ref(null);

const inputValidate = () => (inputPrice.value > 0 && inputPrice.value <= balance.value)

const onFileUpload = (file) => {
  fileList.value[0] = { content: file.content }
  uploadFile.value = file.file;
}

const onAckQr = () => {
  // 确认上传支付宝二维码
  const fd = new FormData();
  fd.append('file', uploadFile.value);
  fd.append('id', user.id);
  fd.append('money', inputPrice.value);

  upload(fd).then(res => {
    console.log(res)
    if (res.status !== 200 || res.data.code !== 200) 
      showNotify({ type: 'danger', message: '提现失败!', duration: 5000 });
  })
}
</script>

<template>
  <div class="contain">
    <Header title="提现" @onBack="router.back()"></Header>
    <main>
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
      <button class="withdraw-btn" 
      :class="inputValidate() ? 'active' : ''" 
      :disabled="!inputValidate()"
      @click="showPopup = true"
      >提现</button>
    </main>

    <Popup :show="showPopup" 
      round 
      position="bottom" 
      closeable
      close-on-click-overlay
      :style="{ height: 'auto', display: 'flex', justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center'}"
      @click-overlay="showPopup = false"
      @click-close-icon="showPopup = false"
    >
      <span style="color: #999; font-size: 18px; margin: 10px 0;">上传您的支付宝收款码</span>
      <Uploader maxCount="1" uploadText="上传你的收款码" :afterRead=onFileUpload @click.stop="" previewSize="256px"
        :previewImage="true" imageFit="contain" v-model="fileList" :preview-full-image="false" @delete="uploadFile = null"></Uploader>
      <!-- 确定按钮 -->
      <button @click.stop="onAckQr" style="width: 50%; height: 50px; padding: 10px 10px; background-color: #eee; text-align: center; line-height: 30px; margin-bottom: 20px; border-radius: 8px; color: #999; border: none;" :disabled="!uploadFile" :style="uploadFile ? 'background-color: #00c900; color: #eee;' : ''">确定</button>
    </Popup>
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
      border: none;
      display: block;

      &.active {
        background-color: #00c900;
      }
    }
  }
}
</style>
