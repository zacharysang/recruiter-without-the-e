var express = require('express');
var router = express.Router();

var callbacksController = require('./../controllers/callbacks')

/*GET github callback */
router.get('/github', callbacksController.githubCallback);
//route.get('/linkedin', callbacksController.linkedinCallback);

module.exports = router;