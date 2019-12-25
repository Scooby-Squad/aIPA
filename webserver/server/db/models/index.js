const User = require('./user')
const Beer = require('./beer')
const User_Beer = require('./userBeerModel')

User.belongsToMany(Beer, {through: User_Beer})
Beer.belongsToMany(User, {through: User_Beer})

Beer.hasMany(User_Beer)
User_Beer.belongsTo(Beer)


module.exports = {
  User,
  Beer,
  User_Beer
}
