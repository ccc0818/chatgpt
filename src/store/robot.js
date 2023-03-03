import { defineStore } from "pinia";
import { ref } from "vue";
import RobotImg from "@/assets/images/chat/robot-avatar.png";

const useRobotStore = defineStore("robotStore", () => {
  let id = 1;
  let uid = 1;
  const robots = ref({
    changed: false,
    currentRobot: null,
    robots: [
      {
        id: id++,
        name: "通用型", //机器人名字
        avatar: RobotImg, //头像
        salutation:
          "你好，我是人工智能ChatGPT，一个由OpenAI训练的大型语言模型。", //问候语
        type: "你是一个聊天助手", //类型
      },
      {
        id: id++,
        name: "健康助手",
        avatar: "/assets/images/robots/doctor.png",
        salutation: "您好，请问您现在有什么症状吗？",
        type: "现在开始,你的名字是健康助手,你是身份是一个医生,你只需要根据我的问题给出诊疗方案。",
      },
      {
        id: id++,
        name: "翻译助手",
        avatar: "/assets/images/robots/translator.png",
        salutation:
          "您好，请说出您想要翻译的话，并指定翻译需要翻译成什么语言。",
        type: "现在开始,你的名字是翻译助手,你只需要将我说的话理解并翻译出来,我可能会使用任何类型的语言,请你尽可能翻译的更优雅一点,最后你只需要把翻译的结果给我就好。",
      },
      {
        id: id++,
        name: "面试官",
        avatar: "/assets/images/robots/interviewer.png",
        salutation: "你好, 让我们开始吧。请问你为什么想要这份工作？",
        type: "现在开始,你的名字是HR, 你将模仿为一位面试官与我对话。",
      },
      {
        id: id++,
        name: "javascript控制台",
        avatar: "/assets/images/robots/javascript-console.png",
        salutation: "请输入你的代码:",
        type: "现在开始, 你将作为一个javascript的控制台, 你只需要将我发给你的指令代码执行的结果返回给我即可。",
      },
    ],
    userRobots: [],
  });

  function initRobots() {
    const robotsItem = localStorage.getItem("robots");
    if (robotsItem) {
      const robotsArr = JSON.parse(robotsItem);
      robotsArr.forEach((i) => {
        robots.value.userRobots.push({ ...i, id: id++ });
      });
    }
  }

  function saveRobots() {
    localStorage.setItem("robots", JSON.stringify(robots.value.userRobots));
  }

  function setOneRobot({ name, avatar, salutation, type }) {
    robots.value.userRobots.push({ id: uid++, name, avatar, salutation, type });
    saveRobots();
  }

  function removeOneRobot(idx) {
    robots.value.userRobots.splice(idx, 1);
    saveRobots();
  }

  return { robots, initRobots, setOneRobot, removeOneRobot };
});

export default useRobotStore;
