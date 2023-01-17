<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '../stores/user';
import { reqPay, reqPriceRate, reqUserInfo } from '../api/service';
import { storeToRefs } from 'pinia';
import { showFailToast } from 'vant';

const router = useRouter();
const { user } = storeToRefs(useUserStore());

const proxyList = ref([
  { id: 1, level: 'v1', price: 199, rate: 50 },
  { id: 2, level: 'v2', price: 299, rate: 58 },
  { id: 3, level: 'v3', price: 499, rate: 70 },
]);
const selected = ref(-1);

// 请求分佣数据
reqPriceRate().then(res => {
  proxyList.value[0].price = res.data.distributed_one;
  proxyList.value[0].rate = res.data.v_one;
  proxyList.value[1].price = res.data.distributed_two;
  proxyList.value[1].rate = res.data.v_two;
  proxyList.value[2].price = res.data.distributed_three;
  proxyList.value[2].rate = res.data.v_three;
}).catch(() => {
  showFailToast({
    message: '获取会员价格失败!',
    duration: 3000
  })
})

// methods
const onPayProxy = () => {
  reqPay({ id: user.value.id, type: 'distributed', money: proxyList.value[selected.value].price }, () => reqUserInfo(user.value.id));
}
</script>

<template>
  <div class="contain">
    <!-- 返回 -->
    <span class="iconfont icon-fanhui1 back" @click="() => router.back()"></span>
    <!-- 头部 -->
    <header>
      <span class="title">合伙人</span>
    </header>
    <!-- 主体 -->
    <main>
      <!-- 用户信息 -->
      <div class="user">
        <img class="avatar" :src="user.avatar">
        <span class="name">{{ user.name }}</span>
      </div>
      <!-- 展示信息 -->
      <div class="title-h">合伙人权益</div>
      <div class="power-card">
        <div class="item">
          <img class="img" src="/assets/images/market/icon-1.png">
          <span class="text">平台扶持</span>
        </div>
        <div class="item">
          <img class="img" src="/assets/images/market/icon-3.png">
          <span class="text">免提现手续费</span>
        </div>
        <div class="item">
          <img class="img" src="/assets/images/market/icon-2.png">
          <span class="text">宣传物料</span>
        </div>
        <div class="item">
          <img class="img" src="/assets/images/market/icon-4.png">
          <span class="text">专属客服</span>
        </div>
      </div>
      <!-- 加入我们卡片 -->
      <div v-if="user.partner === '' || user.partner === undefined || user.partner === null" class="join-card"
        @click.stop="selected = 0">
        <div class="icon">
          <span class="iconfont icon-user"></span>
        </div>
        <div class="col">
          <p>加入合伙人</p>
          <p>加入合伙人，享高额分佣！</p>
        </div>
      </div>
      <div v-else class="join-card" @click.stop="() => router.push('/market_center')">
        <div class="icon">
          <span class="iconfont icon-user"></span>
        </div>
        <div class="col">
          <p>{{ user.partner }}合伙人</p>
          <p>当前分佣比例{{ user.ratio }}</p>
        </div>
        <div class="detail">详情</div>
      </div>
      <div class="title-join-rule">合伙人服务条款：</div>
      <p class="item-p">1、服务费不支持退款，请确保能解决您的实际问题</p>
      <p class="item-p">2、享受平台扶持，每10单奖励45/55/80</p>
      <p class="item-p">3、V1合伙人分佣比例40%，V2：48%，V3：60%</p>
      <p class="item-p">4、精美的宣传海报和物料助力成功。</p>
      <p class="item-p">5、上下级终身绑定，一劳永逸享受高额分佣！</p>
      <p class="item-p">6、下级成为合伙人服务费也享受分佣</p>
      <p class="item-p">7、您只管推广分佣，售后及技术支持交给我们！</p>
      <p class="item-p">8、推广方式以二维码或推广链接推广。</p>
      <div class="title-join-rule">合伙人红线警告：</div>
      <p class="item-p warn">（1）必须以真实产品情况进行推广</p>
      <p class="item-p warn">（2）不能过分夸大宣传产品特性</p>
      <p class="item-p warn">（3）不能私自做出任何平台服务范围外的承诺</p>
      <p class="item-p warn">支付服务费成为合伙人即代表已仔细阅读并知悉认可服务条款和承诺遵守红线规则。</p>
      <p class="item-p warn">重要：触碰平台红线可能会导致佣金无法结算。</p>
      <p class="item-p center">那么，现在加入我们吧，让我们开始！</p>
      <p class="item-p center">我们將随时为您的成功做好谁备！</p>
      <footer>
        <p>最终解释权归亿柏科技所有</p>
        <p>成都亿柏科技客户服务热线：400-6688-546</p>
      </footer>
    </main>
    <Transition name="mask" mode="out-in">
      <div class="mask" v-if="selected !== -1" @click.stop="selected = -1" @touchmove.prevent="">
        <div class="proxy-contain">
          <div class="proxy-card" :class="idx === selected ? 'active' : ''" v-for="(i, idx) of proxyList" :key="i.id"
            @click.stop="selected = idx">
            <span class="proxy-level">{{ i.level }}</span>
            <span class="rate">分佣比例{{ i.rate }}%</span>
            <span class="price">￥{{ i.price }}</span>
          </div>
        </div>
        <div class="purchase" @click.stop="onPayProxy">立即加入</div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/icon-fonts/iconfont.css';

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

.contain {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  position: relative;
  padding: 30px 20px 15px 20px;
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
    width: 100%;
    flex: 1;
    margin-top: 20px;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .user {
      width: 100%;
      height: 150px;
      overflow: hidden;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .avatar {
        height: 100px;
        border-radius: 50%;
        -webkit-user-drag: none;
        box-shadow:
          0px 24.5px 24.7px rgba(255, 120, 154, 0.057),
          0px 20.4px 32.6px rgba(250, 135, 164, 0.068),
          0px 15.8px 36.2px rgba(250, 135, 164, 0.075),
          0px 186px 80px rgba(250, 135, 164, 0.1);
      }

      .name {
        font-size: 24px;
        color: #69515D;
      }
    }

    .join-card {
      width: 95%;
      height: 90px;
      margin: 10px auto;
      border-radius: 15px;
      display: flex;
      align-items: center;
      background-image: linear-gradient(to right, #f0e8f3, #e9f0fa);
      padding: 10px 20px;

      .icon {
        height: 100%;
        aspect-ratio: 1/1;
        background: url('/assets/images/market/icon-5.png') no-repeat -35px -28px/200%;

        span {
          display: block;
          width: 100%;
          height: 100%;
          line-height: 70px;
          font-size: 30px;
          text-align: center;
          color: #fff;
          user-select: none;
        }
      }

      .col {
        flex: 1;
        margin-left: 20px;

        p {
          &:nth-of-type(1) {
            color: #A06784;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 10px;
          }

          &:nth-of-type(2) {
            color: #AAA6C0;
            font-size: 12px;
          }
        }
      }

      .detail {
        width: 70px;
        height: 36px;
        border-radius: 8px;
        font-size: 14px;
        color: #A06784;
        text-align: center;
        line-height: 36px;
        background-color: #97cbee;
      }
    }

    .title-h {
      color: #A06784;
      font-size: 24px;
      font-weight: 700;
      margin: 20px 0 10px 0;
    }

    .power-card {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 100%;
        width: 80px;

        .img {
          width: 48px;
          aspect-ratio: 1/1;
          border-radius: 15px;
          object-fit: contain;
          -webkit-user-drag: none;
        }

        .text {
          font-size: 12px;
          color: #A06784;
        }
      }
    }

    .title-join-rule {
      font-size: 18px;
      color: #A06784;
      font-weight: 800;
      margin: 20px 0 10px 0;
    }

    .item-p {
      font-size: 14px;
      color: #AAA6C0;
      line-height: 24px;

      &.center {
        text-align: center;
      }

      &.warn {
        color: red;
        text-decoration: underline;
      }
    }

    footer {
      margin-top: 15px;
      text-align: center;
      font-size: 12px;
      color: #AAA6C0;
      line-height: 16px;
    }
  }

  .mask-enter-from,
  .mask-leave-to {
    transform: translateY(100%);
  }

  .mask-enter-to,
  .mask-leave-from {
    transform: translateY(0);
  }


  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    background-color: rgba($color: #bbb, $alpha: 0.5);
    backdrop-filter: blur(16px);
    transition: all .25s linear;

    .proxy-contain {
      width: 100%;
      margin: auto;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding: 10px 20px;
      z-index: 2;

      .proxy-card {
        width: 100%;
        height: 80px;
        margin-bottom: 20px;
        background-color: #fff;
        border-radius: 15px;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all .1s linear;
        color: #A06784;
        font-weight: 800;

        .proxy-level {
          font-size: 40px;
        }

        .rate {
          font-size: 16px;
          font-weight: 500;
        }

        .price {
          font-size: 24px;
        }

        &.active {
          border: 5px solid #f1ab92;
          background-color: #ffefea;
          transform: translateY(-5px) scale(1.04);
        }
      }
    }

    .purchase {
      width: 80%;
      height: 60px;
      border-radius: 15px;
      text-align: center;
      line-height: 60px;
      color: #eee;
      font-size: 20px;
      background-image: linear-gradient(30deg, #f1ab92, #7abeec);
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
