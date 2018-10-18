// import { Mongoose } from 'mongoose';
// const path = require('path');
// const connection = require('../database');
//  mongoose.Promise = require('bluebird')
const express = require('express');
const bodyParser = require('body-parser');
const save = require('../database/index')
const git = require('../helpers/github.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





app.post('/repos', function (req, res) {
console.log('hi')
git.getReposByUsername(req.body.data, function(gitObj){
  
  save.save(gitObj)
})
  res.end('done');


  // console.log(req.body , 'this is req.body')

  // git.getReposByUsername('erarash', (body) => {
  //   console.log(req.body)
  //   let repo = new Repo({
  //     id: req.body.id,
  //     username: req.body.name,
  //     description: req.body.description,
  //     html_url: req.body.html_url
  //   }).save()
  //   .then(repo => {
      
  //       res.status(201).send(`${repo} saved to database`)
  //     })
  //     .catch(err => {
  //       res.status(404).send(`unable to save ${repo} to database`)

  //     })
      
  // })
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

});

app.get('/repos', function (req, res) {

  save.getRepo(function(repos){
    res.json(repos);
  })
  // console.log(req.body)
  // Repo.find({}, (err, repos) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     console.log(`here are the repos:  ${repos}`);
  //     res.status(200).send(repos)
  //   }
  // }).limit(25)
});






let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

