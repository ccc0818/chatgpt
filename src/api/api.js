import request from "../plugins/axios";
import { getQueryObj } from '../utils/utils';
let serverUrl = '';

export function setServerUrl(url) {
  serverUrl = url;
}

// 跳转到登陆授权界面 进行登陆 
export const wxAuthorize = () => {
  const isLogin = sessionStorage.getItem("isLogin");
  if (isLogin === null) {
    const obj = getQueryObj();
    window.location.href = serverUrl + '/loginapi.php' + (obj.state ? `?state=${obj.state}` : '');
    sessionStorage.setItem("isLogin", "1");
  } else {
    sessionStorage.removeItem('isLogin');
  }
};

// 跳转支付页面 
export const wxPay = ({ id, payType, vipType }) => {
  window.location.href = `${serverUrl}/pay/api.php?id=${id}`
    + (payType ? `&pay_type=${payType}` : '')
    + (vipType ? `&vip_type=${vipType}` : '');
}

// 兑换卡密
export const activeCdkey = ({ id, code }) => {
  return request.get('/code.php', { params: { id, code } });
}

// 普通用户获取能否免费体验
export const getReqAviaible = (id) => {
  return request.get('/Interface.php', { params: { id } });
}
