import { defineStore } from 'pinia';
import { ref } from 'vue';

const useCommisionStore = defineStore('commisionStore', () => {
  const commision = ref({
    withDraw: 0,
    commision: 0,
    commisionRecords: [],
  });
  return { commision }
});

export default useCommisionStore;
