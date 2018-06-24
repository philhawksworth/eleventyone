var project = require('./_project.js');
var gulp    = require('gulp');
var clean   = require('gulp-clean');

// cleanup the build output
gulp.task('clean-build', function () {
  return gulp.src(project.buildDest, {read: false})
    .pipe(clean());
});
