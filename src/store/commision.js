import { defineStore } from "pinia";
import { ref } from "vue";
import { reqCommisionRecord } from "@/api";

const useCommisionStore = defineStore("commisionStore", () => {
  const commision = ref({
    loaded: false,
    commision: 0,
    commisionRecords: [],
  });

  async function getCommision(payload) {
    if (commision.value.loaded) return;
    const res = await reqCommisionRecord(payload.id);
    commision.value.loaded = true;
    commision.value.commision = res.data.yjzh.toFixed(4);
    const ratio = parseInt(payload.ratio.split("%")[0]) / 100;
    // console.log(ratio);
    commision.value.commisionRecords = res.data.yjjl.map((item) => {
      item.money *= ratio;
      return item;
    });
  }

  return { commision, getCommision };
});

export default useCommisionStore;
