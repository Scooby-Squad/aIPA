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
      where: {userId: 1, rating: {[Op.ne]: '0'}}
    })
    let userRatedBeers = []
    ratedBeers.forEach(beer => {
      // console.log(beer.dataValues.rating!=='0')
      userRatedBeers.push({
        id: beer.dataValues.beerId,
        abv: 4.2,
        geo: 1,
        type: 7,
        score: parseInt(beer.dataValues.rating)
      })
    })
    //let ratedBeersFiltered = await ratedBeers.filter(beer => {beer.dataValues.rating === '0'})
    //console.log(ratedBeersFiltered)
    res.json(userRatedBeers)
    // const tensor = await Tensor()
    // res.json(tensor)
  } catch (err) {
    next(err)
  }
})

// // Get Single Beer
// router.get('/:id', async (req, res, next) => {
//   try {
//     const beer = await Beer.findByPk(req.params.id)
//     res.json(beer)
//   } catch (err) {
//     next(err)
//   }
// })

// // Get All Beers That A User Has Ranked
// router.get('/ranked', async (req, res, next) => {
//   try {
//     const beer = await Beer.getRanked(req.body.ids)
//     res.json(beer)
//   } catch (err) {
//     next(err)
//   }
// })
