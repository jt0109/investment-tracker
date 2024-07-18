// express
var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// Defaults
const investmentRouter = require('./routes/investments');
const dividendRouter = require('./routes/dividends');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());  // 中間件，用於解析 JSON 請求體
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/api/investments', investmentRouter);
app.use('/api/dividends', dividendRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message }); // Return JSON error for API requests
});


// Exporting
module.exports = app;
