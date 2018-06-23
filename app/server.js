require('dotenv').config()
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mountRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

// App settings.
require('./config/passport')(passport);
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
app.use(passport.initialize());
app.use(passport.session());

// Routes
mountRoutes(app, passport)

// Launch
app.listen(port, () => console.log(`Listening on port ${port}`));