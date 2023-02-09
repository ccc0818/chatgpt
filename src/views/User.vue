<script setup>
import { ref } from 'vue';
import { showFailToast, showSuccessToast, Dialog, Field, CellGroup, showImagePreview } from 'vant';
import { useRouter } from 'vue-router';
import { reqActiveSecret } from '@/api';
import useStore from '../store';
import { storeToRefs } from 'pinia';
import publicQrImage from '@/assets/images/user/public-qrcode.jpeg';

const { userStore } = useStore();
const { user } = storeToRefs(userStore);
const router = useRouter();
const show = ref(false);
const inputSecret = ref('');
const errMsg = ref('');
const disableConfirm = ref(true);
const menuList = ref([
  { id: 0, icon: '/assets/images/user/user-item_diamond.png', title: '开通会员畅享无限对话' },
  { id: 1, icon: '/assets/images/user/user-item_walt.png', title: '加入代理赚钱' },
  { id: 2, icon: '/assets/images/user/user-item_lock.png', title: '卡密兑换' },
  // {id: 3, icon: '/assets/images/user/user-item_add.png', title: '我也想搭建同款AI平台' },
  { id: 4, icon: '/assets/images/user/user-item_add.png', title: '关注公众号', uniBase64: "MzkzOTM4MjQyNQ==" }
]);

if (!user.value.partner) {
  menuList.value.splice(1, 1);
}

// methods
const onFormatter = (val) => {
  if (/^[A-Za-z0-9]+$/.test(val)) {
    errMsg.value = '';
    disableConfirm.value = false;
  } else {
    disableConfirm.value = true;
    if (val.length === 0)
      errMsg.value = '';
    else
      errMsg.value = '请输入有效的卡密';
  }
  return val
}

const onClickItem = async (id) => {
  switch (id) {
    case 0: //开通会员
      router.push({ name: 'vip' });
      break;
    case 1:
      router.push({ name: 'market' });
      break;
    case 2: //兑换卡密
      show.value = true;
      break;
    // case 3:
    //   window.location.href = 'https://work.weixin.qq.com/kfid/kfc03f8a1759c818c57';
    //   break;
    case 4:
      showImagePreview({
        images: [publicQrImage],
        showIndex: false,
        closeable: true
      });
      break;
    default:
      break;
  }
}

const onEmitSecret = () => {
  reqActiveSecret({ id: user.value.id, secret: inputSecret.value.trim() }).then(res => {
    // console.log(res)
    if (res.data === 200)
      showSuccessToast({
        message: '兑换成功',
        duration: 2000
      });
    else
      showFailToast({
        message: '兑换失败',
        duration: 2000
      })
  })
  inputSecret.value = '';
}
</script>

<template>
  <div class="user-container">
    <main>
      <div class="user-info">
        <img class="avatar" :src="user.avatar">
        <div class="right">
          <div class="mid">
            <span>ID: {{ user.id }}</span>
          </div>
          <div class="name">
            <span v-if="user.state !== 0" class="vip"></span>{{ user.nickname }}
          </div>
        </div>
      </div>
      <ul class="menu">
        <li class="menu-item" v-for="(item, index) of menuList" :key="index" @click="onClickItem(item.id)">
          <div class="left">
            <div class="icon">
              <img class="img" :src="item.icon">
            </div>
            <span class="title">{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </main>

    <Dialog v-model:show="show" title="卡密兑换" show-cancel-button confirm-button-text="兑换" confirm-button-color="#cca4e3"
      @confirm="onEmitSecret" :confirm-button-disabled="disableConfirm">
      <CellGroup inset>
        <Field v-model="inputSecret" rows="1" autosize type="textarea" placeholder="请输入你的卡密" :border="true"
          :clearable="true" :formatter="onFormatter" :error-message="errMsg" format-trigger="onChange" />
      </CellGroup>
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.user-container {
  background-image: linear-gradient(to bottom, #fff, #eee);
  position: relative;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  main {
    padding: 0 10px;
    padding-top: 50px;

    .user-info {
      width: 100%;
      overflow: hidden;
      background-color: #ffffffae;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 15px;
      padding: 15px 0;

      .avatar {
        width: 30%;
        aspect-ratio: 1/1;
        box-shadow: 0 0 16px 0 $theme;
        border-radius: 50%;
        -webkit-user-drag: none;
        cursor: pointer;
        border: 2px solid $theme;
        background-color: #fff;
      }

      .right {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;

        .mid {
          flex-shrink: 0;
          width: 100%;
          height: 40px;
          text-align: center;

          span {
            line-height: 40px;
          }
        }

        .name {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 30px;
          font-size: 26px;
          color: var(--theme-color);
          cursor: pointer;
          text-overflow: ellipsis;
          white-space: nowrap;

          .vip {
            display: inline-block;
            height: 100%;
            aspect-ratio: 1/1;
            margin-right: 10px;
            background: url(../assets/images/vip.png) no-repeat center/contain;
          }

        }
      }
    }

    .menu {
      margin-top: 20px;
      width: 100%;
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 0;

      .menu-item {
        height: 80px;
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ffffffae;
        width: 100%;
        padding: 10px 15px;
        border-radius: 15px;
        font-size: 18px;
        cursor: pointer;
        color: $theme;
        font-size: 16px;
        overflow: hidden;
        transition: all 0.3s ease;

        img {
          pointer-events: none;
        }

        @media (width > 750px) {
          &:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 10px -15px #6c6c6c;
          }
        }

        &:nth-of-type(1) .left .icon .img {
          transform: scale(2) translateY(6%);
        }

        .left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 100%;
          flex: 1;

          .icon {
            height: 70px;
            width: 70px;
            border-radius: 20px;
            margin-right: 10px;
            background-color: #eeeeeebf;

            .img {
              height: 70px;
              width: 70px;
              object-fit: contain;
              transform: scale(0.6);
            }
          }
        }
      }
    }


  }
}
</style>
