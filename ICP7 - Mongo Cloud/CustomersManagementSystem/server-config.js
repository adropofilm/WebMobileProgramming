var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');

var apiRouter = require('./routes/user');

var app = express();

mongoose.connect('mongodb+srv://mongodb:mongodb@icp7-cw51b.mongodb.net/test?retryWrites=true', {promiseLibrary: require('bluebird')})
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist/crud-mean-app')));
app.use('/', express.static(path.join(__dirname, 'dist/crud-mean-app')));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;
