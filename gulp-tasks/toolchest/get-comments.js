var project  = require('./_project.js');
var gulp     = require('gulp');
var axios    = require('axios');
var gravatar = require('gravatar');

// load environment variables
require('dotenv').config()

// Collect and stash comments for the build
gulp.task("get:comments", function(done) {

  // get all submissions from from approved comment form
  var oauth_token = process.env.NETLIFY_TOKEN;
  var formID = "5a6df445ae52900fdc164e26";
  var url = `https://api.netlify.com/api/v1/forms/${formID}/submissions/?access_token=${oauth_token}`;

  axios.get(url)
    .then(function (response) {
        var body = response.data;
        var comments = {};
        for(var item in body){
          var data = body[item].data;
          var comment = {
            name: data.name,
            avatar: gravatar.url(data.email, {s: '100', r: 'x', d: 'retro'}, true),
            comment: data.comment,
            date: body[item].created_at
          };
          // Add it to an existing array or create a new one
          if(comments[data.path]){
            comments[data.path].push(comment);
          } else {
            comments[data.path] = [comment];
          }
        }
        // save our data to file for the the SSG to use later
        project.storeData(project.buildSrc + '/site/_data/comments.json', JSON.stringify(comments));
        done();
    })
    .catch(function (error) {
      console.log(error);
    });
});
