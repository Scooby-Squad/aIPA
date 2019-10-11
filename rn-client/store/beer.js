/* eslint-disable complexity */
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
const SEARCH_RANKED = 'SEARCH_RANKED'
const SEARCH_BLANK = 'SEARCH_BLANK'

/**
 * INITIAL STATE
 **/
const initialState = {
  all,
  ranked: [],
  rankSearch: [],
  predictions: []
};

/**
 * ACTION CREATORS
 **/
const gotRankedBeers = beers => ({ type: GOT_RANKED_BEERS, beers });
const updatedRankedBeer = beer => ({ type: UPDATED_RANKED_BEER, beer });
const gotPredictions = predictions => ({ type: GOT_PREDICTIONS, predictions});
// export const getPredictionsState = () => ({ type: GET_PREDICTIONS_STATE})
export const searchRanked = (query, beerType, list) => ({type: SEARCH_RANKED, query, beerType, list})
export const blankSearch = () => ({type: SEARCH_BLANK})


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

const sorter = (a, b) =>
    (a.prediction < b.prediction
      ? 1
      : a.prediction === b.prediction ? (a.name > b.name ? 1 : -1) : -1)

/**
 * REDUCER
 **/
export default function(state = initialState, action) {
  let newBeers, newPredictions;
  switch (action.type) {
    case SEARCH_BLANK:
      return {...state, rankSearch: []}
    case SEARCH_RANKED:
        if (action.query == '') {
          if (action.beerType == 0) {
            return {...state, rankSearch: state[action.list]}
          }
          state.rankSearch = state[action.list].filter(beer => {
            return beer.typeId == action.beerType;
          });
        } else if (action.beerType == 100 || action.beerType == 0) {
          state.rankSearch = state[action.list].filter(beer => {
            return beer.name.startsWith(action.query);
          });
        } else {
          state.rankSearch = state[action.list].filter(beer => {
            return (
              beer.name.startsWith(action.query) && beer.typeId == action.beerType
            );
          });
        }
        return state;
    case GOT_RANKED_BEERS:
      return { ...state, ranked: action.beers };
    case UPDATED_RANKED_BEER:
      // for (let i = 0; i < state.ranked.length; ++i) {
      //   let rk = state.ranked[i];
      //   if (rk.id === action.beer.id) {
      //     state.ranked[i] = action.beer;
      //   }
      // }
      // return { ...state, ranked: state.ranked };
      newBeers = state.ranked.map(beer => {
        if (beer.id === action.beer.id) {
          return action.beer
        } else {
          return {...beer}
        }
      })
      console.log('action beer id',action.beer.id)
      newPredictions = state.predictions.filter(beer => beer.id != action.beer.id)
      console.log('newpreds', newPredictions)
      return { ...state, ranked: newBeers, predictions: newPredictions};
    case GOT_PREDICTIONS:
      // want to filter out already done beers
      // have different colors for recommendations, or a label
      // ranked beers should disappear if done from the predictions view
      newPredictions = state.all
      .filter((beer) => !(state.ranked.some((userBeer) => userBeer.id == beer.id)))
      .sort(sorter)
      .filter((beer, index) => index <= 100)
      .map((beer, index) => {
        return {...beer, prediction: Math.round(action.predictions[index])}
      })
      return {...state, predictions: newPredictions}
    default:
      return state;
  }
}
