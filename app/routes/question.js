const Router = require('express-promise-router')

const db = require('../db')

const router = new Router()

module.exports = router

router.get('/all', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM question')
  res.send(rows[0])
})

router.post('/', async (req, res) => {
  const query = {
    text: 'INSERT INTO question(description) VALUES($1) RETURNING description;',
    values: [req.body.description]
  };
  try {
    const result = await db.query(query);
    return res.json({
      success: true,
      question_id: result.rows[0],
    });
  } catch(err) {
    console.log(err.stack)
    return res.sendStatus(503)
  }
})