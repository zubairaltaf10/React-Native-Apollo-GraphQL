import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';
const rootReducer = (state, action) => {
  return combineReducers(reducers)(state, action);
};
export const STORE = createStore(rootReducer, applyMiddleware(thunkMiddleware));
