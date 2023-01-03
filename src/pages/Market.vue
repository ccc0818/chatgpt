<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { payJoinUs } from '../api/api';

const router = useRouter();
const { user } = storeToRefs(useUserStore());

const dataList = [
  { id: 1, level: 'V1', badge: '/assets/images/market/medal_silver.png', price: 199, rate: 50 },
  { id: 2, level: 'V2', badge: '/assets/images/market/medal_gold.png', price: 299, rate: 58 },
  { id: 3, level: 'V3', badge: '/assets/images/market/medal_diamond.png', price: 499, rate: 70 },
];
const proxyInfo = ref({
  level: user.value.level ?? 0,
  promotions: 20
});
const proxyList = computed(() => {
  let tmp = [...dataList];
  if (proxyInfo.value.level !== 0) {
    return [tmp[proxyInfo.value.level - 1]];
  }
  return tmp;
});
const selected = ref(0);


const onScroll = (e) => {
  const length = proxyList.value.length;

  for (let i = length - 1; i >= 0; --i) {
    if (e.target.scrollLeft >= e.target.clientWidth * i) {
      selected.value = i;
      break;
    }
  }
}

const onJoinUs = (index) => {
  payJoinUs(dataList[index].level.toLowerCase())
}

const onWithDraw = () => {
  //TODO: 提现
}
</script>

<template>
  <div class="contain">
    <!-- 头部 -->
    <header>
      <span class="back" @click="() => router.back()">
        <span class="iconfont icon-fanhui back-icon"></span>
        <span class="text">返回</span>
      </span>
      <span class="title">合伙人</span>
    </header>
    <!-- 主体 -->
    <main>
      <!-- 用户信息 -->
      <div class="user">
        <img class="avatar" :src="user.avatar">
        <div class="col">
          <span class="name">{{ user.name }}</span>
          <span class="msg">加入合伙人&ensp;享高额分佣</span>
        </div>
      </div>
      <!-- 代理类型 -->
      <div class="proxy">
        <div class="wrap" @scroll="onScroll">
          <ul class="proxy-list">
            <li class="item" v-for="(item, index) of proxyList" :key="item.id">
              <img :src="item.badge" class="badge">
              <div class="info-panel">
                <span class="level">{{ item.level }}</span>
                <span class="rate">分佣比例{{ item.rate }}%</span>
              </div>

              <!-- 累计推广多少 -->
              <span v-if="proxyInfo.level !== 0" class="promotions">累计推广{{ proxyInfo.promotions }}单</span>

              <div v-if="proxyInfo.level === 0" class="join" @click="() => onJoinUs(index)">{{ item.price }}立即加入</div>
              <div v-else class="join" @click="() => onWithDraw(index)">立即提现</div>
            </li>
          </ul>
        </div>
        <div class="ind" v-if="proxyInfo.level === 0">
          <span class="dot" v-for="(item, index) of proxyList" :class="selected === index ? 'active' : ''"></span>
        </div>
      </div>
      <!-- 展示信息 -->
      <div class="title-h">加入合伙人尊享高额分佣</div>
      <div class="icon-list">
        <div class="item">
          <img class="img" src="/assets/images/market/icon-motor.png">
          <span class="text">享平台扶持</span>
        </div>
        <div class="item">
          <img class="img" src="/assets/images/market/icon-schedule.png">
          <span class="text">宣传物料</span>
        </div>
        <div class="item">
          <img class="img" src="/assets/images/market/icon-assistant.png">
          <span class="text">专属客服</span>
        </div>
        <div class="item">
          <img class="img" src="/assets/images/market/icon-tips.png">
          <span class="text">免服务费</span>
        </div>
      </div>
      <div class="title-h">加入合伙人须知</div>
      <p class="item-p">1、代理费不支持退款，请确保能解决您的实际问题</p>
      <p class="item-p">2、享受平台扶持，每10单奖励45/55/80，达到门槛联系客服</p>
      <p class="item-p">3、V1分佣比例50%， V2比例58%，V3比例70%</p>
      <p class="item-p">4、精美的宣传海报和物料助力成功。</p>
      <p class="item-p">5、上下级终身鄉定，一劳永逸享受高额分佣！</p>
      <p class="item-p">6、您只管推广分佣，售后及技术支持交给我们！</p>
      <p class="item-p center">我们將随时为您的成功做好谁备！</p>
      <p class="item-p">最终解释权归亿柏科技所有</p>
      <p class="item-p">成都亿柏科技客户服务热线：400-6688-546</p>
    </main>
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
  background-color: #323E5F;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 20px 10px;

  header {
    display: flex;
    align-items: center;
    color: #eee;
    font-size: 14px;
    justify-content: space-around;

    .back {
      position: fixed;
      display: flex;
      align-items: center;
      top: 20px;
      left: 10px;

      .back-icon,
      .text {
        vertical-align: middle;
      }
    }

  }

  main {
    display: flex;
    flex-direction: column;
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
      height: 64px;
      overflow: hidden;
      display: flex;
      flex-shrink: 0;
      align-items: center;

      .avatar {
        height: 80%;
        background-color: rgba($color: #fff, $alpha: 0.8);
        border-radius: 50%;
        -webkit-user-drag: none;
      }

      .col {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        flex: 1;
        padding-right: 10px;

        .name {
          font-size: 14px;
          color: #eee;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .msg {
          margin-top: 5px;
          font-size: 12px;
          color: #DFC7AF;
        }
      }
    }

    .proxy {
      width: 100%;
      overflow: hidden;
      margin-bottom: 10px;
      flex-shrink: 0;

      .wrap {
        width: 100%;
        height: 180px;
        overflow-x: auto;
        padding-top: 15px;

        &::-webkit-scrollbar {
          display: none;
        }

        .proxy-list {
          width: 100%;
          height: 100%;
          display: flex;

          .item {
            background: url('/assets/images/market/card.png') no-repeat center/100% 100%;
            width: 100%;
            height: 100%;
            flex-shrink: 0;
            position: relative;
            margin-right: 10px;
            position: relative;

            .badge {
              height: 90px;
              position: absolute;
              right: 20px;
              top: -15px;
            }

            .info-panel {
              display: flex;
              flex-direction: column;
              position: absolute;
              top: 5px;
              left: 20px;

              .level {
                color: #3C2913;
                font-size: 36px;
                font-weight: 900;
                font-style: italic;
              }

              .rate {
                color: #A6926B;
              }
            }

            .join {
              padding: 10px 15px;
              border-radius: 30px;
              background-color: #3A3E52;
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              right: 20px;
              bottom: 25px;
              font-size: 14px;
              color: #ADB2BE;
              user-select: none;
            }

            .promotions {
              color: #A3906B;
              display: inline-block;
              position: absolute;
              bottom: 30px;
              left: 20px;
              font-size: 14px;
            }
          }
        }
      }

      .ind {
        display: flex;
        width: 100%;
        height: 20px;
        flex: 1;
        justify-content: center;
        align-items: center;

        .dot {
          display: inline-block;
          height: 3px;
          width: 10px;
          aspect-ratio: 1/1;
          // border-radius: 50%;
          background-color: rgba(238, 238, 238, 0.5);
          margin-right: 5px;

          &.active {
            background-color: #eee;
          }
        }
      }
    }

    .title-h {
      padding-left: 10px;
      color: #FADDBC;
      border-left: 3px solid #FADDBC;
      font-size: 14px;
    }

    .icon-list {
      height: 80px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 10px 0;
      flex-shrink: 0;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 90%;
        color: #eee;

        .img {
          width: 48px;
          border: 1px solid #FADDBC;
          border-radius: 50%;
          -webkit-user-drag: none;
        }

        .text {
          font-size: 12px;
        }
      }
    }

    .item-p {
      font-size: 12px;
      color: #DFC7AF;
      line-height: 24px;

      &.center {
        text-align: center;
      }
    }
  }
}
</style>
