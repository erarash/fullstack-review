const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/fetcher");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('once',() => console.log('connected to mongodb'));

let repoSchema = mongoose.Schema({
  name: String,
  description: String,
  html_url: String
});

let Repo = mongoose.model("Repo", repoSchema);

let save = ({name, description, html_url}, callback) => {
  let repo = new Repo({
    name,
    description,
    html_url
  });

  repo.save(callback)
};

let getTop25 = callback => {
  Repo.find({})
  .limit(25)
  .exec(callback);
};

module.exports.save = save;
module.exports.getTop25 = getTop25;