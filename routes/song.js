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
    populate('producer').
    exec(function(err, songs) {
    if (err)
      res.send(err);
      else{
        res.render( 'song/songs', {songs : songs, user : req.user} );
      }
  });
});

router.route('/submit').
  get(isLoggedIn, function(req,res){
    Artist.find(function(err,artists){
      if (err){
        res.send(err);
      }
      else{
        res.render('song/submit',{artists : artists, user : req.user});
      }
    })

  }).
  post(isLoggedIn, function(req,res){
    Song.findOne({'media.url' : req.body.url}, function(err,song){
      if (err)
        res.send(err);
      if (song){ // The song already exists
        req.flash('submitMessage','The song already exists');
        res.render('song/submit',{user : req.user, message : req.flash('submitMessage')});
      } else {
        var song = new Song({
          artist : req.body.artist,

          producer : req.body.producer,

          title : req.body.title,

          album : req.body.album,

          media : { source : "youtube", url : req.body.url},

          submitter : req.user.id
        });

        song.save(function(err,song){
          if (err)
            res.send(err);
          else res.redirect('/song/'+song.id);
        })
      }
    });
  });

router.route('/:song_id').
  get(function(req,res){
    Song.
      findById(req.params.song_id).
      populate('artist').
      populate('annotations').
      populate('producer').
      populate('submitter').
      exec(
        function(err, song){
          if (err)
            res.send(err);
          console.log(song);
          res.render('song/song',{song : song, user : req.user});
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

function isLoggedIn(req,res,next){

  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
