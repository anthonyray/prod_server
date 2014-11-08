var mongoose = require('mongoose');
var Artist = require('../models/artist');
var Song = require('../models/song');

var db = mongoose.connection;

mongoose.connect('mongodb://localhost/prod');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){

  Artist.findById("545b82127c2e7f9004c03eb8",function(err,artist){
    if (err)
      console.exit();
    else{
      console.log(artist);

      var song = new Song({artist_id : artist._id, producer_id : artist._id, title : "Keep it safe", album : "1998", upvotes : 320, media :{ source : "youtube", url :"http://www.youtube.com/v?/oijez"}});
      song.save(function(err){
        if (err)
          console.log("Error !");

        else {
          console.log("Song created bitch");
        }
      });
    }

  });
});
