var express = require('express');
var router = express.Router();
var session = require('express-session');

// Require our controller.
var db_model = require('../models/dbModel');
var register_controller = require('../controllers/registerController');

router.get('/register', register_controller.registerNew);
router.post('/register', register_controller.registerAccount);

module.exports = router;