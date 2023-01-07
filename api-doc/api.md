后端域名https://htceshi.cdyb5.com



## **微信登录接口**

后端域名/index/index/start

get方式请求 

后端域名/index/index/start?parent_user_id=上级id 没有留空

parent_user_id属性必须有



返回方式json:

```json
{"user_id":{"id":1,"openid":"omTTO6ldjFs8vm6pSY3KBkEcxYfc","nickname":"\u53e3\u7b97MD5","avatar":"https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/DYAIOgq83eqnu8x2sr7zM98VESeUcIsj4HiczaUJBfiaVr8XBcP35DaeqibooicugNx5YAMeGDNNibHl3kxORviaAIJA\/132","starttime":"2023-01-06 13:13:04","endtime":"2023-01-06 13:13:04","jointime":"2023-01-06 13:13:04","state":0,"number":-1,"chat_key":"TOOLNB_4723374915 NjYY8wSBdi4n4GtaPjtc0zZ4hhQK3PGC","parent_user_id":0,"yongjin":"0","createtime":"1672981984","updatetime":"1672998231","logintime":"1672998231","maxsuccessions":1,"successions":"1","prevtime":"1672998042","loginip":"27.226.200.200"},"yjjl":[{"id":33,"user_id":1,"parent_user_id":1,"order_no":"1672992503","money":"1","type":"\u4f1a\u5458\u8d2d\u4e70","state":1,"time":"2023-01-06 16:08:23"}]}
```



| id             | 用户id               | int        |
| -------------- | -------------------- | ---------- |
| nickname       | 用户名               | string     |
| avatar         | 头像                 | string     |
| starttime      | 会员开通日期         | string     |
| endtime        | 会员结束日期         | string     |
| state          | 会员开通状态         | int 0否1是 |
| partner        | 合伙人状态 v1 v2 v3  | string     |
| *ratio*        | 比例                 | string     |
| number         | 普通用户使用剩余次数 | int 默认5  |
| chat_key       | 会员秘钥             | string     |
| parent_user_id | 上级id               | int        |
| yongjin        | 佣金                 | string     |

##  佣金

后端域名/index/index/yjjl?id=用户id

| yjjl           | 佣金记录                            | array  |
| -------------- | ----------------------------------- | ------ |
| id             | 充值记录的id 可以不写               | int    |
| user_id        | 下级充值用户id                      | int    |
| parent_user_id | 当前用户id                          | int    |
| name           | 用户名                              | string |
| tx             | 用户头像                            | string |
| order_no       | 订单号                              | string |
| money          | 充值金额                            | string |
| type           | 购买类型                            | string |
| time           | 充值时间                            | string |
| state          | 充值状态 （已筛选只返回充值成功的） |        |

## 激活码激活

后端域名/index/index/code

get方式请求 

后端域名/index/index/code?activation_code=激活码 

activation_code属性必须有

4001状态码：激活码错误或已被使用

200  状态码         ：激活成功



## 会员价格/合伙人价格/分销比例获取

后端域名/index/index/payinfo

get/post请求方式

返回json:

```json
{"vip_one":"1","vip_two":"2","vip_three":"3","distributed_one":"1","distributed_two":"2","distributed_three":"3","v_one":"50","v_two":"58","v_three":"70"}
```



| vip_one           | 月付会员价格     | string |
| ----------------- | ---------------- | ------ |
| vip_two           | 季度会员价格     |        |
| vip_three         | 年付会员价格     |        |
| distributed_one   | v1合伙人价格     | string |
| distributed_two   | v2合伙人价格     |        |
| distributed_three | v3合伙人价格     |        |
| v_one             | v1合伙人分销比例 | string |
| v_two             | v2合伙人分销比例 |        |
| v_three           | v3合伙人分销比例 |        |

留空类型 : string



## 支付提交地址

后端域名/index/index/pay?id=会员id&type=购买类型&money=金额

| type  | vip会员购买 distributed合伙人购买 | string |
| ----- | --------------------------------- | ------ |
| money | 金额                              | string |
| id    | 付款会员id                        | int    |
|       |                                   |        |
|       |                                   |        |

返回json

```json
{"appId":"wx3537bdece6e0f34e","timeStamp":"1672991521","nonceStr":"VaT6mbd09E2HZNMN","package":"prepay_id=wx061552020430511e3ff33f3ca4a5b60000","signType":"MD5","paySign":"DA2551A23D7BF1AD32364F8185B5695F"}
```



## 试用次数处理

后端域名/index/index/probation

get/post

返回 剩余次数 int类型



## 提现 

后端域名/index/index/withdraw?money=提现金额

get

返回

状态码4001 ： 所输金额大于可提佣金

状态码200 ： 二维码上传成功

```json
{"code":"4001"}或{"code":"200"}
```









 