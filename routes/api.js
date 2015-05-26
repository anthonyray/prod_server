var express = require('express');
var router = express.Router();

/*
* Models
*/

var Annotation = require('../models/annotation');
var Song = require('../models/song');
var Artist = require('../models/artist');

/*
* Routes
*/

router.route('/song').
  get(function(req,res){
    Song.find(function(err,songs){
      if (err)
        res.send(err);

      res.json(songs);
    });
  });

router.route('/song/:song_id').

  get(function(req,res){
    Song.
      findById(req.params.song_id).
      populate('artist').
      populate('producer').
      populate('submitter').
      exec(
        function(err, song){
          if (err)
            res.send(err);
          console.log(song);
          res.json(song);
    });
  }).

  post(function(req,res){
    var song = new Song();
    song.save(function(err){
      if (err)
        res.send(err)
      res.json({message : 'Song created !'});
    });
  }).

  put(function(req,res){

  });

router.route('/annotation/:song_id').

  get(function(req,res){
    Song.findById(req.params.song_id, function (err,song) {
      if (err)
        res.send(err);
      res.json(song.annotations) // TODO : POPULATE
    })
  }).

  put(function(req,res){
    Song.findById(req.params.song_id, function(err,song){
      if (err)
        res.send(err);
        var start = req.body.start;
        var stop  = req.body.stop;
        var description = req.body.description;
        var type = req.body.type;

        song.annotations.push({start : start, stop : stop, description : description, type : type});

        song.save(function(err,song){
          if (err) res.send(err);

          res.json(song); // Return the updated song with annotations
        });
    });
  });

router.route('/annotations').
  get(function(req,res){
    Annotation.find(function(err, annotations) {
			if (err)
				res.send(err);

			res.json(annotations);
		});
  });

router.route('/artist').
  get(function(req,res){
    Artist.find(function(err,artists){
      if (err)
        res.send(err);

      res.json(artists);
    });
  });

router.route('/artist/:artist_id').
  get(function(req,res){
    Artist.findById(req.params.artist_id,function(err,artist){
      if (err)
        res.send(err);

      res.json(artist);
    });
  });

module.exports = router;
