var express = require('express');
var bodyParser = require('body-parser');

var hbs = require('express-hbs');
var login = require('./routes/login');
var register = require('./routes/register');
var mainPage = require('./routes/main');
var edit = require('./routes/edit');
var list = require('./routes/list');
var pay = require('./routes/pay');
var editController = require('./controllers/editController');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coursework_db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var session = require('express-session');
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

//User roles: 0=unregistered, 1= Admin, 2= regular user
app.use(function (req, res, next) {
	if (!req.session.userRole) {
    	req.session.userRole = 0;
  	}
  	next();
});

app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use ('/', mainPage);
app.use('/login', login);
app.use('/', login);
app.use('/', register);
app.use('/', edit);
app.use('/', list);
app.use('/', pay);
app.use('/delete', edit);

app.listen(3000, () => console.log('App listening on port 3000!'))
