const Router = require('express-promise-router')

const router = new Router()

module.exports = (passport) => {
  router.post('/', passport.authenticate('local-signup'), 
    (req, res) => {
      req.session.save(() => {
        res.status(200).json({
          success: true,
          redirectUrl: '/',
          user: {
            id: req.user.id,
            isAuthenticated: true,
          },
        })
      })
  })

  return router
}