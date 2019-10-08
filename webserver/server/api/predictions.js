const router = require('express').Router()
const {Beer, User_Beer} = require('../db/models')
const {Tensor} = require('../tensor.js')
module.exports = router
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// Get Predictions for All Beers
router.get('/', async (req, res, next) => {
  // USER ID 1 IS HARDCODED FOR NOW!!!!!!!!!!!!!!!!!!!!!!

  try {
    const ratedBeers = await User_Beer.findAll({
      where: {userId: 1, rating: {[Op.ne]: '0'}},
      include: [{model: Beer}]
    })
    console.log(
      ratedBeers[0].dataValues.beer.dataValues,
      'RATEDBEERSDATAVALUES'
    )
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
    res.json(tensor)
  } catch (err) {
    next(err)
  }
})
