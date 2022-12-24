import axios from '../plugins/axios';
import appConfig from '../config';
const { serverUrl } = appConfig;

// 兑换卡密
export const activeCdkey = ({ id, code }) => {
  return axios.get(`${serverUrl}/code.php`, { params: { id, code } });
}

// 普通用户获取能否免费体验
export const getReqAviaible = (id) => {
  return axios.get(`${serverUrl}/Interface.php`, { params: { id } });
}
