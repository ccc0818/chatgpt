<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/user'
import { activeCdkey } from '../api/api';

const { user } = storeToRefs(useUserStore());
const pageEl = ref(null);
const router = useRouter();

const menuList = ref([
  { icon: '/assets/images/user/user-item_diamond.png', title: '开通会员畅享无限对话' },
  { icon: '/assets/images/user/user-item_walt.png', title: '加入代理赚钱' },
  { icon: '/assets/images/user/user-item_lock.png', title: '卡密兑换' },
  { icon: '/assets/images/user/user-item_add.png', title: '我也想搭建同款AI平台' },
]);

const onClickItem = async (index) => {
  switch (index) {
    case 0: //开通会员
      router.push('/vip');
      break;
    case 1:
      // user.value.level = 'v1'
      user.value.level ? router.push("/market_center") : router.push("/market");
      break;
    case 3:
      window.location.href = 'https://work.weixin.qq.com/kfid/kfc03f8a1759c818c57';
      break;
    case 2: //兑换卡密
      ElMessageBox.prompt('', '', {
        confirmButtonText: '兑换',
        cancelButtonText: '取消',
        center: true,
        roundButton: true,
        showClose: false,
        showInput: true,
        showCancelButton: true,
        closeOnHashChange: true,
        inputPlaceholder: '输入你的卡密',
        inputErrorMessage: '卡密格式错误',
        inputPattern: /^[a-zA-Z0-9-_]+$/,
        appendTo: pageEl.value,
        callback: () => { },
        beforeClose(action, instance, done) {
          if (action === 'confirm') {
            activeCdkey({ id: user.value.id, code: instance.inputValue.trim() }).then(res => {
              if (res.data.includes("激活成功")) {
                ElMessage({
                  type: 'success',
                  message: '激活成功',
                })
              } else {
                ElMessage({
                  type: 'error',
                  message: '激活失败',
                })
              }
            }).finally(() => done())
          } else
            done();
        }
      })
      break;
    default:
      break;
  }
}

</script>

<template>
  <div ref="pageEl" class="user-page">
    <div class="main">
      <div class="user-info">
        <img class="avatar" :src="user.avatar">
        <div class="name"><span v-if="user.vip" class="vip"></span>{{ user.name }}</div>
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
  </div>
</template>

<style>
.el-overlay-message-box::after {
  content: '';
  width: 0 !important;
  height: 0 !important;
  overflow: hidden;
}

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
  padding: 30px 0;
}

.user-info .avatar {
  width: 30%;
  aspect-ratio: 1/1;
  margin-bottom: 30px;
  box-shadow: 0 0 16px 0 #9370d8;
  border-radius: 50%;
  -webkit-user-drag: none;
  cursor: pointer;
}

.user-info .name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 30px;
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
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 20px;
  margin-right: 10px;
  background-color: #eeeeeebf;
}

.menu .menu-item .left .icon .img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: scale(0.6);
}

.menu .menu-item:nth-of-type(1) .left .icon .img {
  transform: scale(2) translateY(6%);
}
</style>
