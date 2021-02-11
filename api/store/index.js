const {createStore, combineReducers} = require('redux');
const {toDo} = require('./todo')
const {theme} = require('./theme')

const combinedReducers = combineReducers({ toDo, theme });
const store = createStore(combinedReducers);

const {dispatch} = store
const state = store.getState();

module.exports = {dispatch, state}
