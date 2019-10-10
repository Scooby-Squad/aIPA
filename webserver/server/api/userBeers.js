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
  // have a check on req.user in index, currently commented out for testing
  const {rating, beerId} = req.body
  try {
    const update = await User_Beer.updateOrCreateRating(
      req.user.id,
      beerId,
      rating
    )
    if (!update) {
      console.error('Updated')
    }
    res.send(200)
  } catch (err) {
    next(err)
  }
})
