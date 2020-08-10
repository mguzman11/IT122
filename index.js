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
 // set Access-Control-Allow-Origin header for api route
app.use(bodyParser.json());

app.use('/api', require('cors')());

//let displayDogs = dogs.getAll();

app.get('/api/dogs', (req, res) => {
  return Dog.find({}).lean()
    .then((dogs) => {
        // res.json sets appropriate status code and response header
        res.json(dogs);
    })
    .catch(err => {return res.status(500).send('Error occurred: database error.')})

  });

  app.get('/api/dogs/:name', (req, res) => {
    const dogname = req.params.name; 
    Dog.findOne({name: dogname})
    .then((dog) => {
        if (dog === null) {
            return res.status(400).send(`Error: "${dogname}" not found`)
        } else {
        res.json(dog)
        }
    })
    .catch(err => {
        res.status(500).send('Error occurred: dabatase error', err)
    })
});

app.delete('/api/dogs/:name', (req, res) => {
  const dogname = req.params.name; 
  Dog.findOneAndDelete({name: dogname})
  .then(dog => {
      if(dog === null) {
          return res.status(400).send(`Error: "${dogname}" not found`)   
      } else {
          res.json(dog)}
  })

  .catch(err => {
      res.status(500).send('Error occurred: dabatase error', err)
  })
});

app.post('/api/dogs/:name', (req, res) => {
  const dogname = req.params.name;
  Dog.findOneAndUpdate({name: dogname}, req.body, {upsert: true, new: true})
  .then(dog => {
      res.json(dog)
  })
  .catch(err => {
      res.status(500).send('Error occurred: dabatase error', err)
  })
})

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