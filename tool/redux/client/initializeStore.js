import { combineReducers, createStore } from 'redux';

const createReducer = (asyncReducers) => combineReducers({ ...asyncReducers });

const initializeStore = () => {
  const store = createStore(
    createReducer(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;

    store.replaceReducer(createReducer(store.asyncReducers));
  };
  return store;
};

const store = initializeStore();

export const injectReducer = (key, reducer) => {
  if (!store.asyncReducers[key]) {
    store.injectReducer(key, reducer);
  }
};

export default store;
