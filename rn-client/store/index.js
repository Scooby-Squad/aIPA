import {createStore, combineReducers, applyMiddleware} from 'redux'
//import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {persistStore, persistReducer} from 'redux-persist'
import { AsyncStorage } from 'react-native';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import beer from './beer'
import user from './user'

const reducer = combineReducers({beer, user})
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  stateReconciler: autoMergeLevel2
}
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
)
const pReducer = persistReducer(persistConfig, reducer)
const store = createStore(pReducer, middleware)
export const persistor = persistStore(store)


export default store
export * from './beer'
