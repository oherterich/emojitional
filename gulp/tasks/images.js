var gulp = require('gulp');
var refresh = require('gulp-livereload');
var lrserver = require('tiny-lr')();

gulp.task('images', function() {
  gulp.src('app/images/**/*.png')
    .pipe(gulp.dest('dist/images/'))
    .pipe(refresh(lrserver));

  gulp.src('app/images/**/*.jpg')
    .pipe(gulp.dest('dist/images/'))
    .pipe(refresh(lrserver));
});