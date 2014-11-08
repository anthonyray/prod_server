var mongoose = require('mongoose');
var Artist = require('../models/artist');

var db = mongoose.connection;

mongoose.connect('mongodb://localhost/prod');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){
  console.log("Connected to the database ...");
  var artist = new Artist({name : "GoldLink"});

  artist.save(function(err){
    if (err)
      console.log("Error !");
    else{
      console.log("Artist created bitch");
    }
  });
});
