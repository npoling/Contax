var browserify = require('browserify-middleware')
var express = require('express')
var app = express()
var Path = require('path')

// Provide a browserified file at a specified path
app.get('/js/app-bundle.js',
  browserify('./client/app.js'))

// Non-js static files
var assetFolder = Path.resolve(__dirname, '../client/public')
app.use(express.static(assetFolder))


//
// The Catch-all Route
// This is for supporting browser history pushstate.
// NOTE: Make sure this route is always LAST.
//
/*app.post('/addContact', function(req, res){
  console.log(req);
  console.log(res);
})*/

//server-side routes:
app.get('/index', function(req, res){
  res.sendFile(assetFolder + '/index.html');
});

app.get('/getContacts', function(req, res){

});

app.post('/addContact', function(req, res){

});



app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/404.html' )
})


var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
