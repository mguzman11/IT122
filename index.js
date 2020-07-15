'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const dogs = require ("./data");

const app = express();

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: false
}));

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public' ));

app.use(bodyParser.urlencoded({extended: true}));


let displayDogs = dogs.getAll();

app.get('/', (req, res) => {
  res.type('text/html');
  res.render('home', {dogs: displayDogs});
});

app.get('/detail', (req, res) => {
  const dogname = req.query.name
  res.render('detail', {dogs: dogname, info: dogs.getDetail(dogname)});
});

app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('About page\n Welcome to Melissa\'s first NodeJS application! This is my last quarter at SCC and am pleased to be in this class. ');
});
app.use( (req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});