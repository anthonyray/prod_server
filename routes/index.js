var express = require('express');
var router = express.Router();

/*
* API
*/

/*
* Pages
*/

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('')
module.exports = router;
