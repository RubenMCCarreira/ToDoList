const DEFAULT_ACTIONS = [
  'LOADING',
  'ERROR',
  'LIST',
  'ITEM',
  'SAVE',
  'DELETE',
  'RESET'
];

const generateActions = (prefix) => {
  const types = DEFAULT_ACTIONS.reduce((acc, current) => {
    return { ...acc, [current]: `${prefix.toUpperCase()}_` + current };
  }, {});

  return [
    types,
    {
      LOADING: (dispatch) => dispatch({ type: types.LOADING }),
      ERROR: (dispatch, payload) => dispatch({ type: types.ERROR, payload }),
      LIST: (dispatch, payload) => dispatch({ type: types.LIST, payload }),
      ITEM: (dispatch, payload) => dispatch({ type: types.ITEM, payload }),
      SAVE: (dispatch, payload) => dispatch({ type: types.SAVE, payload }),
      DELETE: (dispatch, payload) => dispatch({ type: types.DELETE, payload }),
      RESET: (dispatch) => dispatch({ type: types.RESET })
    }
  ];
};

const DEFAULT_STATE = {
  loading: null,
  error: null,
  list: null,
  item: null,
  saved: null,
  deleted: null
};

const generateReducer = (actionTypes) => (draft = DEFAULT_STATE, action) => {
  switch (action.type) {
    default:
      return draft;

    case actionTypes.RESET:
      return DEFAULT_STATE;

    case actionTypes.LOADING:
      return {
        ...draft,
        loading: true
      };

    case actionTypes.ERROR:
      return {
        ...draft,
        loading: false,
        error: action.payload
      };

    case actionTypes.LIST:
      return {
        ...draft,
        loading: null,
        list: action.payload
      };

    case actionTypes.ITEM:
      return {
        ...draft,
        loading: null,
        item: action.payload
      };

    case actionTypes.SAVE:
      return {
        ...draft,
        loading: null,
        item: null,
        list: null,
        saved: action.payload
      };

    case actionTypes.DELETE:
      return {
        ...draft,
        loading: null,
        item: null,
        deleted: action.payload
      };
  }
};

const generate = (prefix) => {
  const [types, actions] = generateActions(prefix);
  const reducer = generateReducer(types);

  return { reducer, actions };
};

export default generate;
