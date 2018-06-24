var project = require('./_project.js');
var gulp    = require('gulp');

// Uglify our javascript files into one.
// Use pump to expose errors more usefully.
gulp.task('images', function(cb) {
  return gulp.src(project.buildSrc + '/images/**/*')
    .pipe(gulp.dest(project.buildDest+ '/images'));
});

