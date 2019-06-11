var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var pay_controller = require('../controllers/payController');

router.get('/pay', pay_controller.show);
router.post('/pay', pay_controller.submitPayment);

module.exports = router;