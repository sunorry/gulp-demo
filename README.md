# gulp-demo

为了在使用 `koa` 不写 `require('babel-core/register');`，请使用 `node > 7.6`。

1. npm install (建议 cnpm install)
2. sudo node index
3. http://127.0.0.1/index.prod.html

## 模拟代理 JS
生成两个 html

1. index.prod.html
2. index.dev.html

访问 index.prod.html，请求带 version 的 JS，但是请求会代理到不带 version 的。