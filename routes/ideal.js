var express = require('express');
var router = express.Router();

var idealController = require('./../controllers/ideal')

router.get('/', idealController.renderForm);

router.post('/', idealController.postIdeal);

module.exports = router;