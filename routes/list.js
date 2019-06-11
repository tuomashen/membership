var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var User = require('../models/dbModel');

// Require our controller.
var edit_controller = require('../controllers/editController');

router.get('/list', function(req, res, next) {
    User.find(function(err, content) {
      res.render('list', {contents: content });
  });
});

module.exports = router;