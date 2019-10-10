import all from './beerDb';

/**
 * ACTION TYPES
 **/
const BLANK = 'BLANK';
const SEARCH = 'SEARCH';

/**
 * INITIAL STATE
 **/
const initialState = [];

/**
 * ACTION CREATORS
 **/
const search = (query, beerType) => ({ type: SEARCH, query, beerType });
const blank = () => ({ type: BLANK });
export const actions = { blank, search };

/**
 * REDUCER
 **/
export default function(state = initialState, action) {
  switch (action.type) {
    case BLANK:
      return initialState;
    case SEARCH:
      if (action.query == '') {
        if (action.beerType == 0) {
          return all.slice(1);
        }
        state = all.filter(beer => {
          return beer.typeId == action.beerType;
        });
      } else if (action.beerType == 100 || action.beerType == 0) {
        state = all.filter(beer => {
          return beer.name.startsWith(action.query);
        });
      } else {
        state = all.filter(beer => {
          return (
            beer.name.startsWith(action.query) && beer.typeId == action.beerType
          );
        });
      }
      return state;
    default:
      return state;
  }
}
