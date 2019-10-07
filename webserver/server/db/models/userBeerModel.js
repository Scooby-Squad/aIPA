const Sequelize = require('sequelize')
const db = require('../db')

const User_Beer = db.define('user_beer', {
  // might be worth having a max/min for rating & default
  // also think about having some kind of boolean for checking if they've rated it or not or some idea w/ a specific rating to tell if it's been rated or not
  rating: {
    type: Sequelize.INTEGER
  }
})

// Find or Creates a User_Beer and returns it
// better name for this method.
User_Beer.get = async function(userId, beerId) {
  const userBeer = await User_Beer.findOrCreate({
    where: {
      userId,
      beerId
    }
  })
  return userBeer
}

// Finds User_Beers for a user
User_Beer.findRatings = async function(userId) {
  const userbeers = await User_Beer.findAll({
    where: {userId}
  })
  return userbeers
}

// Updates a specific User_Beer for a specific user
User_Beer.updateRatings = async function(userId, beerId, rating) {
  const updatedUserBeer = await User_Beer.update(
    {rating},
    {
      where: {
        userId,
        beerId
      }
    }
  )
  return updatedUserBeer
}

module.exports = User_Beer
