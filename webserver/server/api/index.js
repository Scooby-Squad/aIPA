const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/beers', require('./beers'))
router.use('/userbeers', require('./userBeers'))
router.use('/predictions', require('./predictions'))
router.use('/d3', require('./d3'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
