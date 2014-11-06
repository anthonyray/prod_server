var express = require('express');
var router = express.Router();
var Song = require('../models/song');
var Artist = require('../models/artist');

router.get('/', function(req, res) {
  Song.find(function(err, songs) {
    if (err)
      res.send(err);
      else{
        res.render('index', { title : 'Songs', songs : songs});
      }
  });
});

router.route('/:song_id').
  get(function(req,res){
    Song.findById(req.params.song_id, function(err, song){
      if (err)
        res.send(err);
      Artist.findById(song.artist_id, function(err,artist){
        if (err)
          res.send(err);
        song.artist = artist
        res.render('song',song);
      })
    });
  });


module.exports = router;
