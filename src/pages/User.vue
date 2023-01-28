<script setup>
import { ref } from 'vue';
import { showFailToast, showSuccessToast, Dialog, Field, CellGroup, showImagePreview } from 'vant';
import { useRouter } from 'vue-router';
import { reqActiveSecret } from '../api/service';
import useStore from '../store';
import { storeToRefs } from 'pinia';

const { userStore } = useStore();
const { user } = storeToRefs(userStore);
const router = useRouter();
const show = ref(false);
const inputSecret = ref('');
const errMsg = ref('');
const menuList = ref([
  { icon: '/assets/images/user/user-item_diamond.png', title: '开通会员畅享无限对话' },
  { icon: '/assets/images/user/user-item_walt.png', title: '加入代理赚钱' },
  { icon: '/assets/images/user/user-item_lock.png', title: '卡密兑换' },
  // { icon: '/assets/images/user/user-item_add.png', title: '我也想搭建同款AI平台' },
  { icon: '/assets/images/user/user-item_add.png', title: '关注公众号', uniBase64: "MzkzOTM4MjQyNQ==" }
]);

// methods
const onFormatter = (val) => {
  if (/^[A-Za-z0-9]+$/.test(val)) {
    errMsg.value = '';
  } else {
    errMsg.value = '请输入有效的卡密';
  }
  return val
}

const onClickItem = async (index) => {
  switch (index) {
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
        images: ['data:image/jpeg;base64,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'],
        showIndex: false,
        closeable: true
      });
      // window.location.href = `https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=${menuList.value[4].uniBase64}&scene=124#wechat_redirect`;
      break;
    default:
      break;
  }
}

const onEmitSecret = () => {
  reqActiveSecret({ id: user.id, secret: inputSecret.value.trim() }).then(res => {
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
  <div class="user-page">
    <div class="main">
      <div class="user-info">
        <img class="avatar" :src="user.avatar">
        <div class="mid">
          <span>ID: {{ user.id }}</span>
        </div>
        <div class="name">
          <span v-if="user.state !== 0" class="vip"></span>{{ user.nickname }}
        </div>
      </div>
      <ul class="menu">
        <li class="menu-item" v-for="(item, index) of menuList" :key="index" @click="onClickItem(index)">
          <div class="left">
            <div class="icon">
              <img class="img" :src="item.icon">
            </div>
            <span class="title">{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </div>

    <Dialog v-model:show="show" title="卡密兑换" show-cancel-button confirm-button-text="兑换" confirm-button-color="#cca4e3"
      @confirm="onEmitSecret" :confirm-button-disabled="errMsg !== ''">
      <CellGroup inset>
        <Field v-model="inputSecret" rows="1" autosize type="textarea" placeholder="请输入你的卡密" :border="true"
          :clearable="true" :formatter="onFormatter" :error-message="errMsg" />
      </CellGroup>
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.user-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 0 10px;
  background-image: linear-gradient(to bottom, #fff, #eee);
  overflow: hidden;
  position: relative;
}

.main {
  width: calc(30px + 100%);
  box-sizing: border-box;
  padding-right: 30px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.user-info {
  margin-top: 20px;
  width: 100%;
  overflow: hidden;
  background-color: #ffffffae;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  padding: 15px 0;
}

.user-info .avatar {
  width: 30%;
  aspect-ratio: 1/1;
  margin-bottom: 15px;
  box-shadow: 0 0 16px 0 $theme;
  border-radius: 50%;
  -webkit-user-drag: none;
  cursor: pointer;
  border: 2px solid $theme;
  background-color: #fff;
}

.user-info .mid {
  flex-shrink: 0;
  width: 100%;
  height: 40px;
  text-align: center;
}

.user-info .mid span {
  line-height: 40px;
}

.user-info .name {
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
}

.user-info .name .vip {
  display: inline-block;
  height: 100%;
  aspect-ratio: 1/1;
  margin-right: 10px;
  background: url(../assets/images/vip.png) no-repeat center/contain;
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
}

.menu .menu-item {
  box-sizing: border-box;
  list-style: none;
  width: 100%;
  height: 80px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffffae;
  width: 100%;
  padding: 10px 15px;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;
  color: var(--theme-color);
  overflow: hidden;
  transition: all 0.3s ease;
}

@media screen and (min-width: 750px) {
  .menu .menu-item:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 10px -15px #6c6c6c;
  }
}

.menu .menu-item .left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  flex: 1;
}

.menu .menu-item .left .icon {
  height: 70px;
  width: 70px;
  border-radius: 20px;
  margin-right: 10px;
  background-color: #eeeeeebf;
}

.menu .menu-item .left .icon .img {
  height: 70px;
  width: 70px;
  object-fit: contain;
  transform: scale(0.6);
}

.menu .menu-item:nth-of-type(1) .left .icon .img {
  transform: scale(2) translateY(6%);
}
</style>
