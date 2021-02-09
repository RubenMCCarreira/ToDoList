import { createStore } from 'redux';
import { combineReducers } from 'redux';
import toDo from './toDo';

const combinedReducers = combineReducers({ toDo });

const store = createStore(
  combinedReducers,
  typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

export default store;
