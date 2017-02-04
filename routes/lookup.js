var express = require('express');
var router = express.Router();

var lookupController = require('./../controllers/lookup')

router.get('/', lookupController.renderForm);

router.post('/', lookupController.doLookup);

module.exports = router;