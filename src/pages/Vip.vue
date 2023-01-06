<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user } = storeToRefs(useUserStore());
const vipTypeList = ref([
  { id: 0, title: '月度会员', price: 49, oldPrice: 69, save: '立省20元'},
  { id: 1, title: '季度会员', price: 109, oldPrice: 207, save: '立省78元', hot: true },
  { id: 2, title: '年度会员', price: 298, oldPrice: 828, save: '立省530元' },
])
const selectedIndex = ref(0);

const getClass = (index, item) => {
  let classStr = '';
  if (index === selectedIndex.value)
    classStr += ' active'

  if (item.hot)
    classStr += ' hot'

  return classStr;
}

// 支付购买
const payVip = () => {
  //TODO: 微信支付购买vip
} 
</script>

<template>
  <div class="view">
    <!-- 返回按钮 -->
    <span class="return" @click="router.back()">&lt; 返回</span>
    <div class="background"></div>
    <!-- header -->
    <div class="header">会员中心</div>
    <!-- card -->
    <div class="card">
      <div class="row">
        <img class="avatar" :src="user.avatar">
        <div class="col">
          <span class="name">{{ user.name }}</span>
          <span class="date">{{ user.vip ? `畅聊会员将于: ${user.endTime.split(' ')[0]}到期` : '开通会员享畅聊'}}</span>
        </div>
      </div>
      <img class="logo" src="../assets/images/vip/ChatVIP.png">
    </div>

    <!-- 业务卡片 -->
    <div class="vip-power">
      <span class="title">会员权益</span>
      <div class="panel">
        <div class="item">
          <img class="img" src="../assets/images/vip/own.png">
          <div class="col">
            <span class="name">独享接口</span>
            <span class="mark">一人独享一条接口畅快对话</span>
          </div>
        </div>
        <div class="item">
          <img class="img" src="../assets/images/vip/rocket.png">
          <div class="col">
            <span class="name">超低延迟</span>
            <span class="mark">超低延迟回复秒回</span>
          </div>
        </div>
        <div class="item">
          <img class="img" src="../assets/images/vip/unlimit.png">
          <div class="col">
            <span class="name">无限畅聊</span>
            <span class="mark">不受对话次数限制</span>
          </div>
        </div>
        <div class="item">
          <img class="img" src="../assets/images/vip/customer.png">
          <div class="col">
            <span class="name">专属客服</span>
            <span class="mark">1对1客服</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 套餐列表 -->
    <ul class="combo">
      <li class="item" v-for="(item, index) of vipTypeList" :key="item.id" :class="getClass(index, item)"
        @click="selectedIndex = index">
        <span class="title">{{ item.title }}</span>
        <span class="price">¥ <span class="price-n">{{ item.price }}</span></span>
        <span class="old-price">¥{{ item.oldPrice }}</span>
        <span class="save">{{ item.save }}</span>
      </li>
    </ul>

    <!-- 提示 -->
    <p class="tips">会员服务为虚拟商品，支付成功后不支持退款</p>

    <!-- 开通 -->
    <div class="btn" @click="payVip">{{user.vip ? '立即续费' : '立即开通'}}</div>
  </div>
</template>

<style lang="scss" scoped>
$header-color: #434045;

.view {
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  .return {
    display: block;
    position: absolute;
    left: 15px;
    top: 20px;
    color: #eee;
    user-select: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .background {
    width: 100%;
    height: 250px;
    background-color: $header-color;
    border-radius: 0% 0% 0% 80% / 0% 0% 0% 13%;
    position: absolute;
    top: 0;
    z-index: -1;
  }

  .header {
    color: #fff;
    text-align: center;
    padding: 20px 0 20px 0;
  }

  .card {
    background: url(../assets/images/vip/card.png) no-repeat center/cover;
    margin: 0 15px;
    border-radius: 10px;
    height: 150px;
    overflow: hidden;
    position: relative;

    .row {
      padding: 5px 15px;
      margin-top: 30px;
      display: flex;
      height: 40%;
      align-items: center;

      .avatar {
        height: 100%;
        border-radius: 50%;
        margin-right: 10px;
      }

      .col {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .name {
          font-size: 18px;
          color: #eee;
        }

        .date {
          font-size: 14px;
          color: #918aa2;
        }
      }
    }

    .logo {
      position: absolute;
      bottom: 10px;
      left: 15px;
    }
  }

  .vip-power {
    padding: 10px 15px 15px 15px;
    margin-top: 30px;
    overflow: hidden;
    border-bottom: 1px solid #e9e9e99c;

    .title {
      font-size: 18px;
      color: black;
    }

    .panel {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-around;
      height: 120px;
      border: none;

      .item {
        display: flex;
        align-items: center;
        width: 50%;

        .img {
          height: 48px;
          margin-right: 8px;
        }

        .col {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: flex-end;

          .name {
            font-size: 14px;
            font-weight: 900px;
          }

          .mark {
            font-size: 12px;
            color: #c3c3c3;
            transform-origin: left;
            transform: scale(0.8);
            white-space: nowrap;
          }
        }
      }
    }
  }

  .combo {
    padding: 20px 15px 10px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }

    .item {
      list-style: none;
      list-style-position: inside;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #c3c3c3;
      border-radius: 10px;
      padding: 15px;
      margin: 0 5px;
      flex-shrink: 0;
      position: relative;

      .title {
        font-size: 16px;
        color: #8e887e;
        margin-bottom: 10px;
      }

      .price {
        font-size: 18px;
      }

      .price-n {
        font-weight: 900;
        font-style: italic;
        font-size: 24px;
      }

      .old-price {
        font-size: 18px;
        color: #c3c3c3;
        text-decoration: line-through;
        margin-bottom: 10px;
      }

      .save {
        background-color: #ecdfcb;
        padding: 3px 10px;
        font-size: 14px;
        border-radius: 15px;
      }
    }

    .active {
      background-color: #f5eee3;
    }

    .hot::after {
      content: '热门';
      width: 40px;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      top: -20px;
      background-color: #171717;
      color: rgb(166, 166, 166);
      font-size: 12px;
      border-radius: 13px 13px 13px 0;
    }
  }

  .tips {
    font-size: 12px;
    color: #838383;
    text-align: center;
    margin-bottom: 20px;
  }

  .btn {
    margin: 0 15px;
    padding: 15px 0;
    background-color: #e9d1ba;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin-bottom: 40px;
    border-radius: 5px;
  }
}
</style>
