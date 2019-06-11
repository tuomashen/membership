var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');

// Require our controller.
var edit_controller = require('../controllers/editController');

router.get('/edit/:userName', edit_controller.edit);
router.get('/delete/:userName', edit_controller.remove);
router.post('/edit', edit_controller.submitChange);

module.exports = router;