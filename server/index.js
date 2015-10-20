var browserify = require('browserify-middleware');
var express = require('express');
var app = express();
var Path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Provide a browserified file at a specified path
app.get('/js/app-bundle.js',
  browserify('./client/app.js'))

// Non-js static files
var assetFolder = Path.resolve(__dirname, '../client/public')
app.use(express.static(assetFolder))

var storage = [];

//server-side routes:
app.get('/index', function(req, res){
  res.sendFile(assetFolder + '/index.html');
});

app.get('/getContacts', function(req, res){
  console.log("received get request, sending storage object:", storage);
  res.send(storage);
});

app.post('/addContact', function(req, res){
    console.log("received contact object", req.body);
  //var contact = JSON.parse(req.body);
  storage.push(req.body);
  res.send(console.log('received data on server'))
});

app.post('/updateContacts', function(req, res){
    console.log("received contact object", req.body);

  if (req.body.length === 0) {
    storage = [];
  } else {
    storage = req.body; 
  }
});


app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/404.html' )
})


var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
