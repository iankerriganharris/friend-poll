const Router = require('express-promise-router')

const router = new Router()

module.exports = (searchClient) => {

  router.get('/', async (req, res) => {
    try {
      const results = await searchClient.search({
        index: ['account'],
        body: {
          query: {
            multi_match: {
              query: `${req.query.q}`,
              fields: ['screen_name^2', 'first_name', 'last_name']
            }
          }
        }
      })
      const hits = results.hits.hits.length ? results.hits.hits.map((hit) => {
        switch(hit._index) {
          case 'account':
            return {
              id: hit._source.id,
              index: hit._index,
              score: hit._score,
              title: hit._source.screen_name
            }
          case 'question':
            return {
              id: hit._source.id,
              index: hit._index,
              score: hit._score,
              title: hit._source.description
            }
        }
      }) : new Array()
      console.log(hits)
      return res.json(results.hits.hits)
    } catch (error) {
      console.log(error)
      return res.sendStatus(503)
    }
  })

  return router
}