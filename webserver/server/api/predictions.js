const router = require('express').Router()
const {Beer, User_Beer} = require('../db/models')
const {Tensor} = require('../tensor.js')
module.exports = router
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// Get Predictions for All Beers
router.get('/', async (req, res, next) => {
  try {
    const ratedBeers = await User_Beer.findAll({
      where: {userId: req.user.id, rating: {[Op.ne]: '0'}},
      include: [{model: Beer}]
    })

    let userRatedBeers = []
    ratedBeers.forEach(beer => {
      userRatedBeers.push({
        id: beer.dataValues.beerId,
        abv: beer.dataValues.beer.dataValues.abv,
        geo: beer.dataValues.beer.dataValues.geoId,
        type: beer.dataValues.beer.dataValues.typeId,
        score: parseInt(beer.dataValues.rating)
      })
    })
    const tensor = await Tensor(userRatedBeers)

    // Reduce number by 0.5, then make sure values are between 1 and 5
    for (let i = 0; i < tensor.length; i++) {
      tensor[i] -= 0.5
      if (tensor[i] < 1) {
        tensor[i] = 1
      } else if (tensor[i] > 5) {
        tensor[i] = 5
      }
    }

    res.json(tensor)
  } catch (err) {
    next(err)
  }
})
