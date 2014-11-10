var express = require('express');
var router = express.Router();
var Song = require('../models/song');
var Artist = require('../models/artist');
var Annotation = require('../models/annotation');
/*
Pages
*/

router.get('/', function(req, res) {
  Song.
    find().
    populate('artist').
    populate('annotations').
    exec(function(err, songs) {
    if (err)
      res.send(err);
      else{
        res.render( 'song/songs', {songs : songs} );
      }
  });
});

router.route('/submit').
  get(function(req,res){
    res.render('song/submit');
  });

router.route('/:song_id').
  get(function(req,res){
    Song.
      findById(req.params.song_id).
      populate('artist').
      populate('annotations').
      exec(
        function(err, song){
          if (err)
            res.send(err);
          console.log(song);
          res.render('song',song);
    });
  });

/*
* API
*/

router.route('/:song_id/annotation').
  get(function(req,res){
    Annotation.where('song',req.params.song_id).find().exec(function(err,annotations){
      if (err)
        res.json(err);
      res.json(annotations);

    });
  }).
  post(function(req,res){

    var annotation  = new Annotation({
      song : req.params.song_id,
      type : req.body.type,
      description : req.body.description,
      upvotes : 10,
      start : 0,
      stop : 10
    });

    annotation.save(function(err){
      if (err)
        res.send(err);

      var song = Song.findById(req.params.song_id, function(err,song){
        if (err)
          res.send(err);
        if (song){
          song.annotations.push(annotation);
          song.save(function(err){
            if (err)
              res.send(err)
            res.json({message : "OK"});
          });
        }
      })


    });
  });


module.exports = router;
