const router = require('express').Router()
const {Beer, User_Beer, User} = require('../db/models')
module.exports = router

// Get a user's beer ratings/wishlist
router.get('/:userId', async (req, res, next) => {
  try {
    const userbeers = await User_Beer.findAll({
      where: {userId: req.params.userId}
    })
    res.json(userbeers)
  } catch (err) {
    next(err)
  }
})

// Put route

router.put('/:beerId', async (req, res, next) => {
  if (req.user) {
    try {
      const userBeer = await User_Beer.findOrCreate({
        where: {
          userId: req.user.dataValues.id,
          beerId: req.params.beerId
        }
      })
      if (req.body.rating) {
        const updatedUserBeer = await User_Beer.update(
          {rating: req.body.rating},
          {
            where: {
              userId: req.user.dataValues.id,
              beerId: req.params.beerId
            }
          }
        )
        res.status(200).json(updatedUserBeer)
      } else {
        res.status(200).json(userBeer)
      }
    } catch (err) {
      next(err)
    }
  } else {
    res.sendStatus(401)
  }
})
