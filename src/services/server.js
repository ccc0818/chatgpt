export async function checkSecretKey(key) {
  if (key === undefined) {
    // 从缓存中获取密钥
    key = localStorage.getItem("secretKey");
    if (key === null) {
      return -1;
    }
  }

  const res = await fetch("http://x.qddfsxh.cn/login.php", {
    method: "POST",
    body: JSON.stringify({ secret: key }),
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });

  if ((await res.json()).code === 200) {
    // 校验成功保存密钥
    localStorage.setItem("secretKey", key);
    return 1;
  }

  return 0;
}
