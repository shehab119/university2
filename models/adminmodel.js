var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: { 
		type: String,
		 required: true,
		  unique: true
		 },
	  password: {
		   type: String, 
		required: true 
	}

});

var User = module.exports = mongoose.model('User', UserSchema,'admin');

//save username and password into database with bcrypt
module.exports.createUser = function(newUser, callback){
	//if (!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
				if(err) throw err;
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
};

//Finding for login data in database by Username 
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
};
//Finding by  ID
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};
//ComparePassword or Matching Password
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err,isMatch) {
			if (err) throw err;
    	callback(null, isMatch);
	});
};