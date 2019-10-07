const Sequelize = require('sequelize')
const db = require('../db')

const User_Beer = db.define('user_beer', {
  rating: {
    type: Sequelize.INTEGER
  }
})

// Find or Creates a User_Beer and returns it
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
