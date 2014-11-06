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
    Song.findById(req.params.song_id, function(err, song){
      if (err)
        res.send(err);
      res.json(song);
    })
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

router.route('/annotation/:annotation_id').

  get(function(req,res){
    Annotation.findById(req.params.annotation_id, function(err,annotation){
      if(err)
        res.send(err);
      res.json(annotation);
    });
  }).

  post(function(req, res) {
    var annotation = new Annotation();

    annotation.type = req.body.type;
    annotation.description = req.body.description;

    annotation.save(function(err) {
      if (err)
        res.send(err);
        res.json({ message: 'Annotation created!' });
    });
  }).

  put(function(req,res){
    Annotation.findById(req.params.annotation_id, function(err,annotation){
      if (err)
        res.send(err);

        annotation.description = req.body.description;

        annotation.save(function(err){
          if (err) res.send(err);

          res.json({message : 'Annotation updated!'});
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
