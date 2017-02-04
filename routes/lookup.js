var express = require('express');
var router = express.Router();

var lookupController = require('./../controllers/lookup')

router.get('/', lookupController.renderForm);

module.exports = router;