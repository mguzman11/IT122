'use strict'
const express = require("express");
const bodyParser = require("body-parser");
const Dog = require("./models/dogs");

const app = express();

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: false
}));

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public' ));

app.use(bodyParser.urlencoded({extended: true}));


//let displayDogs = dogs.getAll();

app.get('/', (req, res, next) => {
  return Dog.find({}).lean()
      .then((dogs) => {
          res.render('home', { dogs });
      })
      .catch(err => next(err));
});

app.get('/detail', (req, res) => {
  const dogname = req.query.name;
  Dog.findOne({name: dogname}).lean()
  .then((dogs) => {
      res.render('detail', {name: dogname, info: dogs});
  });
});
app.get('/delete', (req, res) => {
  const dogname = req.query.name;
  Dog.findAndDelete({name: dogname}, (err, dog) => {
    
      if (err) {
          console.log(err);
      } else if (!dog) {
          console.log(dogname + " not found");
          res.send(`${dogname} not found`);
      } else if (dog) {
          console.log(dogname + " delete successful");
          res.send(`${dogname} delete successful`);
      }
  });
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