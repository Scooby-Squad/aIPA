const router = require('express').Router()
const {User_Beer} = require('../db/models')
module.exports = router

// Get a userbeers for a user
router.get('/', async (req, res, next) => {
  try {
    const userbeers = await User_Beer.findRatings(1)
    res.json(userbeers)
  } catch (err) {
    next(err)
  }
})
