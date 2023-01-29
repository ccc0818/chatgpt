import { defineStore } from 'pinia';
import { ref } from 'vue';

const useCommisionStore = defineStore('commisionStore', () => {
  const commision = ref({
    loaded: false,
    commision: 0,
    commisionRecords: [],
  });

  function getCommision(id) {
    if (loaded)
      return;
     reqCommisionRecord(id)
      .then((res) => {
        // console.log(res)
        if (res.status === 200) {
          commision.value.loaded = true;
          commision.value.commision = res.data.yjzh.toFixed(4);
          commision.value.commisionRecords = res.data.yjjl;
        }
      })
      .catch((err) =>
        showNotify({ type: "danger", message: "获取佣金信息失败!" + err })
      );
  }

  return { commision, getCommision };
});

export default useCommisionStore;
