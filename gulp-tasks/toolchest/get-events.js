var project = require('./_project.js');
var gulp    = require('gulp');
const axios = require('axios');


/*
  Get presentation details from Notist
*/
gulp.task('get:events', function () {

  axios.get('https://noti.st/philhawksworth.json')
    .then(function (response) {
      var events = response.data.data[0].relationships.data;
      var eventURLs = [];
      events.forEach(element => {
        eventURLs.push(element.links.event);
      });

      // Fetch all of the presentation data
      axios.all(eventURLs.map(l => axios.get(l)))
        .then(axios.spread(function (...res) {

          // gather the data about for each presentation and
          // collect them in future and past arrays
          var talks = {
            future : [],
            past : []
          };
          var now = new Date();
          for (var talk in res) {
            var thisTalk = res[talk].data.data[0].attributes;
            var when = new Date(thisTalk.ends_on);
            var future = now - when < 0 ? true : false;
            if(future) {
              talks.future.push(thisTalk);
            } else {
              talks.past.push(thisTalk);
            }
          }
          // stash the data for the SSG to use
          project.storeData(project.buildSrc + "/site/_data/events.json", JSON.stringify(talks));
        })
      );
    })
    .catch(function (error) {
      console.log(error);
    });

});
