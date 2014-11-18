var mongoose = require('mongoose');
var Artist = require('../models/artist');

var db = mongoose.connection;

mongoose.connect('mongodb://localhost/prod');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){
  console.log("Connected to the database ...");
  var artist1 = new Artist({name : "GoldLink"});
  var artist2 = new Artist({name : "Kartell"});
  var artist3 = new Artist({name : "Louie Lastic"});
  var artist4 = new Artist({name : "Mad Miles"});
  var artist5 = new Artist({name : "Nas"});
  
  artist1.save(function(err){
    if (err)
      console.log("Error !");
    else{
      console.log("Artist created bitch");
    }
  });
  artist2.save(function(err){
    if (err)
      console.log("Error !");
    else{
      console.log("Artist created bitch");
    }
  });
  artist3.save(function(err){
    if (err)
      console.log("Error !");
    else{
      console.log("Artist created bitch");
    }
  });
  artist4.save(function(err){
    if (err)
      console.log("Error !");
    else{
      console.log("Artist created bitch");
    }
  });
  artist5.save(function(err){
    if (err)
      console.log("Error !");
    else{
      console.log("Artist created bitch");
    }
  });


});
