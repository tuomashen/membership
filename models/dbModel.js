var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//User schema roles: 1= Admin, 2= regular user
var userSchema = new mongoose.Schema({
  		userName: String,
  		firstName: String,
		lastName: String,
		password: String,
		role: Number,
		paid: Boolean
});

module.exports = mongoose.model('User', userSchema);
