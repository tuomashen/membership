var model = require('../models/editModel');
var db_model = require('../models/dbModel');
var session = require('express-session');
var User = require('../models/dbModel');
var bodyParser = require('body-parser');
var xssFilters = require('xss-filters');

exports.show = function(req, res, next) {
	res.render('pay');
}

//Commit changes to database
exports.submitPayment = function(req, res, next) {
	User.findOne({userName: req.session.uname}, function(err, user) {
		user.paid = true;

		user.save();

		res.render('main',
			{
				uname: xssFilters.inHTMLData(user.userName), 
				fname: xssFilters.inHTMLData(user.firstName), 
				lname: xssFilters.inHTMLData(user.lastName),
				role: user.role,
				isPaid: user.paid
			});
	});
}