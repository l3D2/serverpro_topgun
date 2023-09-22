const express = require('express');
const app = express();
const createError = require('http-errors');
const logger = require('morgan');
const dotenv = require('dotenv')
const env = dotenv.config().parsed

//Include routes
const api_upload = require('./routers/upload');
const index_router = require('./routers/index');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(logger('dev'));
app.use(express.static('public'));
app.use((req, res, next) => {
    const clientIP = req.ip;
    const remoteAddress = req.connection.remoteAddress;
    const clientPort = req.connection.remotePort;
    console.log('Client IP:' +clientIP+" Remote Address: "+remoteAddress+" Client Port: "+clientPort);
    next();
});

app.use('/', index_router);
app.use('/api/upload', api_upload);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(env.PORT, function() {
  console.log('App listening on port '+env.PORT);
});

module.exports = app;
