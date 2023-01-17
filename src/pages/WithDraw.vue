<script setup>
import { ref, defineAsyncComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { Uploader, Popup, showNotify, Overlay, PullRefresh, NumberKeyboard, Field } from 'vant';
import { reqUserInfo, reqWithdrawRecords, upload } from '../api/service';
import useUserStore from '../stores/user';
import { storeToRefs } from 'pinia';

const Header = defineAsyncComponent(() => import('../components/Header.vue'));
const router = useRouter();
const { user } = storeToRefs(useUserStore());

const inputPrice = ref('');
const inputMaxLength = 8;
const showNumberBoard = ref(false);
const showPopup = ref(false);
const fileList = ref([]);
const uploadFile = ref(null);
const withdrawRecords = ref([]);
const showDrawRecords = ref(false);
const loading = ref(false);


// methods
// 请求提现记录
const updateWithdrawRecords = () => {
  loading.value = true;
  reqWithdrawRecords(user.value.id).then(res => {
    if (res.status === 200)
      withdrawRecords.value = res.data;
    else
      showNotify({ type: 'danger', message: '获取提现记录失败!' })
  }).finally(() => loading.value = false)
}
updateWithdrawRecords();

const inputValidate = () => (parseFloat(inputPrice.value) > 0 && parseFloat(inputPrice.value) <= parseFloat(user.value.withdraw))

const onFileUpload = (file) => {
  fileList.value[0] = { content: file.content }
  uploadFile.value = file.file;
}

const onAckQr = () => {
  // 确认上传支付宝二维码
  const fd = new FormData();
  fd.append('file', uploadFile.value);
  fd.append('id', user.value.id);
  fd.append('money', inputPrice.value);

  upload(fd).then(res => {
    if (res.status !== 200 || parseInt(res.data.code) !== 200) {
      showNotify({ type: 'danger', message: '提现失败!', duration: 5000 });
    } else {
      reqUserInfo(user.value.id);
      showNotify({ type: 'success', message: '提现完成! 将会在24小时内到账', duration: 2000 });
    }
    showPopup.value = false;
  })
}

const onShowWithdraw = () => {
  updateWithdrawRecords();
  showDrawRecords.value = true;
}
</script>

<template>
  <div class="contain">
    <Header title="提现" @onBack="router.back()" @onMenu="onShowWithdraw">
      <template #menu>
        <span class="iconfont icon-zhangdan menu"></span>
      </template>
    </Header>
    <main>
      <!-- 提现金额输入 -->
      <div class="withdraw">
        <p class="title">提现金额(元)</p>
        <div class="input-panel">
          <span>¥</span>
          <Field class="input" type="number" :maxlength="inputMaxLength" placeholder="请输入提现金额" v-model="inputPrice" :readonly="showNumberBoard"
            @touchstart.stop="showNumberBoard = true" />
        </div>
        <div class="balance">
          <span>余额¥{{ user.withdraw }}，</span>
          <span @click="inputPrice = user.withdraw">全部提现</span>
        </div>
      </div>
      <!-- 提现按钮 -->
      <button class="withdraw-btn" :class="inputValidate() ? 'active' : ''" :disabled="!inputValidate()"
        @click="showPopup = true">提现</button>
    </main>

    <Popup :show="showPopup" round position="bottom" closeable close-on-click-overlay
      :style="{ height: 'auto', display: 'flex', justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center' }"
      @click-overlay="showPopup = false" @click-close-icon="showPopup = false">
      <span style="color: #999; font-size: 18px; margin: 10px 0;">上传您的支付宝收款码</span>
      <Uploader maxCount="1" uploadText="上传你的收款码" :afterRead=onFileUpload @click.stop="" previewSize="256px"
        :previewImage="true" imageFit="contain" v-model="fileList" :preview-full-image="false"
        @delete="uploadFile = null"></Uploader>
      <!-- 确定按钮 -->
      <button @click.stop="onAckQr"
        style="width: 50%; height: 50px; padding: 10px 10px; background-color: #eee; text-align: center; line-height: 30px; margin-bottom: 20px; border-radius: 8px; color: #999; border: none;"
        :disabled="!uploadFile" :style="uploadFile ? 'background-color: #00c900; color: #eee;' : ''">确定</button>
    </Popup>

    <Overlay :show="showDrawRecords" :style="{ backgroundColor: '#eee' }">
      <Header title="提现记录" @onBack="showDrawRecords = false"></Header>
      <PullRefresh class="pull-box" v-model="loading" @refresh="updateWithdrawRecords">
        <div class="withdraw-item" v-for="i of withdrawRecords" :key="i.id">
          <div>
            <span class="id">ID: {{ i.user_id }}</span>
            <span class="name">{{ i.name }}</span>
          </div>
          <div>
            <span class="money">¥{{ i.money }}</span>
            <span class="time">时间: {{ i.withdraw_time }}</span>
          </div>
          <span class="state" :class="i.state ? 'active' : ''">{{ i.state ? "已到账" : '提现中' }}</span>
        </div>
      </PullRefresh>
    </Overlay>

    <NumberKeyboard v-model="inputPrice" :show="showNumberBoard" @blur="showNumberBoard = false" :maxlength="inputMaxLength"
      safe-area-inset-bottom theme="custom" extra-key="." close-button-text="完成">
    </NumberKeyboard>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/icon-fonts/iconfont.css';

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

  .menu {
    font-size: 25px;
    user-select: none;
  }

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

        .input {
          outline: none;
          border: none;
          padding-left: 15px;
          height: 100%;
          font-size: 28px;
          flex: 1;

          :deep(.van-field__control) {
            &::placeholder {
              font-size: 18px;
              color: #999;
            }
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

  .pull-box {
    overflow-y: auto;
    height: calc(100% - 50px);

    .withdraw-item {
      width: 100%;
      height: 60px;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        &:nth-of-type(1) {
          width: 20%;
          color: #222;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .id {
            font-size: 12px;
            color: #999;
          }

          .name {
            font-size: 14px;
            color: #222;
          }
        }

        &:nth-of-type(2) {
          .money {
            color: rgb(255, 93, 93);
            font-size: 18px;
          }

          .time {
            font-size: 14px;
            color: #999;
          }
        }
      }

      .state {
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 5px;
        color: #fff;
        background-color: #16b6fb;

        &.active {
          background-color: #00c900;
        }
      }

    }
  }
}
</style>
