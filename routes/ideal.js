var express = require('express');
var router = express.Router();

var idealController = require('./../controllers/ideal')

router.get('/', idealController.renderForm);

module.exports = router;