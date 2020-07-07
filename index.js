const http = require("http"); 
const dogs = require ("./data");

let displayDogs = dogs.getAll();

http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Home page\n' + 'Array length: '+ displayDogs.length);
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page\n Welcome to Melissa\'s first NodeJS application! This is my last quarter at SCC and am pleased to be in this class. ');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);