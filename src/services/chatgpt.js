import { showMessage } from "@/utils";

let reader;

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
export const gptSendMessage = async (chatRecords, callBack) => {
  const secretKey = localStorage.getItem("secret");

  if (!secretKey) {
    showMessage({
      type: "error",
      message: "你目前没有密钥, 请先去保存你的密钥!",
      duration: 3000,
    });
    return;
  }

  // 如果上一次的reader stream 还在 那么就cancel掉
  if (reader) {
    await reader.cancel();
  }

  let res;
  try {
    res = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003", //text-davinci-003 , text-curie-001, text-babbage-001, text-ada-001
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
  } catch {}

  // 请求失败
  if (res.ok === false) {
    const data = await res.json();
    if (data.error.code === "invalid_api_key") {
      showMessage({ type: "error", message: "无效的api_key!" });
    } else if (data.error.code === null) {
      if (res.error.type === "insufficient_quota") {
        showMessage({ type: "warning", message: "api_key过期!" });
      }
    }
    return;
  }

  //读取数据流
  let response = "";
  reader = res.body.getReader();
  reader
    .read()
    .then(function parseRawData({ done, value }) {
      //读取数据流
      if (done) {
        reader = null;
        return;
      }

      let rawData = "";
      rawData += String.fromCharCode(...value);

      response += rawData
        .split("\n\n")
        .filter(v => v !== "" && v !== "data: [DONE]")
        .map(v => JSON.parse(v.replace("data: ", "")).choices[0].text)
        .join("");

      // 执行回掉
      callBack(response);

      return reader.read().then(parseRawData); // 继续读取
    })
    .catch(e => {
      console.log(e);
    });
};
