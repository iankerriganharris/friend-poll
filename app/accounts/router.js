const Router = require('express-promise-router')
const Account = require('./Account')
const log = require('../config/logger.js')

const router = new Router()

module.exports = (passport) => {

  router.post('/register', passport.authenticate('local-signup'), (req, res) => {
    req.session.save(() => {
      return res.status(200).json({
        success: true,
        redirectUrl: '/',
        user: {
          id: req.user.id,
          isAuthenticated: true,
        },
      })
    })
  })

  router.post('/login', passport.authenticate('local-login'), (req, res) => {
    req.session.save(() => {
      return res.status(200).json({
        success: true,
        redirectUrl: '/',
        user: {
          id: req.user.id,
          isAuthenticated: true,
        },
      })
    })
  })

  router.get('/accounts/all', async (req, res) => {
    const accounts = await Account.query().eager('[question, follow, follower]')
    return res.status(200).json(accounts)
  })

  router.get('/logout', (req, res) => {
    req.logOut();
    req.session.destroy(() => {
      return res.json({'status': 200});
    });
  })

  return router
}