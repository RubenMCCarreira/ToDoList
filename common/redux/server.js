const DEFAULT_ACTIONS = ['RESET', 'ERROR', 'LIST', 'ITEM', 'ADD', 'EDIT', 'DELETE'];

const generateActions = (prefix) => {
  const types = DEFAULT_ACTIONS.reduce((acc, current) => {
    return { ...acc, [current]: `${prefix.toUpperCase()}_` + current };
  }, {});

  return [
    types,
    {
      RESET: (dispatch) => dispatch({ type: types.RESET }),
      ERROR: (dispatch, payload) => dispatch({ type: types.ERROR, payload }),
      LIST: (dispatch, payload) => dispatch({ type: types.LIST, payload }),
      ITEM: (dispatch, payload) => dispatch({ type: types.ITEM, payload }),
      ADD: (dispatch, payload) => dispatch({ type: types.ADD, payload }),
      EDIT: (dispatch, payload) => dispatch({ type: types.EDIT, payload }),
      DELETE: (dispatch, payload) => dispatch({ type: types.DELETE, payload }),
    },
  ];
};

const DEFAULT_STATE = {
  error: null,
  list: [],
  item: null,
};

const generateReducer = (actionTypes, moreState = {}) => (
  draft = { ...DEFAULT_STATE, ...moreState },
  action
) => {
  switch (action.type) {
    default:
      return draft;

    case actionTypes.RESET:
      return DEFAULT_STATE;

    case actionTypes.ERROR:
      return {
        ...draft,
        error: action.payload,
      };

    case actionTypes.LIST:
      return Object.assign(draft, { list: action.payload });

    case actionTypes.ITEM:
      return Object.assign(draft, { item: action.payload });

    case actionTypes.ADD: {
      const nextList = Object.assign([], draft.list);
      nextList.push(action.payload);
      return Object.assign(draft, { list: nextList });
    }

    case actionTypes.EDIT: {
      const nextList = Object.assign([], draft.list);
      nextList.splice(action.payload.index, 1, action.payload.item);
      return Object.assign(draft, { list: nextList });
    }

    case actionTypes.DELETE:
      return {
        ...draft,
        item: null,
        deleted: action.payload,
      };
  }
};

const generate = (prefix, moreState) => {
  const [types, actions] = generateActions(prefix);
  const reducer = generateReducer(types, moreState);

  return { reducer, actions };
};

module.exports = generate;
