const User = require('./user')
const Beer = require('./beer')
const User_Beer = require('./userBeerModel')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.belongsToMany(Beer, {through: User_Beer})
Beer.belongsToMany(User, {through: User_Beer})

Beer.hasMany(User_Beer)
User_Beer.belongsTo(Beer)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Beer,
  User_Beer
}
