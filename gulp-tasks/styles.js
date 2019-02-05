var gulp    = require('gulp');
var sass    = require("gulp-sass");

/*
  generate the css with sass
*/
gulp.task('css', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('./src/site/_includes/css'));
});
