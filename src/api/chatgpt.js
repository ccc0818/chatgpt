import axios from "axios";
import { ref, computed } from "vue";
import UTF8 from "utf-8";

const api = "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";

export const gptReqImage = (prompt, key = '') => {

  return axios.post(
    "gpt/v1/images/generations",
    { prompt, response_format: "url" },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.value.chat_key}`,
        // Authorization: `Bearer ${api}`,
      },
    }
  );
};

/**
 * chatGPT model
 */
export function useChatGPT() {
  const hello = ref(
    "你好，我是人工智能ChatGPT，一个由OpenAI训练的大型语言模型。"
  );

  const systemMessage = ref({
    role: "system",
    content: "你是一个聊天助手",
  });
  const messageList = ref([]);

  const messages = computed(() => {
    return [{ role: "system", content: hello.value }, ...messageList.value];
  });

  function setSystem(content, helloStr) {
    systemMessage.value.content = content;
    hello.value = helloStr;
    clearMessage();
  }

  function pushMessage(role, content) {
    messageList.value.push({ role, content });
  }

  function updateMessage(content) {
    messageList.value[messageList.value.length - 1].content = content;
  }

  function clearMessage() {
    messageList.value.length = 0;
  }

  function say(content, key = '') {
    if (!content) {
      return;
    }

    pushMessage("user", content);

    (async function request() {
      const res = await fetch("/gpt/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", //gpt-3.5-turbo
          stream: true,
          messages: [systemMessage.value, ...messageList.value],
        }),
      });

      // const response = await res.json();
      // const { role, content } = response.choices[0].message;
      // pushMessage(role, content);

      let responseStr = "";
      const reader = res.body.getReader();
      reader.read().then(async function readStream({ done, value }) {
        // 读取数据流
        if (done) {
          return;
        }

        // const tokens = uint8Array2Str(value)
        const tokens = UTF8.getStringFromBytes(value)
          .split("\n\n")
          .filter(str => str !== "" && str !== "data: [DONE]")
          .map(str => {
            const res = JSON.parse(str.replace("data: ", ""));
            // console.log(res);
            if (res.choices[0].delta.role) {
              pushMessage(res.choices[0].delta.role, "");
            }

            let content = "";
            if (res.choices[0].delta.content) {
              content = res.choices[0].delta.content;
            }
            return content;
          });

        responseStr += tokens.join("");

        // 执行回掉
        updateMessage(responseStr);

        return reader.read().then(readStream); // 继续读取
      });
    })();
  }

  return { messages, setSystem, pushMessage, clearMessage, say };
}
