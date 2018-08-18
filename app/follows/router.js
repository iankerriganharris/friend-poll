const Follow = require('./Follow')
const Account = require('../accounts/Account')
const Router = require('express-promise-router')
const router = new Router()

router.post('/follow', async (req, res) => {
  try {
    const createdFollow = await Follow
      .query()
      .insert({id_account: req.body.idAccount, id_follower: req.body.idFollower})
    return res.json(createdFollow)
  } catch (err) {
    return res.sendStatus(503)
  }

})

router.get('/followers/list/:idAccount', async (req, res) => {
  try {
    const followersObject = await Account
      .query()
      .select('id', 'screen_name')
      .eager('follower(followerFilter)', {
        followerFilter: (builder) => builder.select('follow.id_follower', 'account.screen_name')
      })
      .where('account.id', '=', req.params.idAccount)
    return res.json(followersObject[0].follower)
  } catch (err) {
    return res.sendStatus(503)
  }
})

router.get('/following/list/:idAccount', async (req, res) => {
  try {
    const followObject = await Account
      .query()
      .select('id', 'screen_name')
      .eager('follow(followFilter)', {
        followFilter: (builder) => builder.select('account.id', 'account.screen_name')
      })
      .where('account.id', '=', req.params.idAccount)
    return res.json(followObject)
  } catch (err) {
    console.log(err)
    return res.sendStatus(503)
  }
})

router.delete('/follow', async (req, res) => {
  try {
    await Follow
      .query()
      .delete()
      .where('id_account', '=', req.body.idAccount)
      .andWhere('id_follower', '=', req.body.idFollower)
    return res.sendStatus(200)
  } catch (err) {
    return res.sendStatus(503)
  }
})

module.exports = router