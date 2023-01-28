import { defineStore } from 'pinia';
import { reactive } from 'vue';

const useCommisionStore = defineStore('commisionStore', () => {
  const commision = reactive({
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
          commision.loaded = true;
          commision.commision = res.data.yjzh.toFixed(4);
          commision.commisionRecords = res.data.yjjl;
        }
      })
      .catch((err) =>
        showNotify({ type: "danger", message: "获取佣金信息失败!" + err })
      );
  }

  return { commision, getCommision };
});

export default useCommisionStore;
