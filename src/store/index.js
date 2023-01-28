import { defineStore } from "pinia";
import {reactive} from 'vue';
import useCommisionStore from "./commision";
import useUserStore from "./user";
import useRobotStore from "./robot";

const useStore = defineStore("store", () => {
  const store = reactive({
    commisionStore: useCommisionStore(),
    userStore: useUserStore(),
    robotStore: useRobotStore(),
  });

  return store;
});

export default useStore;
