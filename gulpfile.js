var gulp  = require('gulp');
var shell = require('gulp-shell');


/**
  Our gulp tasks live in their own files,
  for the sake of clarity.
 */
require('require-dir')('./gulp-tasks');


/*
 Run our static site generator to build the pages
*/
gulp.task('generate', shell.task('eleventy'));



/*
  compile the assets to the correct destination
*/
gulp.task('assets', gulp.parallel(
  'images',
  'styles',
  'scripts'
));


/*
  Let's build this sucker, without getting data from online sources
*/
gulp.task('build:local', gulp.series(
  'clean-build',
  'generate',
  'assets'
));


/*
  Let's gwt the data we need and then build this sucker.
*/
gulp.task('build', gulp.series(
  // 'get:data',
  'generate',
  'assets'
));
