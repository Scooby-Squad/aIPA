// import * as beerQuizJSON from '../../webserver/server/tensor.js/beer'
import beerDb from './beerDb'

// putting this here directly, but ideally arent storing in both tensor.js in webserver and here
// cant import easily
const beerQuizJSON = [
  {
    beerId: 408,
    id: 'Budweiser',
    abv: 5,
    geo: 1,
    type: 7,
    score: 1
  },
  {
    beerId: 885,
    id: 'Guinness',
    abv: 4.2,
    geo: 6,
    type: 10,
    score: 5
  },
  {
    beerId: 534,
    id: 'Coors Light',
    abv: 4.2,
    geo: 1,
    type: 7,
    score: 1
  },
  {
    beerId: 847,
    id: 'Goose Island IPA',
    abv: 5.9,
    geo: 1,
    type: 5,
    score: 4
  },
  {
    beerId: 335,
    id: 'Blue Moon',
    abv: 5.4,
    geo: 1,
    type: 5,
    score: 1
  },
  {
    beerId: 2407,
    id: 'Yuengling',
    abv: 4.4,
    geo: 1,
    type: 7,
    score: 1
  },
  {
    beerId: 2078,
    id: 'Stella Artois',
    abv: 5.2,
    geo: 5,
    type: 7,
    score: 3
  },
  {
    beerId: 1970,
    id: 'Shiner Blonde',
    abv: 4.4,
    geo: 1,
    type: 2,
    score: 5
  },
  {
    beerId: 1996,
    id: 'Skinny Dip',
    abv: 4.2,
    geo: 1,
    type: 2,
    score: 4
  },
  {
    beerId: 2418,
    id: 'Brooklyn Lager',
    abv: 5.2,
    geo: 1,
    type: 1,
    score: 4
  },
  {
    beerId: 2419,
    id: 'Lagunitas IPA',
    abv: 6.2,
    geo: 1,
    type: 5,
    score: 4
  },
  {
    beerId: 536,
    id: 'Corona',
    abv: 4.5,
    geo: 1,
    type: 7,
    score: 4
  },
  {
    beerId: 1984,
    id: 'Sierra Nevada Pale Ale',
    abv: 5.6,
    geo: 1,
    type: 5,
    score: 4
  },
  {
    beerId: 786,
    id: 'Founders Stout',
    abv: 8.3,
    geo: 1,
    type: 10,
    score: 5
  },
  {
    beerId: 300,
    id: 'Ballest Point Porter',
    abv: 6,
    geo: 1,
    type: 8,
    score: 1
  },
  {
    beerId: 1444,
    id: 'Newcastle',
    abv: 4.7,
    geo: 4,
    type: 3,
    score: 2
  },
  {
    beerId: 2009,
    id: 'Smithwicks',
    abv: 4.5,
    geo: 6,
    type: 6,
    score: 1
  },
  {
    beerId: 9,
    id: 'Magic Hat HIPA',
    abv: 6.8,
    geo: 1,
    type: 5,
    score: 5
  },
  {
    beerId: 698,
    id: 'Great Lakes Edmund Fitzgerald Porter',
    abv: 6,
    geo: 1,
    type: 8,
    score: 1
  },
  {
    beerId: 91,
    id: 'Allagash White',
    abv: 5,
    geo: 1,
    type: 4,
    score: 5
  },
  {
    beerId: 1259,
    id: 'Left Hand Milk Stout',
    abv: 6,
    geo: 1,
    type: 10,
    score: 5
  }
]


const beerQuizData = beerQuizJSON.map(beer => {
  return beerDb[beer.beerId]
})

export default beerQuizData
