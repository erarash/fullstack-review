const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/username/${username}/repos`,
    headers: {
      'User-Agent': 'GET',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request.get(options, (err,gitObj) => {
    if (err){
      console.log(err, null)
    } else { console.log(null, gitObj.body)
      callback(gitObj)
    }
  })
}

module.exports.getReposByUsername = getReposByUsername;

 // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL