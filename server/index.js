const express = require('express');
const bodyParser = require('body-parser');
const githubHelper = require('../helpers/github')
const db = require('../database/index')
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/repos', function (req, res) {
  let username = req.body.query;
  githubHelper.getReposByUsername(username, (err, { body }) => {
    if (err) {
      console.error(err)
      res.status(404).send('error')
    } else {
      body = JSON.parse(body);
      for (let i = 0; i < body.length; i++) {
        let { name, description, html_url } = body[i];
        let template = {
          name,
          description,
          html_url
        };
        db.save(template, (err, savedData) => {
          if (err) {
            console.error(err)
            res.sataus(400).send('error')
          } else {
            if (i === body.length - 1) {
              res.status(201).send('success')
            }
          }
        })
      }
    }
  })
});

app.get('/repos', function (req, res) {
  db.getTop25((err, result) => {
    if (err) return res.status(400).send('error')
    res.status(200).send('success')
  })
});


let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

