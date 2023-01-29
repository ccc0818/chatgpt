import { defineStore } from "pinia";
import { ref } from "vue";
import { reqUserInfo } from "@/api/service";

const useUserStore = defineStore("userStore", () => {
  const user = ref({
    loaded: false,
    id: -1,
    nickname: "未登陆",
    avatar: "/assets/images/user/user-head.svg",
    // vip: 0, //vip 状态 0 不是 1 是
    // number: 0, //普通用户剩余消息条数
    // startTime: '',
    // endTime: '',
    // chatKey: '', //会员密匙
    // parentUserId: -1,
    // withdraw: '', //佣金
    // partner: '', //合伙人状态
    // // partner: 'v1',
    // ratio: '' // 当前分佣比例
  });

  // actions
  function setUser(obj) {
    user.value = {
      ...user.value,
      ...obj,
    };
  }

  async function getUserInfo(id) {
    if (user.value.loaded) return;

    const resp = await reqUserInfo(id);
    if (!resp) return;

    user.value = resp.data.user_id;
    user.value.loaded = true;

    console.log("用户信息加载完成", user);

    // user.id = userInfo.id;
    // user.nickname = userInfo.nickname;
    // user.avatar = userInfo.avatar;
    // user.vip = userInfo.state;
    // user.number = userInfo.number;
    // user.startTime = userInfo.starttime;
    // user.endTime = userInfo.endtime;
    // user.chatKey = userInfo.chat_key;
    // user.parentUserId = userInfo.parent_user_id;
    // user.withdraw = userInfo.yongjin;
    // user.partner = userInfo.partner;
    // user.ratio = userInfo.ratio;
  }

  async function refreshUserInfo() {
    if (!user.value.loaded)
      return;
      
    const resp = await reqUserInfo(user.value.id);
    if (!resp) return;
    user.value = resp.data.user_id;
  }

  return { user, setUser, getUserInfo, refreshUserInfo };
});

export default useUserStore;
