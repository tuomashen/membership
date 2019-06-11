var express = require('express');
var router = express.Router();

// Require our controller.
var item_controller = require('../controllers/itemController');

// GET item list
router.get('/', item_controller.list);

module.exports = router;
