//
const db = require('../db')

/**
 * @callback requestCallback
 * @param {*} error response
 * @param {*} success response
 */

const create = async (callback) => {
  const statement = {
    text: 'INSERT INTO question(description) VALUES($1) RETURNING description;',
    values: [req.body.description]
  };
  try {
    const result = await db.query(statement)
    console.log(result)
    const question_id = result.rows[0]
    return callback(null, question_id)
  } catch(error) {
    console.log(error.stack)
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

exports.create = create
exports.findAll = findAll