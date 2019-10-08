import axios from 'axios'
import all from './beerDb'


/**
 * ACTION TYPES
 **/
const GOT_RANKED_BEERS = 'GOT_RANKED_BEERS'
const UPDATED_RANKED_BEER = 'UPDATED_RANKED_BEER'


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
const gotRankedBeers = (beers) => ({type: GOT_RANKED_BEERS, beers})
const updatedRankedBeer = (beer) => ({type: UPDATED_RANKED_BEER, beer})

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
            beer.userId = userBeer.userId
            beers.push(beer)
        }
      dispatch(gotRankedBeers(beers))
    } catch (err) {
      console.log(err)
    }
  }
}
export const updateUserBeer = (ub) => {
  return async (dispatch) => {
    try {
        const rating = ub.rating
        const userId = ub.userId
        const beerId = ub.id
        await axios.put('http://localhost:8080/api/userbeers/update', {rating, userId, beerId})
        dispatch(updatedRankedBeer(ub))
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
    case UPDATED_RANKED_BEER:
      for (let i = 0; i < state.ranked.length; ++i){
        let rk = state.ranked[i]
        console.log('BEFORE', state.ranked)
        if (rk.id === action.beer.id) {
          console.log('found match')
          state.ranked[i] = action.beer
        }
      }
      console.log('AFTER', state.ranked)
      return {...state, ranked: state.ranked}
    default:
      return state
  }
}