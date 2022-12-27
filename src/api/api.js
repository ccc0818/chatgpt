import request from "../plugins/axios";
// const serverUrl = localStorage.getItem('serverUrl');

let serverUrl = '';

export function setServerUrl(url) {
  serverUrl = url;
} 

// 跳转到登陆授权界面 进行登陆 
export const wxAuthorize = () => {
  const isLogin = sessionStorage.getItem("isLogin");
  if (isLogin === null) {
    window.location.href = serverUrl + '/loginapi.php';
    sessionStorage.setItem("isLogin", "1");
  } else {
    sessionStorage.removeItem('isLogin');
  }
};

// 解析用户信息
export const wxUserInfo = (cb) => {
  let query = window.location.search;
  query = query.slice(1);
  let arr = query.split('&');
  let obj = {};
  arr.forEach(i => {
    const [key, val] = i.split('=');
    if (key === 'name')
      obj[key] = decodeURI(val);
    else
      obj[key] = val;
  })
  // 更新user 状态
  cb(obj);
}

// 跳转支付页面 
export const wxPayVip = ({ id, money }) => {
  window.location.href = `${serverUrl}/pay/api.php?id=${id}&money=${money}`
}

// 兑换卡密
export const activeCdkey = ({ id, code }) => {
  return request.get('/code.php', { params: { id, code } });
}

// 普通用户获取能否免费体验
export const getReqAviaible = (id) => {
  return request.get('/Interface.php', { params: { id } });
}
