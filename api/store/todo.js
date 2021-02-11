const initialState = {
  list: [],
}

const actions = {
  ADD: 'TODO_ADD',
  EDIT: 'TODO_EDIT',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default: return state;

    case actions.ADD:{
      const nextList = Object.assign([], state.list);
      nextList.push(action.payload)
      return Object.assign(state, {list: nextList})
    }
    
    case actions.EDIT:
      const nextList = Object.assign([], state.list);
      nextList.splice(action.payload.index, 1, action.payload.toDo)
      return Object.assign(state, {list: nextList})
  }
};


module.exports = {todoActions: actions, toDo: reducer}