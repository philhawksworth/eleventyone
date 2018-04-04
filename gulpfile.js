var gulp        = require("gulp");
var sass        = require("gulp-sass");
var serve       = require('gulp-serve');
var shell       = require('gulp-shell');
var clean       = require('gulp-clean');
var runSequence = require('run-sequence');


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



/*
 Run our static site generator to build the pages
*/
gulp.task('generate', shell.task('eleventy --config=eleventy.js'));




/*
  Watch src folder for changes
*/
gulp.task("watch", function () {
  gulp.watch(buildSrc + "/**/*", ["build"])
});



/*
  Let's build this sucker.
*/
gulp.task('build', function(callback) {
  runSequence(
    ['clean-build'],
    ['generate', 'scss'],
    callback
  );
});
