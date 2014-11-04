var express = require('express');
var router = express.Router();

/*
* Models
*/

var Annotation = require('../models/annotation');
var Song = require('../models/song');


/*
* Routes
*/

router.route('/annotation/:annotation_id').
  get(function(req,res){
    Annotation.findById(req.params.annotation_id, function(err,annotation){
      if(err)
        res.send(err);
      res.json(annotation);
    });
  }).
  post(function(req, res) {
    var annotation = new Annotation();

    annotation.type = req.body.type;
    annotation.description = req.body.description;

    annotation.save(function(err) {
      if (err)
        res.send(err);
        res.json({ message: 'Annotation created!' });
    });
  }).
  put(function(req,res){
    Annotation.findById(req.params.annotation_id, function(err,annotation){
      if (err)
        res.send(err);

        annotation.description = req.body.description;

        annotation.save(function(err){
          if (err) res.send(err);

          res.json({message : 'Annotation updated!'});
        });
    });
  });

router.route('/annotations').
  get(function(req,res){
    Annotation.find(function(err, annotations) {
			if (err)
				res.send(err);

			res.json(annotations);
		});
  });
module.exports = router;
