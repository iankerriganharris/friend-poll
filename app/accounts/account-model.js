// see also ../config/passport.js

const db = require('../db')
const bcrypt = require('bcrypt-nodejs')

const create = async (username, passphrase) => {
  const salt = bcrypt.genSaltSync(10);
  const query = {
    text: 'INSERT INTO account(screen_name, passphrase) VALUES($1,$2) RETURNING id;',
    values: [username, bcrypt.hashSync(passphrase, salt, null)]
  };
  try {
    const result = await db.query(query);
    return result.rows[0];
  } catch(err) {
    console.log(err.stack)
    return false
  }
}

const exists = async (username) => {
  console.log('finding user')
  const query = {
    text: 'SELECT id FROM account WHERE screen_name = $1;',
    values: [username]
  }
  const result = await db.query(query);
  return result.rowCount === 1;
}

const findOneById = async (id, callback) => {
  const statement = {
    text: 'SELECT * FROM account WHERE id = $1;',
    values: [id]
  }
  try {
    const result = await db.query(statement)
    return callback(null, result.rows[0])
  } catch(error) {
    return callback(error, null)
  }


}

const checkPassword = async (username, passphrase) => {
  console.log('checking passphrase')
  const query = {
    text: 'SELECT id, passphrase FROM account WHERE screen_name = $1;',
    values: [username]
  }
  const result = await db.query(query);
  if ( bcrypt.compareSync(passphrase, result.rows[0].passphrase) ) {
    return result.rows[0];
  } else {
    return false
  }
}

exports.exists = exists
exports.checkPassword = checkPassword
exports.findOneById = findOneById
exports.create = create