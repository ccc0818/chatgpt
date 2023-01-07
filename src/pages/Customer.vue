<script setup>
import { ref, computed, defineAsyncComponent, onBeforeMount, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import useCommisionStore from '../stores/commision';

const Header = defineAsyncComponent(() => import('../components/Header.vue'));
const router = useRouter();
const inputData = ref('');
const filterKey = ref('全部');
const { commision } = useCommisionStore();
const customers = [...commision.commisionRecords];

const customerList = computed(() => {
  let tmp = null;
  if (filterKey.value === '全部')
    tmp = [...customers];
  else if (filterKey.value === '会员')
    tmp = customers.filter(i => i.type.includes('会员'));
  else if (filterKey.value === '合伙人')
    tmp = customers.filter(i => i.type.includes('合伙人'));

  return tmp.filter((i) => i.user_id.toString() === inputData.value || i.name.includes(inputData.value));
})

</script>

<template>
  <div class="contain">
    <Header title="我的客户" @onBack="router.back()"></Header>
    <main>
      <!-- 搜索 -->
      <div class="search">
        <span class="iconfont icon-sousuo icon"></span>
        <input type="text" placeholder="请输入昵称/用户ID" v-model="inputData">
      </div>
      <!-- 过滤器 -->
      <div class="filter">
        <span :class="filterKey === '全部' ? 'active' : ''" @click="filterKey = '全部'">全部</span>
        <span :class="filterKey === '会员' ? 'active' : ''" @click="filterKey = '会员'">会员</span>
        <span :class="filterKey === '合伙人' ? 'active' : ''" @click="filterKey = '合伙人'">合伙人</span>
      </div>
      <!-- 列表区 -->
      <ul class="customer-contain">
        <li class="item" v-for="(i, idx) of customerList" :key="i.id">
          <div class="left">
            <img class="avatar" :src="i.tx === '' ? '/assets/images/user/user-head.svg' : i.tx" draggable="false">
            <p class="id">ID: {{ i.user_id }}</p>
          </div>
          <div class="right">
            <p class="name">{{ i.name }}</p>
            <p class="vip-type">等级: {{ i.type }}</p>
            <p class="time">时间: {{ i.time }}</p>
            <p class="commision">佣金: {{ i.money }}</p>
          </div>
        </li>
      </ul>
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
  background-color: #f5f5f5;
  position: relative;
  display: flex;
  flex-direction: column;

  main {
    width: 100%;
    height: calc(100vh - 50px);
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .search {
      width: 90%;
      height: 40px;
      margin: 10px auto;
      background-color: #fff;
      border-radius: 20px;
      color: #BEBEBE;
      font-size: 20px;
      padding: 0 10px;
      display: flex;
      align-items: center;

      .icon {
        color: #BEBEBE;
        font-size: 20px;
        font-weight: 400;
      }

      input[type=text] {
        flex: 1;
        height: 80%;
        outline: none;
        border: none;
        padding-left: 10px;
        color: #333;
        font-size: 16px;

        &::placeholder {
          font-size: 16px;
          color: #BEBEBE;
        }
      }
    }

    .filter {
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #fff;
      border-bottom: 1px solid #eee;

      span {
        display: inline-block;
        padding: 0 10px;
        height: 100%;
        text-align: center;
        line-height: 45px;
        color: #5D5D5D;

        &.active {
          border-bottom: 3px solid #46C8F8;
        }
      }
    }

    .customer-contain {
      flex: 1;
      background-color: #fff;
      overflow-x: hidden;
      overflow-y: auto;
      scroll-behavior: smooth;

      .item {
        width: 100%;
        height: 120px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;

        .left,
        .right {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-around;
        }

        .left {
          align-items: center;
          width: 100px;
          padding: 10px;

          .avatar {
            width: 80%;
            border-radius: 50%;
          }

          .id {
            color: #999;
            font-size: 14px;
            margin-top: 8px;
            width: 80%;
            text-align: center;
          }
        }

        .right {
          justify-content: space-evenly;
          font-size: 14px;
          color: #999;

          .name {
            color: #000;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
