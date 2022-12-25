import request from "../plugins/axios";
// const serverUrl = localStorage.getItem('serverUrl');

let serverUrl = '';

export function setServerUrl(url) {
  serverUrl = url;
} 

// 跳转到登陆授权界面 进行登陆 
export const wxAuthorize = (cb) => {
  let query = window.location.href.split('?')[1];
  if (query === undefined)
    window.location.href = serverUrl + '/loginapi.php';
  else {
    // 提取用户信息
    /* 
      name=CC&img=https://thirdwx.qlogo.cn/mmopen/vi_32/K8Xo1DPvO6iakMdo2urSWu481kWp0mdQRBVDLHBJA6L5T8xYBcrgRlfrLVkxPZPwZQFicRXjTaSrjR0mVIwbHneQ/132&state=0&id=1#/ 
    */
    
    let arr = query.split('#')[0].split('&');
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
};

// 跳转支付页面 
export const wxPayVip = ({ id, openid, money }) => {
  window.location.href = `${serverUrl}/pay/api.php?id=${id}&openid=${openid}&money=${money}`
}

// 兑换卡密
export const activeCdkey = ({ id, code }) => {
  return request.get('/code.php', { params: { id, code } });
}

// 普通用户获取能否免费体验
export const getReqAviaible = (id) => {
  return request.get('/Interface.php', { params: { id } });
}
