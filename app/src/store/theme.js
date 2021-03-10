const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const Actions = ['LOADING', 'RESET', 'ITEM', 'SAVE', 'ERROR'];

const ThemeActions = Actions.reduce((acc, current) => {
  return { ...acc, [current]: 'THEME_' + current };
}, {});

export const initialState = {
  loading: null,
  item: null,
  saved: null,
  error: null
};

const reducer = (draft = initialState, action) => {
  switch (action.type) {
    default:
      return draft;

    case ThemeActions.RESET:
      return initialState;

    case ThemeActions.LOADING:
      return {
        ...draft,
        loading: true
      };

    case ThemeActions.ERROR:
      return {
        ...draft,
        loading: false,
        error: action.payload
      };

    case ThemeActions.ITEM:
      return {
        ...draft,
        loading: null,
        item: action.payload
      };

    case ThemeActions.SAVE:
      return {
        ...draft,
        loading: null,
        item: null,
        list: null,
        saved: !!action.payload
      };
  }
};

export const resetAction = (dispatch) => {
  return dispatch({ type: ThemeActions.RESET });
};

export const getItemAction = async (dispatch, id) => {
  dispatch({ type: ThemeActions.LOADING });

  let payload = await fetch(`${apiUrl}/theme/`, {
    method: 'GET',
    headers: {}
  });
  payload = await payload.json();

  dispatch({ type: ThemeActions.ITEM, payload });
};

export const saveItemAction = async (dispatch, data) => {
  dispatch({ type: ThemeActions.LOADING });

  let payload = await fetch(`${apiUrl}/theme/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  payload = await payload.json();
  payload = payload.id || payload.updated;

  dispatch({ type: ThemeActions.SAVE, payload });
};

export const themeMapDispatchToProps = (dispatch) => ({
  reset: () => resetAction(dispatch),
  getItem: (id) => getItemAction(dispatch, id),
  saveItem: (data) => saveItemAction(dispatch, data)
});

export const themeMapStateToProps = ({ theme }) => theme;

export default reducer;
