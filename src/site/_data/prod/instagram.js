const axios  = require('axios');
const seed   = require('../../../utils/save-seed.js');

require('dotenv').config()
const { INSTAGRAM_AUTH } = process.env;
var url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${INSTAGRAM_AUTH}`;


module.exports = () => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        seed(JSON.stringify(response.data.data), `${__dirname}/../dev/instagram.json`)
        resolve(response.data.data);
      })
      .catch(err => {
        reject(err);
      });
  })
}
