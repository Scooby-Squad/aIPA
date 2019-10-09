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
  try {
    await User_Beer.update(
      {rating: req.body.rating},
      {
        where: {
          userId: req.body.userId,
          beerId: req.body.beerId
        }
      }
    )
    console.error('Updated')
    res.send(200)
  } catch (err) {
    next(err)
  }
})
