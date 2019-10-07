const router = require('express').Router()
const {Beer} = require('../db/models')
module.exports = router

// Get All Beers
router.get('/', async (req, res, next) => {
  try {
    const beers = await Beer.findAll()
    res.json(beers)
  } catch (err) {
    next(err)
  }
})

// Get Single Beer
router.get('/:id', async (req, res, next) => {
  try {
    const beer = await Beer.findByPk(req.params.id)
    res.json(beer)
  } catch (err) {
    next(err)
  }
})

// Get All Beers That A User Has Ranked
router.get('/ranked', async (req, res, next) => {
  try {
    // might be a better way to do this w/ using where clause so you don't have to loop & make multiple queries
    const beer = await Beer.getRanked(req.body.ids)
    res.json(beer)
  } catch (err) {
    next(err)
  }
})
