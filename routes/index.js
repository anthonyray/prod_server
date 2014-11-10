var express = require('express');
var router = express.Router();
var Artist = require('../models/artist');
var Song = require('../models/song');

module.exports = function(passport){

  router.get('/', function(req, res) {
    Song.find().
      sort({upvotes : 'desc'}).
      populate('artist').
      exec(function(err,songs){
        if (err)
          res.send(err);
        res.render('index',{songs : songs,user : req.user});
      });
  });

  router.route('/login').
    get(function(req,res){
      res.render('login',{message: req.flash('loginMessage')});
    }).
    post(passport.authenticate('local-login', {
      successRedirect : '/profile',
      failureRedirect : '/login',
      failureFlash : true
    }));

  router.route('/signup').
    get(function(req,res){
      res.render('signup', {message : req.flash('signupMessage')});
    }).
    post(passport.authenticate('local-signup', {
      successRedirect : '/profile',
      failureRedirect : '/signup',
      failureFlash : true}));

  router.get('/profile', function(req,res){
    res.render('profile', {user : req.user});
  });

  router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
  });

  router.get('/about', function(req,res){
    res.render('about');
  });

  return router;
}

function isLoggedIn(req,res,next){

  if (req.isAuthenticated())
    return next();

  res.redirect();
}
