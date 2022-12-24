import { ElMessage } from 'element-plus'
let API = '';

export const setAPI = (api) => {
  API = api
}

let reader;
export const request = async (query, contentUpdate) => {
  // 如果上一次的reader stream 还在 那么就cancel掉
  if (reader)
    await reader.cancel();

  let content = '';

  // console.log(prompt, config.API);
  fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API}`
    },
    body: JSON.stringify({
      model: "text-davinci-003", //text-davinci-003 , text-curie-001, text-babbage-001, text-ada-001
      prompt: query, // 请求信息
      max_tokens: 1024, // 最大数据片
      temperature: 0.3, // 分析力度
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
      stream: true, //流式传输
    })
  }).then(async (res) => {
    if (res.ok === false) {
      const error = await res.json().error;
      if (error.type === 'insufficient_quota') {
        ElMessage({
          showClose: true,
          message: `无效的API`,
          type: 'error',
          duration: 0,
        })
      }
      return;
    }
    reader = res.body.getReader();
    reader.read()
      .then(function readStream({ done, value }) { //读取数据流
        if (done) {
          reader.cancel();
          reader = undefined;
          return;
        }

        let str = "";
        for (let i = 0; i < value.length; i++)
          str += String.fromCharCode(value[i]);

        const arr = str.split("\n\n");
        const texts = arr.filter(str => str !== '' && str !== 'data: [DONE]')
          .map((str) => JSON.parse(str.replace('data: ', '')).choices[0].text);

        content += texts.join('');

        // 执行回掉
        contentUpdate(content);

        return reader.read().then(readStream); // 继续读取
      }).catch((err) => {
        ElMessage({
          showClose: true,
          message: `读取事件流错误!`,
          type: 'error',
          duration: 30000,
        });
        return;
      });
  }).catch(err => {
    ElMessage({
      showClose: true,
      message: `请求错误!`,
      type: 'error',
      duration: 30000,
    });
    return;
  });
}

