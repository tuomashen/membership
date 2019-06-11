var model = require('../models/loginModel');
var session = require('express-session');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var User = require('../models/dbModel');
var hbs = require('express-hbs');
var xssFilters = require('xss-filters');

// Check if user is already logged in
exports.form = function(req, res, next) {
	if(!req.session.loggedIn) {
  		res.render('login');
  	} else {
  		res.render('main', {fname: req.session.fname, lname: req.session.lname});
  	}
};

exports.checkLogin = function(req, res, next) {
	/*req.session.loggedIn = true;

	res.redirect('/');*/
};

exports.logOut = function (req, res, next) {
	req.session.loggedIn = false;
	req.session.userRole = 0;

	res.redirect('/');	
}


//Get info for given account
exports.checkLogin = function(req, res, next) {
	User.findOne({userName: req.body.uname}, function(err, user) {
		if (err) return console.error(err);

		//console.log(user[0]);

		bcrypt.compare(req.body.password, user.password, function(err, result) {
			if(result) {
				req.session.loggedIn = true;
				req.session.uname = req.body.uname;
				req.session.role = user.role;
				req.session.fname = user.firstName;
				req.session.lname = user.lastName;
				req.session.paid = user.paid;
				console.log("Logged in.");

				res.render('main', {
					uname: xssFilters.inHTMLData(user.userName), 
					fname: xssFilters.inHTMLData(user.firstName), 
					lname: xssFilters.inHTMLData(user.lastName),
					isPaid: user.paid
				});
			} else{
 				res.status(401);
				res.end('Invalid login');
			}
		});
	});
}

//Return data for user
exports.userData = function(req, res, next) {
	User.find({userName: 'tuomas'}, function(err, user) {
		if (err) return console.error(err);
		console.log(user[0]);

		return user[0];
	});
}
