var gulp = require('gulp'),
    less = require('gulp-less'),
    clean = require('gulp-rimraf'),
    rename = require ('gulp-rename');

gulp.task('less-templates', function () {
  return gulp.src('PopcornEditor/templates/basic/style.less')
  .pipe(less())
    .pipe(gulp.dest('PopcornEditor/templates/basic/'));
});

gulp.task('less-src', function () {
  return gulp.src('PopcornEditor/css/butter.ui.less')
    .pipe(less())
    .pipe(rename(function (path) {
      path.extname = '.less.css';
    }))
    .pipe(gulp.dest('PopcornEditor/css'));
});

gulp.task('less', ['less-templates', 'less-src'], function () {});

gulp.task('clean', function () {
  return gulp.src([
    'PopcornEditor/css/butter.ui.less.css',
    'PopcornEditor/templates/basic/*.css'
  ])
    .pipe(clean());
});

gulp.task('watch', ['clean'], function () {
  gulp.watch('PopcornEditor/templates/basic/*.less', ['less-templates']);
  gulp.watch('PopcornEditor/css/*.less', ['less-src']);
})

gulp.task('default', ['clean', 'less', 'watch']);

gulp.task('build', ['clean', 'less']);
