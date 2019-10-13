const router = require('express').Router()
const {Beer, User_Beer} = require('../db/models')
const {Tensor} = require('../tensor.js')
module.exports = router
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const beerList = require('../tensor.js/beerTesting.json')

// Get a userbeers for a user
router.get('/sunburst', async (req, res, next) => {
  try {
    const userbeers = await User_Beer.d3Sunburst(
      req.headers.referer.split('=')[1]
    )
    let out = {
      name: 'flare',
      children: [
        {name: 'Amber', children: []},
        {name: 'Blonde', children: []},
        {name: 'Brown Ale', children: []},
        {name: 'Hefeweizen', children: []},
        {name: 'IPA', children: []},
        {name: 'Irish Red', children: []},
        {name: 'Lager', children: []},
        {name: 'Other', children: []},
        {name: 'Porter', children: []},
        {name: 'Seasonal', children: []},
        {name: 'Stout', children: []}
      ]
    }

    for (let i = 0; i < userbeers.length; i++) {
      for (let j = 0; j < out.children.length; j++) {
        if (out.children[j].name === userbeers[i].beer.type) {
          out.children[j].children.push({
            name: userbeers[i].beer.name,
            value: 1
          })
        }
      }
    }

    res.json(out)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/hexbin', async (req, res, next) => {
  try {
    const ratedBeers = await User_Beer.findAll({
      where: {
        userId: req.headers.referer.split('=')[1],
        rating: {[Op.ne]: '0'}
      },
      include: [{model: Beer}]
    })
    console.log(
      ratedBeers[0].dataValues.beer.dataValues,
      'RATEDBEERSDATAVALUES'
    )
    let userRatedBeers = []
    ratedBeers.forEach(beer => {
      userRatedBeers.push({
        id: beer.dataValues.beerId,
        abv: beer.dataValues.beer.dataValues.abv,
        geo: beer.dataValues.beer.dataValues.geoId,
        type: beer.dataValues.beer.dataValues.typeId,
        score: parseInt(beer.dataValues.rating)
      })
    })
    const tensor = await Tensor(userRatedBeers)

    // Reduce number by 0.5, then make sure values are between 1 and 5
    for (let i = 0; i < tensor.length; i++) {
      tensor[i] -= 0.5
      if (tensor[i] < 1) {
        tensor[i] = 1
      } else if (tensor[i] > 5) {
        tensor[i] = 5
      }
    }

    let out = 'carat,price\n'
    for (let i = 0; i < tensor.length; i++) {
      out += `${beerList[i].abv},${tensor[i]}\n`
    }

    res.send(out)
    //res.json(tensor)
  } catch (err) {
    next(err)
  }
})

router.get('/bubble-chart', async (req, res, next) => {
  console.log(req.headers.referer.split('=')[1], 'user id is')
  try {
    const ratedBeers = await User_Beer.findAll({
      where: {
        userId: req.headers.referer.split('=')[1],
        rating: {[Op.ne]: '0'}
      },
      include: [{model: Beer}]
    })
    let userRatedBeers = []
    ratedBeers.forEach(beer => {
      userRatedBeers.push({
        id: beer.dataValues.beerId,
        abv: beer.dataValues.beer.dataValues.abv,
        geo: beer.dataValues.beer.dataValues.geoId,
        type: beer.dataValues.beer.dataValues.typeId,
        score: parseInt(beer.dataValues.rating)
      })
    })
    const tensor = await Tensor(userRatedBeers)

    // Reduce number by 0.5, then make sure values are between 1 and 5
    for (let i = 0; i < tensor.length; i++) {
      tensor[i] -= 0.5
      if (tensor[i] < 1) {
        tensor[i] = 1
      } else if (tensor[i] > 5) {
        tensor[i] = 5
      }
    }

    let out = 'id,value\n'
    for (let i = 0; i < tensor.length; i++) {
      out += `${beerList[i].type}.${beerList[i].name},${tensor[i] *
        tensor[i] *
        tensor[i] *
        tensor[i] *
        tensor[i] *
        tensor[i] *
        tensor[i]}\n`
    }

    res.send(out)
    //res.json(tensor)
  } catch (err) {
    next(err)
  }
})
