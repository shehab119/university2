var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session= require('express-session');
var expressValidator=require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose= require('mongoose');
var url=require('url');
var async = require('async');
var crypto=require('crypto');
var session = require('express-session');
var createError = require('createerror');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var adminRouter = require('./routes/admin');
var studentRouter = require('./routes/student');
var teacherRouter = require('./routes/teacher');



var app = express();

console.log("Successufully started!")

//database connection
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/rpsu', {
  useNewUrlParser: true
});
var db = mongoose.connection;

// view engine setup

app.set('views', [path.join(__dirname, 'views'),
                  path.join(__dirname, 'views/admin'),
                  path.join(__dirname, 'views/student'),
                  path.join(__dirname, 'views/teacher'),

]);

app.set('view engine', 'ejs');

var options = {
  maxAge: '1d',
};
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());



app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', express.static(path.join(__dirname, 'public'), options));
app.use('/admin/menu', express.static(path.join(__dirname, 'public'), options));
app.use('/admin/addteachers', express.static(path.join(__dirname, 'public'), options));

app.use('/admin/student/edit', express.static(path.join(__dirname, 'public'), options));
app.use('/admin/student/delete', express.static(path.join(__dirname, 'public'), options));
app.use('/admin/teacher/edit', express.static(path.join(__dirname, 'public'), options));
app.use('/admin/teacher/delete', express.static(path.join(__dirname, 'public'), options));




app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/admin', adminRouter);
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
