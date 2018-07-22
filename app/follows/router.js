const follow = require('./follow-model')
const Router = require('express-promise-router')
const router = new Router()

const createFollow = async (req, res) => {
  await follow.create(req.body.idAccount, req.body.idFollower, (error, followObject) => {
    console.log(followObject)
    return error ? res.sendStatus(503) : res.json(followObject)
  })
}

const destroyFollow = async (req, res) => {
  await follow.destroy(req.body.idAccount, req.body.idFollower, (error, row) => {
    return error ? res.sendStatus(503) : res.json(row)
  })
}

const getFollowers = async (req, res) => {
  await follow.findFollowersByAccount(req.query.idAccount, (error, followers) => {
    console.log(followers)
    return error ? res.sendStatus(503) : res.json(followers)
  })
}

const getFollowing = async (req, res) => {
  await follow.findFollowingByAccount(req.query.idAccount, (error, following) => {
    console.log(following)
    return error ? res.sendStatus(503) : res.json(following)
  })
}

router.post('/follow', createFollow)
router.delete('/follow', destroyFollow)
router.get('/followers', getFollowers)
router.get('/following', getFollowing)

module.exports = router