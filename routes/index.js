var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//authentication middleware

function isAuthenticated(req, res, next) {
  if(req.user) {
    return next();
  } else {
    res.render('index', {message: "You must be logged in to view your ToDo list"});
  }
}


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { user: req.user, message: req.flash() });
});

router.get('/register', function(req, res) {
  if(!user) {
    return res.back();
  } else {
    res.render('register', { })
  }
});

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if(err) {
      return res.render('register', {user: user});
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login');
})

router.post('/login', passport.authenticate(
  'local',
  { successRedirect: '/todo', failureRedirect: '/', failureFlash: true}),
  function(req, res) {

})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// router.get('/todo', isAuthenticated, function(req, res) {
//     console.log(req.user)
//   res.render('todo', {user: req.user})
// });

router.get('/about', function(req, res) {
  res.render('about', {user: req.user})
});

module.exports = router;
