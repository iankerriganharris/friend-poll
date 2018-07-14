//
const db = require('../db')

/**
 * @callback requestCallback
 * @param {*} error response
 * @param {*} success response
 */

const create = async (description, idAccount, callback) => {
  console.log(idAccount)
  const statement = {
    text: 'INSERT INTO question(description, id_account) VALUES($1, $2) RETURNING id, id_account, description;',
    values: [description, idAccount]
  };
  try {
    const result = await db.query(statement)
    const questionObject = result.rows[0]
    console.log(questionObject)
    return callback(null, questionObject)
  } catch(error) {
    return callback(error, null)
  }
}

/**
 * 
 * @param {requestCallback} callback
 * @returns {Array} All questions
 */
const findAll = async (callback) => {
  const statement = {
    text: 'SELECT * FROM question'
  }
  try {
    const result = await db.query(statement)
    const all_questions = result.rows
    return callback(null, all_questions)
  } catch(error) {
    return callback(error, null)
  }
}

const findByUser = async (screen_name, callback) => {
  const statement = {
    text: 'SELECT description FROM question WHERE id_account = $1',
    values: [username]
  }
}

exports.create = create
exports.findAll = findAll