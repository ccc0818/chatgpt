export function checkSecretKey(key) {
  if (key === undefined) {
    // 从缓存中获取密钥
    key = localStorage.getItem("secretKey");
    if (key === null) {
      return -1;
    }
  }

  // fetch().then()
  if (key === "admin") {

    // 校验成功保存密钥
    localStorage.setItem("secretKey", key);
    return 1;
  }
  return 0;
}
