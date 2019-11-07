import axios from 'axios';
import * as Google from 'expo-google-app-auth';
import getEnvVars from '../environment';
import {getRankedBeers} from './beer'
const { apiUrl, androidClientId, iosClientId } = getEnvVars();

/**
 * ACTION TYPES
 **/
const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

/**
 * INITIAL STATE
 **/
const initialState = {
  signedIn: false,
  id: undefined,
  name: '',
  photoUrl: '',
  accessToken: '',
  refreshToken: '',
  JWT: '',
  persisted: 'Not persisted'
};

/**
 * ACTION CREATORS
 **/
const loggedIn = user => ({ type: LOGGED_IN, user });
export const logOut = () => ({ type: LOGGED_OUT });

/**
 * THUNK CREATORS
 **/
const fetchUser = async user => {
  try {
    // console.log(`${apiUrl}/auth/google/`)
    const { data } = await axios.post(`${apiUrl}/auth/google/`, user);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const signIn = () => {
  return async dispatch => {
    try {
      const result = await Google.logInAsync({
        // in the rn-client folder, might need to run 'rm -rf node_modules && npm install' and restart expo cli
        androidClientId,
        iosClientId,
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        // Might need to pull from actual DB user at some point, but have what we need here for now
        const user = await fetchUser(result.user);
        const action = {
          signedIn: true,
          id: user.id,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          JWT: user.token,
          persisted: 'persisted'
        };
        dispatch(loggedIn(action));
        dispatch(getRankedBeers());
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  };
};

/**
 * REDUCER
 **/
export default function(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
        axios.defaults.headers.common['authorization'] = `${action.user.token}`
      return { ...state, ...action.user };
    case LOGGED_OUT:
        axios.defaults.headers.common['authorization'] = null
      return initialState;
    default:
      return state;
  }
}
