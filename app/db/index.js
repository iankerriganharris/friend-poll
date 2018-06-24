const pg = require('pg')

pg.types.setTypeParser(20, 'text', parseInt)

const pool = new pg.Pool()


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}