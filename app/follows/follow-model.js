
const db = require('../db')

const create = async (idAccount, idFollower, callback) => {
  const statement = {
    text: 'INSERT INTO follow(id_account, id_follower) VALUES($1, $2)',
    values: [idAccount, idFollower]
  }
  try {
    const result = await db.query(statement)
    const followObject = result.rows[0]
    return callback(null, followObject)
  } catch(error) {
    return callback(error, null)
  }
}

const findFollowersByAccount = async (idAccount, callback) => {
  const statement = {
    text: `SELECT follow.id_follower, account.screen_name 
            FROM follow 
            INNER JOIN account ON (account.id = follow.id_follower) 
            WHERE follow.id_account = $1`,
    values: [idAccount]
  }
  try {
    const result = await db.query(statement)
    const followers = result.rows
    return callback(null, followers)
  } catch(error) {
    return callback(error, null)
  }
}

const findFollowingByAccount = async (idAccount, callback) => {
  const statement = {
    text: `SELECT follow.id_account, account.screen_name
            FROM follow 
            INNER JOIN account ON (account.id = follow.id_account)
            WHERE id_follower = $1`,
    values: [idAccount]
  }
  try {
    const result = await db.query(statement)
    const following = result.rows
    return callback(null, following)
  } catch(error) {
    return callback(error, null)
  }
}

exports.create = create
exports.findFollowersByAccount = findFollowersByAccount
exports.findFollowingByAccount = findFollowingByAccount
