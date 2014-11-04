var express = require('express');
var router = express.Router();

/*
* API
*/

/*
* Pages
*/

router.get('/', function(req, res) {
  res.render('index', { title: 'Producer Gems' });
});

router.get('/about', function(req,res){
  res.render('about');
});

router.get('')
module.exports = router;
