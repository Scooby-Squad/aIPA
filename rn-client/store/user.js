import axios from 'axios'
import * as Google from 'expo-google-app-auth'
import getEnvVars from '../environment'
const {apiUrl, androidClientId, iosClientId} = getEnvVars()

/**
 * ACTION TYPES
 **/
const LOGGED_IN = 'LOGGED_IN'


/**
 * INITIAL STATE
 **/
const initialState = {
  signedIn: false,
  name: '',
  photoUrl: '',
  accessToken: '',
  refreshToken: '',
  persisted: 'Not persisted'
}

/**
 * ACTION CREATORS
 **/
const loggedIn = user => ({type: LOGGED_IN, user})

/**
 * THUNK CREATORS
 **/
const fetchUser = (data) => {
  const uri = `${apiUrl}/auth/google/`
  fetch(uri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
}

export const signIn = () => {
  return async (dispatch) => {
    try {
      const result = await Google.logInAsync({
        // in the rn-client folder, might need to run 'rm -rf node_modules && npm install' and restart expo cli
        androidClientId,
        iosClientId,
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        const user = await fetchUser(result.user)
        const action = {
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          persisted: 'I persisted here'
        }
        dispatch(loggedIn(action))
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
}

/**
 * REDUCER
 **/
export default function(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return {...state, ...action.user}
    default:
      return state
  }
}
