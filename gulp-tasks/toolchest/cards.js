var project = require('./_project.js');
var gulp    = require('gulp');
var Pageres = require('pageres');


// Generate social media assets
gulp.task("cards", function () {
  var files = glob.sync('dist/**/card.html');
  for (const file in files) {
    var p = path.dirname(files[file]);
    var name = p.replace(/\//g, '-');
    var name = name.replace("dist-","og-") + "-";
    var pageres = new Pageres({filename: name})
      .src(p+'/card.html', ['800x400'], {scale: 2})
      .dest(__dirname + "/dist/images/")
      .run()
  }
  return;
});
