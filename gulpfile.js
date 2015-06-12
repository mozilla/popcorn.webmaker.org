var gulp = require('gulp'),
    less = require('gulp-less'),
    clean = require('gulp-rimraf'),
    rename = require ('gulp-rename');

gulp.task('less-templates', function () {
  return gulp.src('cornpop/templates/basic/style.less')
  .pipe(less())
    .pipe(gulp.dest('cornpop/templates/basic/'));
});

gulp.task('less-src', function () {
  return gulp.src('cornpop/css/butter.ui.less')
    .pipe(less())
    .pipe(rename(function (path) {
      path.extname = '.less.css';
    }))
    .pipe(gulp.dest('cornpop/css'));
});

gulp.task('less', ['less-templates', 'less-src'], function () {});

gulp.task('clean', function () {
  return gulp.src([
    'cornpop/css/butter.ui.less.css',
    'cornpop/templates/basic/*.css'
  ])
    .pipe(clean());
});

gulp.task('watch', ['clean'], function () {
  gulp.watch('cornpop/templates/basic/*.less', ['less-templates']);
  gulp.watch('cornpop/css/*.less', ['less-src']);
})

gulp.task('default', ['clean', 'less', 'watch'], function () {});
