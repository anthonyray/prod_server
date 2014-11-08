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
      res.render('artist',artists);
    });
  });


module.exports = router;
