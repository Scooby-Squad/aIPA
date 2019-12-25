const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (req.user) {
    try {
      const user = await User.findByPk(req.user.dataValues.id)
      res.json(user)
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})
