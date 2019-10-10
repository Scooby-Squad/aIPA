const router = require('express').Router()
const {User_Beer} = require('../db/models')
module.exports = router

// Get a userbeers for a user
router.get('/sunburst', async (req, res, next) => {
  try {
    const userbeers = await User_Beer.d3Sunburst(1)
    let out = {name: 'flare', children: [
      {name: "Amber", children:[]},
      {name: "Blonde", children:[]},
      {name: "Brown Ale", children:[]},
      {name: "Hefeweizen", children:[]},
      {name: "IPA", children:[]},
      {name: "Irish Red", children:[]},
      {name: "Lager", children:[]},
      {name: "Other", children:[]},
      {name: "Porter", children:[]},
      {name: "Seasonal", children:[]},
      {name: "Stout", children:[]}
    ]}

    for(let i=0; i<userbeers.length; i++) {
      for(let j=0; j<out.children.length; j++) {
        if(out.children[j].name===userbeers[i].beer.type) {
          out.children[j].children.push({name: userbeers[i].beer.name, value: 1})
        }
      }
    }

    res.json(out)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

// Update a userbeer
router.put('/update', async (req, res, next) => {
  try {
    await User_Beer.update(
      {rating: req.body.rating},
      {
        where: {
          userId: req.body.userId,
          beerId: req.body.beerId
        }
      }
    )
    console.error('Updated')
    res.send(200)
  } catch (err) {
    next(err)
  }
})


// {name: "Amber", children:[]},
// {name: "Blonde", children:[]},
// {name: "Brown Ale", children:[]},
// {name: "Hefeweizen", children:[]},
// {name: "IPA", children:[]},
// {name: "Irish Red", children:[]},
// {name: "Lager", children:[]},
// {name: "Other", children:[]},
// {name: "Porter", children:[]},
// {name: "Seasonal", children:[]},
// {name: "Stout", children:[]}