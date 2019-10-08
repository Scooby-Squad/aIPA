const router = require('express').Router()
const {Beer} = require('../db/models')
const {Tensor} = require('../tensor.js')
module.exports = router

// Get Predictions for All Beers
router.get('/', async (req, res, next) => {
  try {
    const tensor = await Tensor()
    //console.log(tensor, 'tensor is')
    res.json(tensor)
    // const beers = await Beer.findAll()
    // res.json(beers)
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
