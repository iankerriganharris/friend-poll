const Router = require('express-promise-router')
const Account = require('./Account')
const Question = require('../questions/Question')
const Follow = require('../follows/Follow')
const log = require('../config/logger.js')

const router = new Router()

module.exports = (passport) => {

  router.get('/all', async (req, res) => {
    const accounts = await Account.query().eager('[question, follow, follower]')
    return res.status(200).json(accounts)
  })

  router.get('/logout', (req, res) => {
    req.logOut();
    req.session.destroy(() => {
      return res.json({'status': 200});
    });
  })

  router.get('/:screenName', async (req, res) => {
    try {
      const oneAccount = await Account
        .query()
        .select('id', 'first_name', 'last_name', 'screen_name')
        .where('screen_name', '=', req.params.screenName)
      const accountQuestions = await Question
        .query()
        .select('id', 'description')
        .where('id_account', '=', oneAccount[0].id)
      const followRow = await Follow
        .query()
        .select('id')
        .where('id_account', '=', oneAccount[0].id)
        .andWhere('id_follower', '=', req.user[0].id)
      console.log(followRow)
      const isFollowing = (followRow.length === 1);
      const data = {profile: oneAccount[0], questions: accountQuestions, following: isFollowing}
      return res.json(data)
    } catch (err) {
      console.log(err)
      res.sendStatus(503)
    }
  })

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
          screen_name: req.user.screen_name,
          isAuthenticated: true,
        },
      })
    })
  })

  return router
}