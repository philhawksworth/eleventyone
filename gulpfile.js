
var gulp  = require('gulp');
var shell = require('gulp-shell');

<<<<<<< HEAD
=======
/*
  what goes where?
*/
var buildSrc = "src";
var buildDest = "dist";



/*
 cleanup the build output
*/
gulp.task('clean-build', function () {
  return gulp.src(buildDest, {read: false})
    .pipe(clean());
});


/*
 local webserver for development
*/
gulp.task('serve', serve({
  root: [buildDest],
  port: 8008,
}));



/*
 Compile SCSS files to CSS
*/
gulp.task("scss", function () {
  gulp.src(buildSrc + "/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(gulp.dest(buildDest + "/css"))
});
>>>>>>> de43a91989c77a7f578cde7529d03d35efa62e95

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
  'build:local'
));
