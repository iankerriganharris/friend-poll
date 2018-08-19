
const express = require('express');
const Knex = require('knex')
const knexConfig = require('./db/knexfile')
const { Model } = require('objection')
const helmet = require('helmet')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const passport = require('passport');
require('./config/passport')(passport)

const knex = Knex(knexConfig.development)
Model.knex(knex)

const elasticsearch = require('elasticsearch')
const searchClient = require('./config/elasticsearch')(elasticsearch)

// App settings.
const app = express()
  .use(helmet())
  .use(cookieParser('goodnight'))
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use(bodyParser.json())
  .use(session({
    secret: 'goodnight',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    },
  }))
  .use(passport.initialize())
  .use(passport.session())
  // Routes
  .use('/api/accounts', require('./accounts/router')(passport))
  .use('/api', require('./questions/router'))
  .use('/api', require('./follows/router'))
  .use('/api/search', require('./search/router')(searchClient))

module.exports = app