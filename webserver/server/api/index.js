const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/beers', require('./beers'))
// Uncomment this once we're ready to protect the routes; maybe want to move users after this as well
// router.use((req, res, next) => {
//   if (!req.user) {
//     const error = new Error('Not Authorized')
//     error.status = 401
//     next(error)
//   } else next()
// })
router.use('/userbeers', require('./userBeers'))
router.use('/predictions', require('./predictions'))
router.use('/d3', require('./d3'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
