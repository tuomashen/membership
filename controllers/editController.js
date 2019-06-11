var model = require('../models/editModel');
var db_model = require('../models/dbModel');
var session = require('express-session');
var User = require('../models/dbModel');
var bodyParser = require('body-parser');
var xssFilters = require('xss-filters');


exports.edit = function(req, res, next) {
	console.log(req.params.userName);

	//Must be admin or own account
	if(req.params.userName != req.session.uname && req.session.role != 1) {
		res.status(401).send('Access denied.');
	}

	res.status(200);

	User.findOne({userName: req.params.userName}, function(err, user) {
		res.render('edit', 
			{
				uname: xssFilters.inHTMLData(user.userName), 
				fname: xssFilters.inHTMLData(user.firstName), 
				lname: xssFilters.inHTMLData(user.lastName),
				role: user.role
			});
	});
};

exports.remove = function (req, res, next) {
	if(req.params.userName != req.session.uname && req.session.role != 1) {
		res.status(401).send('Access denied.');
	}

	User.deleteOne({userName: req.params.userName}, function(err, user) {
		if (err) return handleError(err);
		
		//Own account deleted
		res.status(200);

		if(req.params.userName == req.session.uname) {
			res.redirect('/logout');
		}else {
			res.redirect('/');
		}
	});
}

//Commit changes to database
exports.submitChange = function(req, res, next) {
	if(req.body.uname != req.session.uname && req.session.role != 1) {
		res.status(401).send('Access denied.');
	}

	User.findOne({userName: req.body.uname}, function(err, user) {
		user.userName = req.body.uname;
		user.firstName = req.body.fname;
		user.lastName = req.body.lname;

		if (req.session.role == 1) {
			user.role = req.body.role;
		}

		user.save();

		res.status(200);

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