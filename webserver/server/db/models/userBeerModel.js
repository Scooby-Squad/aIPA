const Sequelize = require('sequelize')
const db = require('../db')
const Beer = require('./beer')

const User_Beer = db.define('user_beer', {
  rating: {
    type: Sequelize.ENUM('0', '1', '2', '3', '4', '5'),
    defaultValue: '0'
  }
})

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


// Returns the object for the d3 sunburst
User_Beer.d3Sunburst = async function(userId) {
  const userbeers = await User_Beer.findAll({
    where: {userId},
    include: [{model: Beer}]
  })
  return userbeers
}

User_Beer.updateOrCreateRating = async function(userId, beerId, rating = 0) {
  const userBeer = await User_Beer.findOrCreate({
    where: {
      userId,
      beerId
    }
  })
  const updatedUB = await userBeer[0].update({rating})
  return updatedUB

}

module.exports = User_Beer
