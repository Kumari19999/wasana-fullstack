var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Full Stack Homework 3',
    message: 'Welcome to my REST Countries App'
  });
});

module.exports = router;