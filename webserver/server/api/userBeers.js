const router = require('express').Router()
const {User_Beer} = require('../db/models')
const {Beer} = require('../db/models')
module.exports = router
// Get a userbeers for a user
router.get('/', async (req, res, next) => {
  try {
    const userbeers = await User_Beer.findRatings(1)
    const filterBeers = userbeers.filter(beer => {
      if (beer.rating > 0) return beer
    })
    res.json(filterBeers)
  } catch (err) {
    console.error(err)
    next(err)
  }
})
router.get('/wishlist', async (req, res, next) => {
  try {
    const wishlist = await User_Beer.findAll({
      include: [{model: Beer}],
      where: {
        userId: 1,
        rating: '0'
      }
    })
    res.json(wishlist)
  } catch (error) {
    next(error)
  }
})
router.delete('/wishlist/:beerId', async (req, res, next) => {
  try {
    console.log('REQ', req)
    await User_Beer.destroy({
      where: {
        userId: 1,
        beerId: req.params.beerId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
// Update a userbeer
router.put('/update', async (req, res, next) => {
  // have a check on req.user in index, currently commented out for testing
  let {rating, beerId} = req.body
  if (!beerId) beerId = req.body.id
  try {
    const update = await User_Beer.updateOrCreateRating(1, beerId, rating)
    if (!update) {
      console.error('Updated')
    }
    res.send(200)
  } catch (err) {
    next(err)
  }
})
