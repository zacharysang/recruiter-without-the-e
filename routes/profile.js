var express = require('express');
var router = express.Router();

var profileController = require('./../controllers/profile')

router.get('/', profileController.renderForm);

module.exports = router;