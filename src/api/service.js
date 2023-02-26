import wx from "weixin-js-sdk";
import request from "@/plugins/axios";
import { getQueryObj } from "@/utils/utils";
import useStore from "@/store";

// 请求signature appId 等签名信息
const reqSign = () => {
  const url = location.href.split("#")[0];
  return request.post(`/index/index/signature`, JSON.stringify({ url }));
};

// 初始化wx sdk api 配置
const wxInitConfig = async () => {
  const res = await reqSign();
  wx.config({
    debug: false,
    appId: res.data.appId,
    timestamp: res.data.timestamp,
    nonceStr: res.data.nonceStr,
    signature: res.data.signature,
    jsApiList: ["chooseWXPay", "hideAllNonBaseMenuItem", "hideOptionMenu"],
  });

  wx.ready(() => {
    // 隐藏非基础的wx功能按钮
    wx.hideAllNonBaseMenuItem();

    // 隐藏右上角菜单按钮
    wx.hideOptionMenu();
  });

  wx.error((err) => {
    console.log("wx error!", err);
  });
};

// 根据用户id请求用户信息
export const reqUserInfo = (id) => {
  return request.get(`/index/index/userinfo?id=${id}`);
};

// 请求微信授权
export const wxLogin = () => {
  const query = getQueryObj();

  const serverUrl = localStorage.getItem("serverUrl");

  if (query.redirect_uri === undefined) {
    location.href =
      `${serverUrl}/index/index/login` +
      (query.parent_user_id ? `?parent_user_id=${query.parent_user_id}` : "");
    return;
  } else {
    // 初始化微信配置
    wxInitConfig();
    // 初始化用户信息
    const { userStore } = useStore();
    // 加载用户信息
    userStore.getUserInfo(query.id);
    return true;
  }
};

// 请求售卖会员类型 和 加入合伙人类型 以及价格信息
export const reqPriceRate = () => {
  return request.get("/index/index/payinfo");
};

// 请求用户的推广记录
export const reqCommisionRecord = (id) => {
  return request.get(`/index/index/yjjl?id=${id}`);
};

// 请求用户的剩余体验消息条数
export const reqFreeQueryTimes = (id) => {
  return request.get(`/index/index/probation?id=${id}`);
};

// 请求兑换卡密
export const reqActiveSecret = ({ id, secret }) => {
  return request.get("/index/index/code", {
    params: { id, activation_code: secret },
  });
};

// 请求微信支付的订单sign 等信息
const reqWxInfo = ({ id, type = "vip", money = 0.01 }) => {
  return request.get("/index/index/pay", { params: { id, type, money } });
};

// 拉起微信支付
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
        },
        fail: (err) => {
          console.log(err);
          error && error(err);
        },
        cancel: () => {
        },
      });
    }
  });
};

// 上传提现二维码以及提现请求
export const upload = (fd) => {
  return request.post("/index/index/withdraw", fd);
};

// 请求提现记录
export const reqWithdrawRecords = (id) => {
  return request.get("/index/index/withdraw_records", { params: { id } });
};

// 密钥欠费
export const reqApiKeyArrear = (id) => {
  return request.get(`index/index/arrear?id=${id}`);
};
