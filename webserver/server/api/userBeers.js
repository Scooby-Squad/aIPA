const router = require('express').Router()
const {User_Beer} = require('../db/models')
module.exports = router

// Get a userbeers for a user
router.get('/', async (req, res, next) => {
  try {
    const userbeers = await User_Beer.findRatings(1)
    res.json(userbeers)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

// Update a userbeer
router.put('/update', async (req, res, next) => {
  console.log('reqbody', req.body)
  const {rating, userId, beerId} = req.body
  try {
    const update = await User_Beer.updateOrCreateRating(userId, beerId, rating)
    console.log('updated', update)
    if (!update) {
      console.error('Updated')
    }
    res.send(200)
  } catch (err) {
    next(err)
  }
})
