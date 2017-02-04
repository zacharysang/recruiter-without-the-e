var express = require('express');
var router = express.Router();
var multer = require('multer')

var lookupController = require('./../controllers/lookup')

router.get('/', lookupController.renderForm);

var uploading = multer({ dest: __dirname + './../public/uploads/',
limits: {fileSize: 10000000, files:1},});

router.post('/', [uploading.single('resume'), lookupController.doLookup]);

module.exports = router;