const { createStore, combineReducers } = require('redux');
const { toDo } = require('./todo');
const { theme } = require('./theme');
const { login } = require('./login');

const combinedReducers = combineReducers({ toDo, theme, login });
const store = createStore(combinedReducers);

const { dispatch } = store;
const state = store.getState();

module.exports = { dispatch, state };
