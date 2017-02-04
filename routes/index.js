var express = require('express');
var router = express.Router();

var users = require('./users');
var ideal = require('./ideal')
var lookup = require('./lookup')
var callbacks = require('./callbacks');
var profile = require('./profile');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/ideal', ideal)

router.use('/lookup', lookup)

router.use('/callback', callbacks);

router.use('/users', users);

router.use('/profile',profile);

module.exports = router;
