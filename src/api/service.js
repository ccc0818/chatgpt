import wx from "weixin-js-sdk";
import request from '../plugins/axios';
import useUserStore from '../stores/user';
import { getQueryObj } from '../utils/utils';
import { showToast } from "vant";

export const reqUserInfo = (id) => {
  request.get(`/index/index/userinfo?id=${id}`).then(res => {
    const { user } = useUserStore();
    const userInfo = res.data.user_id;
    user.id = userInfo.id;
    user.nickname = userInfo.nickname;
    user.avatar = userInfo.avatar;
    user.vip = userInfo.state;
    user.number = userInfo.number;
    user.startTime = userInfo.starttime;
    user.endTime = userInfo.endtime;
    user.chatKey = userInfo.chat_key;
    user.parentUserId = userInfo.parent_user_id;
    user.commision = userInfo.yongjin;
    user.partner = userInfo.partner;
    user.ratio = userInfo.ratio;
    // console.log(user);
  })
}

export const wxLogin = async () => {
  const query = getQueryObj();

  if (query.redirect_uri === undefined)
    location.href = 'https://htceshi.cdyb5.com/index/index/login' + (query.parent_user_id ? `?parent_user_id=${query.parent_user_id}` : '');
  else {
    reqUserInfo(query.id);
    wxInitConfig(query.id);
  }
}

export const reqPriceRate = () => {
  return request.get('/index/index/payinfo');
}

export const reqCommisionRecord = (id) => {
  return request.get(`/index/index/yjjl?id=${id}`);
}

export const reqFreeQueryTimes = (id) => {
  return request.get(`/index/index/probation?id=${id}`);
}

export const reqActiveSecret = ({ id, secret }) => {
  return request.get('/index/index/code', { params: { id, activation_code: secret } });
}

const reqWxInfo = ({ id, type = 'vip', money = 0.01 }) => {
  return request.get('/index/index/pay', { params: { id, type, money } });
}

export function wxInitConfig(id) {
  reqWxInfo({ id }).then(res => {
    if (res.status === 200) {
      wx.config({
        debug: false,
        appId: res.data.appId,
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.paySign,
        jsApiList: ["chooseWXPay", "hideAllNonBaseMenuItem"]
      });

      wx.ready(() => {
        console.log('wx ready.');
        // wx.hideAllNonBaseMenuItem();
      })

      wx.error((err) => {
        console.log('wx error!', err);
      })
    }
  })
}

export const reqPay = ({ id, type, money }, success, error) => {
  reqWxInfo({ id, type, money }).then((res) => {
    if (res.status === 200) {
      // 调用wx支付
      wx.chooseWXPay({
        timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
        package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: res.data.paySign, // 支付签名
        success: (res) => {
          console.log(res);
          success && success(res);
          showToast({
            type: 'success',
            message: '支付成功',
            duration: 2000
          })
        },
        fail: (err) => {
          console.log(err);
          error && error(err);
          showToast({
            type: 'fail',
            message: '支付失败',
            duration: 2000
          })
        },
        cancel: () => {
          showToast({
            type: 'fail',
            message: '支付取消',
            duration: 2000
          })  
        }
      });
    }
  })
}

export const upload = (fd) => {
  return request.post('/index/index/withdraw', fd);
}
