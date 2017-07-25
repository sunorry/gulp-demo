const gulp = require('gulp')
const gulpWebpack = require('webpack-stream')
var webpack = require('webpack')
var gulpSequence = require('gulp-sequence')


gulp.task('build-js', () => {
  // return gulp.src('src/js/**/*.js')
  //   .pipe(gulp.dest('build/dist'))

  return gulpWebpack(require('./webpack.config.js'), webpack)
    .pipe(gulp.dest('dist/'));
})

// gulp.task('build-html', () => {
//     return gulp.src('html/**/*.html')
//         .pipe(gulp.dest('dist/html/'))
// })

gulp.task('default',gulpSequence(
    'build-js', 'watch'
))


gulp.task('watch', () => {
    gulp.watch('src/js/**/*.js', ['build-js']);
});
