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

router.get('/search/:name', function(req,res){
  var name = req.params.name
  Artist.findOne({name: new RegExp('^'+name+'$', "i")}, function(err,artist){
    if (err)
      res.send(err);
    if (artist){
      res.json({found : true, artist : artist});
    } else {
      res.json({found : false});
    }
  })
})
router.route('/:artist_id').
  get(function(req,res){
    Artist.findById(req.params.artist_id,function(err,artist){
      if (err)
        res.send(err);
      res.render('artist/artist',{artist : artist, user : req.user});
    });
  });
module.exports = router;
