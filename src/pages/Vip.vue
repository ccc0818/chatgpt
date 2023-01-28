<script setup>
import { ref } from 'vue';
import useStore from '../store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { reqPriceRate, reqPay, reqUserInfo } from '../api/service';

const router = useRouter();
const { userStore } = useStore();
const { user } = storeToRefs(userStore);
const { refreshUserInfo } = userStore;
const vipTypeList = ref([
  { id: 0, title: '月度会员', price: 49, oldPrice: 69, save: '' },
  { id: 1, title: '季度会员', price: 109, oldPrice: 207, save: '', hot: true },
  { id: 2, title: '年度会员', price: 298, oldPrice: 828, save: '' },
])
const selectedIndex = ref(0);

reqPriceRate().then(res => {
  vipTypeList.value[0].price = res.data.vip_one;
  vipTypeList.value[1].price = res.data.vip_two;
  vipTypeList.value[2].price = res.data.vip_three;
  vipTypeList.value.forEach(i => i.save = `立省${i.oldPrice - i.price}元`)
}).catch(() => {
  console.log('获取会员价格失败!');
})

// methods
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
  reqPay({ id: user.id, type: 'vip', money: vipTypeList.value[selectedIndex.value].price }, refreshUserInfo);
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
          <span class="name">{{ user.nickname }}</span>
          <span class="date">{{ user.state ? `畅聊会员将于: ${user.endTime.split(' ')[0]}到期` : '开通会员享畅聊' }}</span>
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
    <div class="type-list">
      <ul class="combo">
        <li class="item" v-for="(item, index) of vipTypeList" :key="item.id" :class="getClass(index, item)"
          @click="selectedIndex = index">
          <span class="title">{{ item.title }}</span>
          <span class="price">¥ <span class="price-n">{{ item.price }}</span></span>
          <span class="old-price">¥{{ item.oldPrice }}</span>
          <span class="save">{{ item.save }}</span>
        </li>
      </ul>
    </div>

    <!-- 提示 -->
    <p class="tips">会员服务为虚拟商品，支付成功后不支持退款</p>

    <!-- 开通 -->
    <div class="btn" @click="payVip">{{ user.state ? '立即续费' : '立即开通' }}</div>
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
        background-color: #fff;
        border: 2px solid #fff;
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
      display: grid;
      grid-template-columns: repeat(2, 50%);
      gap: 8px;
      height: 120px;

      .item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .img {
          height: 48px;
        }

        .col {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: calc(100% - 48px);
          justify-content: center;
          padding-left: 8px;


          .name {
            font-size: 14px;
            font-weight: 900px;
          }

          .mark {
            font-size: 12px;
            color: #c3c3c3;
            transform-origin: left;
            transform: scale(0.8);
            white-space: normal;
          }
        }
      }
    }
  }

  .type-list {
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 30px 0;
    // margin: 0 10px;

    &::-webkit-scrollbar {
      display: none;
    }

    .combo {
      // box-sizing: content-box;
      display: flex;
      min-width: 100%;
      align-items: center;
      padding: 0 10px;
      // border: 1px solid red;
      width: fit-content;
      justify-content: space-around;

      .item {
        list-style: none;
        list-style-position: inside;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #c3c3c3;
        border-radius: 10px;
        width: clamp(150px, 150px, 200px);
        padding: 15px 0;
        margin: 0 5px;
        flex: 0 0 auto;
        position: relative;
        cursor: pointer;

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
