// Update with your config settings.

require('dotenv').config({path: '../.env'})

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : process.env.PGHOST,
      user : process.env.PGUSER,
      password : process.env.PGPASSWORD,
      database : process.env.PGDATABASE
    },
    pool: {
      min: 2,
      max: 10
    }
  },

};
