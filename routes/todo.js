var express = require('express');
var router = express.Router();
var Item = require('../models/item.js');

//authentication middleware

function isAuthenticated(req, res, next) {
  if(req.user) {
    return next();
  } else {
    res.render('index', {message: "You must be logged in to view your ToDo list"});
  }
}

router.get('/', isAuthenticated, function(req, res) {
  console.log(req.user)
  res.render('todo', {user: req.user})
});

router.post('/', function(req, res) {
  new Item({
    userId: req.body.userId,
    item: req.body.item
  }).save(function(err, item) {
    if (err) {
      console.log(err)
    } else {
      res.json(item);
    }
  });
});

router.get('/:id', function(req, res) {
  var query = Item.find({});
  query.where('userId', req.params.id);
  query.exec(function(err, items) {
    res.json(items);
  });
});


module.exports = router;
