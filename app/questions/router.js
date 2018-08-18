const Question = require('./Question')
const Router = require('express-promise-router')
const router = new Router()

router.post('/questions', async (req, res) => {
  try {
    const createdQuestion = await Question
      .query()
      .returning(['id', 'id_account', 'description'])
      .insert({'description': req.body.description, 'id_account': req.body.idAccount})
    return res.json(createdQuestion)
  } catch (err) {
    return res.sendStatus(503)
  }
})

router.get('/questions/show/:questionId', async (req, res) => {
  try {
    const oneQuestion = await Question
      .query()
      .select('id', 'description')
      .eager('account(accountFilter)', {
        accountFilter: (builder) => builder.select('screen_name')
      })
      .where('id', '=', req.params.questionId)
    return res.json(oneQuestion)
  } catch (err) {
    return res.sendStatus(503)
  }
})

router.get('/questions/lookup/:questionIds', async (req, res) => {
  const questionIdsArray = req.params.questionIds.split(',')
  try {
    const multipleQuestions = await Question
      .query()
      .select('id', 'description')
      .eager('account(accountFilter)', {
        accountFilter: (builder) => builder.select('screen_name')
      })
      .where('id', 'in', questionIdsArray)
    return res.json(multipleQuestions)
  } catch (err) {
    return res.sendStatus(503)
  }
})

router.get('/questions', async (req, res) => {
  try {
    const allQuestions = await Question
      .query()
      .select('id', 'description')
      .eager('account(accountFilter)', {
        accountFilter: (builder) => builder.select('screen_name')
      })
    return res.json(allQuestions)
  } catch (err) {
    return res.sendStatus(503)
  }
})

router.delete('/questions', async (req, res) => {
  try {
    await Question
      .query()
      .delete()
      .where('id', '=', req.body.idQuestion)
    return res.json(req.body.idQuestion)
  } catch (err) {
    return res.sendStatus(503)
  }
})

module.exports = router