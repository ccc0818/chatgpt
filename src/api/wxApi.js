import appConfig from '../config';
const { serverUrl } = appConfig;

// 跳转到登陆授权界面 进行登陆 
export const wxAuthorize = (cb) => {
  let query = window.location.href.split('?')[1];
  if (query === undefined)
    window.location.href = serverUrl + '/loginapi.php';
  else {
    // 提取用户信息
    // console.log(query);
    /* 
      name=CC&img=https://thirdwx.qlogo.cn/mmopen/vi_32/K8Xo1DPvO6iakMdo2urSWu481kWp0mdQRBVDLHBJA6L5T8xYBcrgRlfrLVkxPZPwZQFicRXjTaSrjR0mVIwbHneQ/132&state=0&id=1#/ 
    */
    
    let arr = query.split('#')[0].split('&');
    console.log(arr);
    let obj = {};
    arr.forEach(i => {
      const [key, val] = i.split('=');
      if (key === 'name')
        obj[key] = decodeURI(val);
      else
        obj[key] = val;
    })
    // if (!obj.openid) {
    //   window.location.href = serverUrl + '/loginapi.php';
    // }
    // 更新user 状态
    cb(obj);
  }
};

// 跳转支付页面 
export const wxPayVip = ({ id, openid, money }) => {
  window.location.href = `${serverUrl}/pay/api.php?id=${id}&openid=${openid}&money=${money}`
}

