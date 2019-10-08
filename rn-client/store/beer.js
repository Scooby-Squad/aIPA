import axios from 'axios'
import all from './beerDb'

/**
 * ACTION TYPES
 **/
const GOT_RANKED_BEERS = 'GOT_RANKED_BEERS'


/**
 * INITIAL STATE
 **/
const initialState = {
  all,
  ranked: []
}

/**
 * ACTION CREATORS
 **/
const gotRankedBeers = beers => ({type: GOT_RANKED_BEERS, beers})

/**
 * THUNK CREATORS
 **/
export const getRankedBeers = () => {
  return async (dispatch) => {
    try {
        let beers = []
        let { data } = await axios.get('http://localhost:8080/api/userbeers')
        for (let i = 0; i < data.length; ++i) {
            let userBeer = data[i]
            let beer = all[userBeer.beerId]
            beer.rating = userBeer.rating
            beers.push(beer)
        }
      dispatch(gotRankedBeers(beers))
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 **/
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_RANKED_BEERS:
      return {...state, ranked: action.beers}
    default:
      return state
  }
}