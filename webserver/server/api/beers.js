const router = require('express').Router()
const {Beer} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const beers = await Beer.findAll()
    res.json(beers)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const beer = await Beer.findByPk(req.params.id)
    res.json(beer)
  } catch (err) {
    next(err)
  }
})
