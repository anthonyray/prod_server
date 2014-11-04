var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Songs' });
});

router.route('/:song_id').
  get(function(req,res){
    res.send({message : req.params.song_id});
  });


module.exports = router;
