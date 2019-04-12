var mongoose = require('mongoose');
// Teacher Schema
var TeacherSchema = mongoose.Schema({
  tid: {
    type:String,
    unique:true
  },
  tpass: {
    type:String,
  },
  tname: {type:String}
});


var Projectsteacher = module.exports = mongoose.model('teacher', TeacherSchema);