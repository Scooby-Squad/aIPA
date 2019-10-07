import axios from "axios";

/**
 * ACTION TYPES
 **/
const GOT_RANKED_BEERS = "GOT_RANKED_BEERS";

/**
 * INITIAL STATE
 **/
const initialState = {
  ranked: []
};

/**
 * ACTION CREATORS
 **/
const gotRankedBeers = beers => ({ type: GOT_RANKED_BEERS, beers });

/**
 * THUNK CREATORS
 **/
export const getRankedBeers = () => {
  return async dispatch => {
    try {
      // restructure so you don't have this for loop here. Not necessary. feels like an include would solve this
      let beers = [];
      let { data } = await axios.get("/api/userbeers");
      for (let i = 0; i < data.length; ++i) {
        let userBeer = data[i];
        let beer = await axios.get(`/api/beers/${userBeer.beerId}`);
        beer = beer.data;
        beers.push({ beer, userBeer });
      }
      dispatch(gotRankedBeers(beers));
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * REDUCER
 **/
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_RANKED_BEERS:
      return { ...state, ranked: action.beers };
    default:
      return state;
  }
}
