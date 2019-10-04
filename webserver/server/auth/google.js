const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   console.log('Google client ID / secret not found. Skipping Google OAuth.')
// } else {
//   const googleConfig = {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK
//   }

//   const strategy = new GoogleStrategy(
//     googleConfig,
//     (token, refreshToken, profile, done) => {
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
        // , imgUrl, firstName, lastName, fullName
      }
    })
    res.json(user[0])
  } catch (error) {
    console.error(error)
  }
})

// passport.use(strategy)

// router.get(
//   '/',
//   passport.authenticate('google', {scope: ['email', 'profile']})
// )

// router.get(
//   '/callback',
//   passport.authenticate('google', {
//     successRedirect: '/home',
//     failureRedirect: '/login'
//   })
//   )
// }
