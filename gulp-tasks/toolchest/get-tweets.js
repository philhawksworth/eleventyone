var project = require('./_project.js');
var gulp    = require('gulp');
var Twitter = require('twitter');

// load environment variables
require('dotenv').config()

// Get the latest few tweets to include in some pages
gulp.task('get:tweets', function() {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: '',
    access_token_secret: ''
  });
  var params = {screen_name: 'philhawksworth', count: 50, exclude_replies: true};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      // Build an object in a useful structure for us
      var recentTweets = {"recent" : []};
      for(const tweet in tweets) {
        var t = {
          text: tweets[tweet].text,
          url: "https://twitter.com/philhawksworth/status/" + tweets[tweet].id_str,
          date:  tweets[tweet].created_at,
        };
        recentTweets.recent.push(t);
      }
      // save our data to file for the the SSG to use later
      project.storeData(project.buildSrc + '/site/_data/tweets.json', JSON.stringify(recentTweets));
    }
    else {
      console.log(error);
    }
  });
});
