import { createStore, combineReducers } from 'redux';
import toDo from './toDo';
import theme from './theme';

const combinedReducers = combineReducers({ toDo, theme });

const store = createStore(
  combinedReducers,
  typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

export default store;
