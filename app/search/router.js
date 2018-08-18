const Router = require('express-promise-router')

const router = new Router()

module.exports = (searchClient) => {

  router.get('/', async (req, res) => {
    try {
      const results = await searchClient.search({
        index: 'back',
        q: `${req.query.q}*`
      })
      return res.json(results)
    } catch (error) {
      return res.sendStatus(503)
    }
  })

  return router
}