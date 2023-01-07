import { defineStore } from 'pinia';
import { ref } from 'vue';

const useUserStore = defineStore('userStore', () => {
  const user = ref({
    id: -1,
    nickname: '未登陆',
    avatar: '/assets/images/user/user-head.svg',
    vip: 0, //vip 状态 0 不是 1 是
    number: 0, //普通用户剩余消息条数
    startTime: '',
    endTime: '',
    chatKey: '', //会员密匙
    parentUserId: -1,
    commision: '', //佣金
    partner: '', //合伙人状态
    // partner: 'v1',
    ratio: '' // 当前分佣比例
  });
  return { user };
});

export default useUserStore;
