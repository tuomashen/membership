var model = require('../models/registerModel');
var session = require('express-session');
var bcrypt = require('bcryptjs');
var User = require('../models/dbModel');
const { check, validationResult } = require('express-validator/check');

exports.registerNew = function(req, res, next) {
  	res.render('register');
};

//Register new account
exports.registerAccount = function(req, res, next) {
	console.log(req.body.uname);
	console.log(req.body.lname);
	console.log(req.body.fname);

	var password = req.body.password;

	bcrypt.hash(password, 12, function(err, hash) {
		var passHash = hash;
		console.log(passHash);

		var newUser = new User({
			userName: req.body.uname, 
			firstName: req.body.fname,
			lastName: req.body.lname,
			password: passHash,
			role: 1,
			paid: false 
		});

		newUser.save(function(err, newTask){
			if (err) return console.error(err);
			console.log("New user saved.");
			res.status(200);
		});

	});
	
	res.redirect('/');
};