var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Student Schema
var StudentSchema = mongoose.Schema({
  sid: {
    type:String
    
  },
  sname: {
    type:String
  
  },
  spass: {type:String},
  
});

var Student = module.exports = mongoose.model('Student', StudentSchema ,'student');


