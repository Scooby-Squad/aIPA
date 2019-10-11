/* eslint-disable complexity */
import axios from 'axios';
import all from './beerDb';
import getEnvVars from '../environment';
import { runInNewContext } from 'vm';
const { apiUrl } = getEnvVars();

/**
 * ACTION TYPES
 **/
const GOT_RANKED_BEERS = 'GOT_RANKED_BEERS';
const UPDATED_RANKED_BEER = 'UPDATED_RANKED_BEER';
const GOT_PREDICTIONS = 'GOT_PREDICTIONS';
const SEARCH_RANKED = 'SEARCH_RANKED'
const SEARCH_BLANK = 'SEARCH_BLANK'
const GOT_WISHLIST = 'GOT_WISHLIST'
const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST'

/**
 * INITIAL STATE
 **/
const initialState = {
  all,
  ranked: [],
  rankSearch: [],
  predictions: [],
  wishlist: []
};

/**
 * ACTION CREATORS
 **/
const gotRankedBeers = beers => ({ type: GOT_RANKED_BEERS, beers });
const updatedRankedBeer = beer => ({ type: UPDATED_RANKED_BEER, beer });
const gotPredictions = predictions => ({ type: GOT_PREDICTIONS, predictions});
export const searchRanked = (query, beerType) => ({type: SEARCH_RANKED, query, beerType})
export const blankSearch = () => ({type: SEARCH_BLANK})
const gotWishlist = (wishlist) => ({type: GOT_WISHLIST, wishlist})
const addToWishlist = (beer) => ({type: ADD_TO_WISHLIST, beer})
const removeFromWishlist = (beer) => ({type: REMOVE_FROM_WISHLIST, beer})


/**
 * THUNK CREATORS
 **/
export const getRankedBeers = () => {
  return async dispatch => {
    try {
      let beers = [];
      let { data } = await axios.get(`${apiUrl}/api/userbeers`);
      for (let i = 0; i < data.length; ++i) {
        let userBeer = data[i];
        let beer = all[userBeer.beerId];
        beer.rating = userBeer.rating;
        beer.userId = userBeer.userId;
        beers.push(beer);
      }
      dispatch(gotRankedBeers(beers));
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateUserBeer = ub => {
  return async dispatch => {
    try {
      const rating = ub.rating;
      const userId = ub.userId;
      const beerId = ub.id;
      await axios.put(`${apiUrl}/api/userbeers/update`, {
        rating,
        userId,
        beerId
      });
      dispatch(updatedRankedBeer(ub));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getPredictions = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${apiUrl}/api/predictions`)
      dispatch(gotPredictions(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getWishlist = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`${apiUrl}/api/wishlist`)
      dispatch(gotWishlist(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToWishlistThunk = (beer) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`${apiUrl}/userbeers/update`, beer)
      dispatch(addToWishlist(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeFromWishlistThunk = (beer) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${apiUrl}/api/wishlist`, beer)
      dispatch(removeFromWishlist(beer))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 **/
export default function(state = initialState, action) {
  let newBeers;
  switch (action.type) {
    case SEARCH_BLANK:
      return {...state, rankSearch: []}
    case SEARCH_RANKED:
        if (action.query == '') {
          if (action.beerType == 0) {
            return {...state, rankSearch: state.ranked}
          }
          state.rankSearch = state.ranked.filter(beer => {
            return beer.typeId == action.beerType;
          });
        } else if (action.beerType == 100 || action.beerType == 0) {
          state.rankSearch = state.ranked.filter(beer => {
            return beer.name.startsWith(action.query);
          });
        } else {
          state.rankSearch = state.ranked.filter(beer => {
            return (
              beer.name.startsWith(action.query) && beer.typeId == action.beerType
            );
          });
        }
        return state;
    case GOT_RANKED_BEERS:
      return { ...state, ranked: action.beers };
    case UPDATED_RANKED_BEER:
      for (let i = 0; i < state.ranked.length; ++i) {
        let rk = state.ranked[i];
        if (rk.id === action.beer.id) {
          state.ranked[i] = action.beer;
        }
      }
      return { ...state, ranked: state.ranked };
    case GOT_PREDICTIONS:
      newBeers = state.all
      .filter((beer, index) => index <= 21)
      .map((beer, index) => {
        return {...beer, prediction: Math.round(action.predictions[index])}
      })
      console.log(newBeers[1])
      return {...state, predictions: newBeers}
    case GOT_WISHLIST:
      return {...state, wishlist: data}
    case ADD_TO_WISHLIST:
      return {...state, wishlist: [...wishlist, actoin.beer]}
    case REMOVE_FROM_WISHLIST:
      const newWishlist = state.wishlist.filter(beer => {
        if (beer.id !== action.beer.id) return beer
      })
      return {...state, wishlist: newWishlists}
    default:
      return state;
  }
}
