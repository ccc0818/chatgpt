import axios from "axios";

const request = axios.create();

request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status !== 200) {
      console.log("请求失败", response.status);
    } 
    // console.log(response)
    return response;
  }
);

export default request;
