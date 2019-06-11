var express = require('express');
var router = express.Router();
var session = require('express-session');

// Require our controller.
var login_controller = require('../controllers/loginController');

router.get('/', login_controller.form);
router.get('/logout', login_controller.logOut);

router.post('/', login_controller.checkLogin);

module.exports = router;