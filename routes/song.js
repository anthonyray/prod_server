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
  post(isLoggedIn, function(req,res){ // The user wants to submit a new song
    Song.findOne({'media.url' : req.body.url}, function(err,song){ // Does the song already exist in the database ?
      if (err)
        res.send(err);
      if (song){ // The song already exists
        req.flash('submitMessage','The song already exists');
        res.render('song/submit',{user : req.user, message : req.flash('submitMessage')});
      } else { // The song doesn't exist, let's create it. 
        // First, check if the artist already exists ?
        if (req.body.artist){ // The artist was found
          var song = new Song({
            artist : req.body.artist,

            producer : req.body.artist, // TODO : fix this

            title : req.body.title,

            album : req.body.album,

            media : { source : req.body.source, url : req.body.url},

            submitter : req.user.id
          });

          song.save(function(err,song){
            if (err)
              res.send(err);
            else res.redirect('/song/'+song.id);
          })
        }
        else { // The artist must be created. 
          var artist = new Artist({
            name : req.body.artistname
          });

          artist.save(function(err,artist){
            if (err)
              res.send(err); // Let's create the song with the new artist id. 
            var song = new Song({
              artist : artist._id,
              producer : artist._id, // TODO : FIX this !
              title : req.body.title,
              album : req.body.album,
              media : { source : req.body.source, url : req.body.url},
              submitter : req.user.id
            });
          song.save(function(err,song){
            if (err)
              res.send(err);
            else res.redirect('/song/'+song.id);
          })
          });
        }
      }
    });
  });

router.route('/delete/:song_id').
  get(isLoggedIn,function(req,res){
    Song.findById(req.params.song_id).
    populate('artist').
    exec(function(err,song){
      if (err)
        res.send(err)
      res.render('song/delete', {user : req.user, song : song});
    });
  }).
  post(isLoggedIn,function(req,res){
    Song.findOneAndRemove(req.body.song_id, function(err){
      if (err){
        res.send(err);
      }
      else{
        res.redirect('/profile');
      }
      
    });
  });

router.route('/update/:song_id').
  get(isLoggedIn,function(req,res){
    Song.findById(req.params.song_id).
    populate('artist').
    populate('producer').
    exec(function(err,song){
      if (err)
        res.send(err);
      res.render('song/update', {user : req.user , song : song});
    });
  }).
  post(isLoggedIn,function(req,res){
    var update = {title: req.body.title ,
                  album : req.body.album, 
                  media : {source : req.body.url}
    };
    
    Song.findOneAndUpdate(req.body.song_id,update,function(err){
      if (err)
        res.send(err);
      res.redirect('/profile');
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
  })

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
