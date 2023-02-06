import { showNotify } from "vant";
import { reqApiKeyArrear } from "./service";
import useStore from "@/store";
import { storeToRefs } from "pinia";
import axios from "axios";

let reader;
const model = localStorage.getItem("model");

const gptJoinPrompt = chatRecords => {
  let queryStr = "";
  chatRecords.forEach(i => {
    if (i.id === 0) {
      queryStr += i.message + "\n";
      return;
    }
    if (i.isUser) queryStr += `\nHuman: ${i.message}`;
    else queryStr += `\nAI: ${i.message}`;
  });
  queryStr += "\nAI:";
  // console.log(queryStr);

  return queryStr;
};

/**
 * 发送聊天文本信息给gpt
 * @param {*} chatRecords
 * @param {*} contentUpdateCb
 */
export const gptSendMessage = (chatRecords, contentUpdateCb) => {
  const { userStore } = useStore();
  const { user } = storeToRefs(userStore);
  const { setUser } = userStore;

  let retryCount = 0;
  async function send() {
    // 如果上一次的reader stream 还在 那么就cancel掉
    if (reader) await reader.cancel();

    // 生成prompt
    let content = "";

    const res = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.value.chat_key}`,
      },
      body: JSON.stringify({
        model: model, //text-davinci-003 , text-curie-001, text-babbage-001, text-ada-001
        prompt: gptJoinPrompt(chatRecords), // 请求信息
        max_tokens: 2048, // 最大数据片
        temperature: 0.9, // 分析力度
        top_p: 1,
        presence_penalty: 0.6,
        frequency_penalty: 0,
        stream: true, //流式传输
        stop: [" Human:", " AI:"],
      }),
    });

    // 请求失败
    if (res.ok === false) {
      res.json().then(res => {
        if (res.error.code === "invalid_api_key")
          showNotify({ type: "danger", message: "无效的api_key!" });
        else if (res.error.code === null) {
          if (res.error.type === "insufficient_quota") {
            if (retryCount > 3) {
              showNotify({ type: "warning", message: "api_key过期!" });
              return;
            }
            reqApiKeyArrear(user.value.id)
              .then(res => {
                if (res.status === 200) {
                  console.log(res);
                  setUser({ chat_key: res.data });
                  send();
                  retryCount++;
                } else {
                  showNotify({ type: "warning", message: "api_key过期!" });
                }
              })
              .catch(() =>
                showNotify({ type: "warning", message: "api_key过期!" })
              );
          }
        }
      });
      return;
    }

    //读取数据流
    reader = res.body.getReader();
    reader
      .read()
      .then(async function readStream({ done, value }) {
        //读取数据流
        if (done) {
          await reader.cancel();
          reader = undefined;
          return;
        }

        let str = "";
        for (let i = 0; i < value.length; i++)
          str += String.fromCharCode(value[i]);

        const arr = str.split("\n\n");
        const texts = arr
          .filter(str => str !== "" && str !== "data: [DONE]")
          .map(str => JSON.parse(str.replace("data: ", "")).choices[0].text);

        content += texts.join("");

        // 执行回掉
        contentUpdateCb && contentUpdateCb(content);

        return reader.read().then(readStream); // 继续读取
      })
      .catch(err => {
        showNotify({ type: "danger", message: "读取数据流失败！请重试" });
        return;
      });
  }
  send();
};

export const gptReqImage = prompt => {
  return axios.post(
    "https://api.openai.com/v1/images/generations",
    { prompt, response_format: "url" },
    {
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer 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",
      },
    }
  );
};
