import Koa from 'koa';
import path from 'path';
//静态资源中间件
import resource from 'koa-static';
import etag from 'koa-etag';
import conditional from 'koa-conditional-get';
const app = new Koa();
const host = 'localhost';
const port = 4253;

// 开启服务器304状态码
app.use(conditional());

// 开启etag验证
app.use(etag());

// 开启服务器响应头强缓存
app.use(async (ctx, next) => {
  ctx.set({
    'Cache-Control': 'max-age=30', // 强缓存30s
    // 'Cache-Control': 'no-store', // 不使用缓存，该字段下连memory-cache都不走
    // 'Cache-Control': 'no-cache', // 协商缓存还是会走的
    // 'Cache-Control': 'max-age=30,no-store' // 可以看到，最后面的no-store生效了，完全不走缓存
  });
  await next();
})

app.use(resource(path.join(__dirname, './static')));

app.listen(port, () => {
  console.log(`server is listen in ${host}:${port}`);
});