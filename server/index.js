var browserify = require('browserify-middleware');
var express = require('express');
var app = express();
var Path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//var db = require('db');

// Provide a browserified file at a specified path
app.get('/js/app-bundle.js',
  browserify('./client/app.js'))

// Non-js static files
var assetFolder = Path.resolve(__dirname, '../client/public')
app.use(express.static(assetFolder))

//temporary local storage object; replace with DB later;
var storage = [];

//server-side routes:
app.get('/index', function(req, res){
  res.sendFile(assetFolder + '/index.html');
});

app.get('/getContacts', function(req, res){
  console.log("received get request, sending storage object:", storage);
  res.send(storage);
  //call database model method
});

app.post('/addContact', function(req, res){
  storage.push(req.body);
  res.send(console.log('201: Added contact'))
});

app.post('/updateContacts', function(req, res){
  console.log("server received updated contacts", req.body);
    storage = req.body; 
});


app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/404.html' )
})


var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
