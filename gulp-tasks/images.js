var project     = require('./_project.js');
var os          = require("os");
var gulp        = require('gulp');
var parallel    = require("concurrent-transform");
var rename      = require("gulp-rename");
var imageResize = require('gulp-image-resize');



// create a set of resize tasks at defined image widths
var resizeImageTasks = [];
[400,1000].forEach(function(size) {
  var resizeImageTask = 'resize_' + size;
  gulp.task(resizeImageTask, function(done) {
    gulp.src(project.buildSrc + '/images/*')
    .pipe(parallel(
      imageResize({ width : size }),
      os.cpus().length
    ))
    .pipe(rename(function (path) { path.basename += "-" + size; }))
    .pipe(gulp.dest(project.buildDest+ '/images'));
    done();
  });
  resizeImageTasks.push(resizeImageTask);
});



// Copy our core images to the dist folder, and resize all preview images
gulp.task('images', gulp.parallel(resizeImageTasks, function copyOriginalImages(done) {
  gulp.src(project.buildSrc + '/images/*')
    .pipe(gulp.dest(project.buildDest+ '/images'))
    done();
}));

