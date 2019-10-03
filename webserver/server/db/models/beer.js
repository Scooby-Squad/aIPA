const Sequelize = require('sequelize')
const db = require('../db')

const Beer = db.define('beer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  abv: {
    type: Sequelize.FLOAT
  },
  ibu: {
    type: Sequelize.INTEGER
  },
  srm: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  style: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  brewer: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  coordinates: {
    type: Sequelize.STRING
  },
  website: {
    type: Sequelize.STRING
  },
  geo: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  }
})

module.exports = Beer
