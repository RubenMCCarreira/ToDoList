const { createStore, combineReducers } = require('redux');
const { toDo } = require('./todo');
const { theme } = require('./theme');
const { login } = require('./login');
const { chat } = require('./chat');
const { room } = require('./room');
const { mapRoute } = require('./map-route');

const combinedReducers = combineReducers({ toDo, theme, login, chat, room, mapRoute });
const store = createStore(combinedReducers);

const { dispatch } = store;
const state = store.getState();

module.exports = { dispatch, state };
