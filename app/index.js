
const express = require('express');
const helmet = require('helmet')
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// App settings.
app.use(helmet())
app.use(morgan('dev')); // Logging.
app.use(cookieParser('goodnight'));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'goodnight',
  resave: true,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
  },
}));
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', require('./accounts/router')(passport))
app.use('/api', require('./questions/router'))

module.exports = app