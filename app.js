require('dotenv').config()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var localTunnel = require('localtunnel');
var fileUpload = require('express-fileupload');
var validator = require('express-validator')

var routes = require('./routes/index');

// Check if the '--dev' flag was passed
const devMode = process.argv[2] === '--dev';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var listener = app.listen(5214, function() {
  console.log('Listening on port ' + listener.address().port);
});

if (devMode) {
  const options = {
    subdomain: process.env.LT_SUBDOMAIN
  }
  console.log(process.env.LT_SUBDOMAIN)
  tunnel = localTunnel(listener.address().port, options, function(err, tunnel) {
    if (err) {
      console.log('Error creating localtunnel');
      process.exit(1);
    }

    console.log('The localtunnel has been opened: ' + tunnel.url);
  });
}

var githubScraper = require('./services/github-scraper');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
