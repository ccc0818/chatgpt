import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const user = ref({
    login: false,
    name: '访客',
    avatar: '/assets/images/user/user-head.svg',
    vip: false,
    id: -1,
    openid: ''
  });
  return { user };
});
