const Router = require('express-promise-router')

const router = new Router()

module.exports = (passport) => {
  const doLogin = (req, res) => {
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

  const doLogout = (req, res) => {
    req.logOut();
    req.session.destroy(() => {
      res.json({'status': 200});
    });
  }

  const createAccount = (req, res) => {
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

  router.post('/login', passport.authenticate('local-login'), doLogin)
  router.post('/register', passport.authenticate('local-signup'), createAccount)

  router.get('/logout', doLogout)


  return router
}