const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  const googleId = req.body.id
  const email = req.body.email
  const imgUrl = req.body.photoUrl
  const firstName = req.body.givenName
  const lastName = req.body.familyName

  try {
    const user = await User.findOrCreate({
      where: {googleId},
      defaults: {
        email
      }
    })
    req.login(user[0], err => (err ? next(err) : res.json(user[0])))
  } catch (err) {
    console.error(err)
  }
})
