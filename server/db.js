var http = require('http');
var db = require('mongodb');
var mongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/contacts";

mongoClient.connect(url, function(err, db){
  if (err) {
    console.error;
  } else {
    db.close();
  }
});







module.exports(db);

