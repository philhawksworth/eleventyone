const gulp   = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

/*
  Uglify our javascript files into one.
*/
gulp.task('js', function() {
  return gulp.src("./src/js/**/*.js")
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./src/site/_includes/js'));
});
