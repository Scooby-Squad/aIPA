import axios from 'axios';
import all from './beerDb';
import getEnvVars from '../environment';
const { apiUrl } = getEnvVars();

/**
 * ACTION TYPES
 **/
const GOT_RANKED_BEERS = 'GOT_RANKED_BEERS';
const UPDATED_RANKED_BEER = 'UPDATED_RANKED_BEER';
const GOT_PREDICTIONS = 'GOT_PREDICTIONS';

/**
 * INITIAL STATE
 **/
const initialState = {
  all,
  ranked: [],
  predictions: []
};

/**
 * ACTION CREATORS
 **/
const gotRankedBeers = beers => ({ type: GOT_RANKED_BEERS, beers });
const updatedRankedBeer = beer => ({ type: UPDATED_RANKED_BEER, beer });
const gotPredictions = predictions => ({ type: GOT_PREDICTIONS, predictions});

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

/**
 * REDUCER
 **/
export default function(state = initialState, action) {
  let newBeers;
  switch (action.type) {
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
    default:
      return state;
  }
}
