const gulp = require('gulp')
const gulpWebpack = require('webpack-stream')
var webpack = require('webpack')
var gulpSequence = require('gulp-sequence')
var clean = require('gulp-clean');
gulp.task('prod-js', () => {
  // return gulp.src('src/js/**/*.js')
  //   .pipe(gulp.dest('build/dist'))

  return gulpWebpack(require('./webpack.config.prod.js'), webpack)
    .pipe(gulp.dest('dist/'));
})

gulp.task('build-js', () => {
  // return gulp.src('src/js/**/*.js')
  //   .pipe(gulp.dest('build/dist'))

  return gulpWebpack(require('./webpack.config.dev.js'), webpack)
    .on('error', onError)
    .pipe(gulp.dest('dist/'));
})

gulp.task('clean', () => {
    return gulp.src('dist/', {read: false})
        .pipe(clean())
})
// gulp.task('build-html', () => {
//     return gulp.src('html/**/*.html')
//         .pipe(gulp.dest('dist/html/'))
// })

gulp.task('default',gulpSequence(
   'clean', 'build-js', 'watch'
))

gulp.task('prod', ['prod-js'])


gulp.task('watch', () => {
    gulp.watch('src/js/**/*.js', ['build-js']);
});


function onError(err) {
  console.log(err);
  this.emit('end');
}