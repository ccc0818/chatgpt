import useCommisionStore from "./commision";
import useUserStore from "./user";
import useRobotStore from "./robot";

export default function useStore() {
  return {
    commisionStore: useCommisionStore(),
    userStore: useUserStore(),
    robotStore: useRobotStore(),
  };
};

