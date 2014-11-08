var mongoose = require('mongoose');
var Song = require('../models/song');
var Artist = require('../models/artist');

var db = mongoose.connection;

mongoose.connect('mongodb://localhost/prod');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){
  console.log("Connected to the database ...");

  var milkbone = Artist.where({name:"Milkbone"}).findOne(function(err,artist){
    if (err)
      console.log('error');
    if(artist){
      console.log('Artist found')

      var song = new Song({artist : artist._id, title : "Keep it sage", album : "1998", upvotes : 250, media : {url:"youtube.com", source:"youtube"}});
      song.artist = artist._id;
      song.save(function(err){
        if (err)
          console.log(err);
        else{
          console.log("Song created bitch");
        }
      });
    }
  });
});
