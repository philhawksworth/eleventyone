const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const postcss = require('postcss');

const asyncReadFile = promisify(fs.readFile);

// the file name as an entry point for postcss compilation
// also used to define the output filename in our output /css folder.
const fileName = "styles.css";

module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `../_includes/postcss/${fileName}`);
    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss: await asyncReadFile(rawFilepath)
    };
  };

  async render ({ rawCss, rawFilepath }) {
    return await postcss([
      // require('postcss-comment'),
      require('precss'),
      require('postcss-import'),
      require('postcss-mixins'),
      require('postcss-color-mix'),
      require('cssnano')
    ])
    .process(rawCss, { from: rawFilepath })
    .then(result => result.css);
  };
}
