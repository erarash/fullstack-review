const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  description: String,
  html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, "connection error"));
connection.once('open', () => console.log('connected to mongodb'));




let save = (gitObj) => {
let reposArr = [];
let parsedRepos = JSON.parse(gitObj.body)
  
for (let i=0; i<parsedRepos.length; i++){
  let repoObj = {};

  repoObj.id = parsedRepos[i].id,
  repoObj.name = parsedRepos[i].name,
  repoObj.description = parsedRepos[i].description,
  repoObj.html_url = parsedRepos[i].html_url

  let repo = new Repo(repoObj)

  repo.save((err) => {
    if (err){
      console.log(err)
    } else {
      console.log('saved')
    }
  })

  reposArr.push(repoObj)

}
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}


let getRepo = function(callback){
  Repo.find(function(err, repos){
    if (err){
      console.log(err)
    } else {
      callback(repos)
    }
  }).limit(25)
}










module.exports.getRepo = getRepo;
module.exports.save = save;
module.exports.Repo =  Repo;
module.exports.connection = connection;

