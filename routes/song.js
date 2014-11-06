var express = require('express');
var router = express.Router();
var Song = require('../models/song');

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
      res.render('song', song);
    });
  });


module.exports = router;
