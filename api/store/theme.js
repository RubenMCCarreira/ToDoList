const initialState = {
  color: 'green' ,
}

const actions = {
  EDIT: 'THEME_EDIT',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default: return state;
    
    case actions.EDIT:
      return Object.assign(state, action.payload)
  }
};


module.exports = {themeActions: actions, theme: reducer}