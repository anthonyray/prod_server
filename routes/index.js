var express = require('express');
var router = express.Router();
var Artist = require('../models/artist');
var Song = require('../models/song');



router.get('/', function(req, res) {
  Song.find().
    sort({upvotes : 'desc'}).
    populate('artist').
    exec(function(err,songs){
      if (err)
        res.send(err);
      res.render('index',{songs : songs});
    });
});

router.get('/about', function(req,res){
  res.render('about');
});



router.get('')
module.exports = router;
