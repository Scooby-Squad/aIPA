const Sequelize = require('sequelize')
const db = require('../db')

const User_Beer = db.define('user_beer', {
  rating: {
    type: Sequelize.INTEGER
  }
})

module.exports = User_Beer
