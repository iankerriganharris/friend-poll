const question = require('./question-model')
const Router = require('express-promise-router')
const router = new Router()

const createQuestion = async (req, res) => {
  await question.create(req.body.description, req.body.idAccount, (error, questionId) => {
    return error ? res.sendStatus(503) : res.json(questionId)
  })
}

const getQuestions = async (req, res) => {
  await question.findAll((error, questions) => {
    return error ? res.sendStatus(503) : res.json(questions)
  })
}

router.post('/questions', createQuestion)
router.get('/questions', getQuestions)

module.exports = router