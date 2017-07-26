const fs = require('fs')
const http = require('http');
const Koa = require('koa');
const app = new Koa();
const common = require('koa-common');
const gulp = require('gulp')
require('./gulpfile');
process.nextTick(() => {
    gulp.start('prod')
    gulp.start('default')
})

app.use(async function(ctx, next) {
    if(ctx.url.startsWith('/js/')) {
        const url = ctx.url.replace(/@.*\./, '.')
        ctx.url = url
    }
    await next()
});

app.use(common.static(__dirname + '/dist'))
app.listen(80);