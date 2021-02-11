const {createStore} = require('redux');

const initialState = {
  myToDoList: [],
}

const actions = {
  ADD: 'ADD',
  EDIT: 'EDIT',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default: return state;

    case actions.ADD:{
      const nextToDoList = Object.assign([], state.myToDoList);
      nextToDoList.push(action.payload)
      return Object.assign(state, {myToDoList: nextToDoList})
    }
    
    case actions.EDIT:
      const nextToDoList = Object.assign([], state.myToDoList);
      nextToDoList.splice(action.payload.index, 1, action.payload.toDo)
      return Object.assign(state, {myToDoList: nextToDoList})
  }
};


const store = createStore(reducer);
const { dispatch } = store;
const state = store.getState()

module.exports = {actions, dispatch, state}