import { showNotify } from 'vant';

let reader;
export const request = async (query, key, contentUpdate) => {
  // 如果上一次的reader stream 还在 那么就cancel掉
  if (reader)
    await reader.cancel();

  let content = '';

  const res = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      model: "text-davinci-003", //text-davinci-003 , text-curie-001, text-babbage-001, text-ada-001
      prompt: query, // 请求信息
      max_tokens: 2048, // 最大数据片
      temperature: 0.9, // 分析力度
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
      stream: true, //流式传输
    })
  });
  // key 失效
  if (res.ok === false) {
    res.json().then(res => {
      if (res.error.type === 'insufficient_quota') {
        showNotify({ type: 'warning', message: '用户openAI密钥过期' });
      }
    })
    return;
  }

  //读取数据流
  reader = res.body.getReader();
  reader.read().then(async function readStream({ done, value }) { //读取数据流
    if (done) {
      await reader.cancel();
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
  }).catch(err => {
    console.log('读取流失败!', err);
    return;
  });
}

