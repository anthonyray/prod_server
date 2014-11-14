var express = require('express');
var router = express.Router();

/*
* Models
*/

var Artist = require('../models/artist');

/*
* Routes
*/

router.route('/').
  get(function(req,res){
    Artist.find(function(err,artists){
      if (err)
        res.send(err);
      res.render('artist/artists',{artists : artists, user : req.user});
    });
  });

router.route('/:artist_id').
  get(function(req,res){
    Artist.findById(req.params.artist_id,function(err,artist){
      if (err)
        res.send(err);
      res.render('artist/artist',{artist : artist, user : req.user});
    });
  });
module.exports = router;
