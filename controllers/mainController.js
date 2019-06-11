var model = require('../models/mainModel');
var session = require('express-session');
var xssFilters = require('xss-filters');

// Check if user is alreadfy logged in
exports.mainPage = function(req, res, next) {
	if(!req.session.loggedIn) {
  		res.render('login');
  	} else {
  		res.render('main', {
  			uname: xssFilters.inHTMLData(req.session.uname),
  			fname: xssFilters.inHTMLData(req.session.fname), 
  			lname: xssFilters.inHTMLData(req.session.lname),
  			isPaid: xssFilters.inHTMLData(req.session.paid)
  		});
  	}
};
