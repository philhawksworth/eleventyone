var path = require('path');
var fs = require('fs');


// Ensure that the path to a file exists when saving
function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}


/*
 Many of our scripts will need these
*/
module.exports = {

  // Some default locations
  buildSrc: "src",
  buildDest: "dist",

  // Save some data to a local file for use in the build
  storeData: function(fileName, data){
    ensureDirectoryExistence(process.cwd() + fileName)
    fs.writeFile(`${process.cwd()}/${fileName}`, data, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log(`Saved: ${process.cwd()}/${fileName}`);
      }
    });
  },

};

