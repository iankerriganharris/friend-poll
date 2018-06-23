const Router = require('express-promise-router')
//const passport = require('passport')

const router = new Router()

module.exports = (passport) => {
  router.post('/login', passport.authenticate('local-login'),
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

const doLogin = () => {
  passport.authenticate('local-login'),
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
  }
}

router.post('/login', doLogin(passport))

module.exports = router;