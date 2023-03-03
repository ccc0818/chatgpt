const PORT = 3000;
const Koa = require("koa");
const { koaBody } = require("koa-body");
const app = new Koa();
const path = require("path");

// 静态资源托管
app.use(require("koa-static")(path.resolve(__dirname, "dist")));
// 跨域插件
app.use(require("@koa/cors")());
// 代理
app.use(require('./proxy'));
// body parser
app.use(koaBody());
// gpt 路由
// app.use(require("./router/gpt-router"));

app.listen(PORT, () => {
  console.log("server url: http://localhost:" + PORT);
});
