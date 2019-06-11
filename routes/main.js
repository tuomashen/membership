var express = require('express');
var router = express.Router();
var session = require('express-session');

// Require our controller.
var main_controller = require('../controllers/mainController');

router.get('main', main_controller.mainPage);

module.exports = router;