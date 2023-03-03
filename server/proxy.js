const proxy = require("koa2-proxy-middleware");

const options = {
  targets: {
    "/gpt/(.*)": {
      target: "https://api.openai.com/",
      changeOrigin: true,
      pathRewrite: path => path.replace(/^\/gpt/, '')
    },
  },
};

module.exports = proxy(options)