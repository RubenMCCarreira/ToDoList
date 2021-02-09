const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const Actions = ['LOADING', 'RESET', 'LIST', 'ITEM', 'SAVE', 'DELETE', 'ERROR'];

export const UserActions = Actions.reduce((acc, current) => {
  return { ...acc, [current]: 'TODO_' + current };
}, {});

export const initialState = {
  loading: null,
  list: null,
  item: null,
  saved: null,
  deleted: null,
  error: null
};

const reducer = (draft = initialState, action) => {
  switch (action.type) {
    default:
      return draft;

    case UserActions.RESET:
      return initialState;

    case UserActions.LOADING:
      return {
        ...draft,
        loading: true
      };

    case UserActions.ERROR:
      return {
        ...draft,
        loading: false,
        error: action.payload
      };

    case UserActions.LIST:
      return {
        ...draft,
        loading: null,
        list: action.payload
      };

    case UserActions.ITEM:
      return {
        ...draft,
        loading: null,
        item: action.payload
      };

    case UserActions.SAVE:
      return {
        ...draft,
        loading: null,
        item: null,
        list: null,
        saved: !!action.payload
      };

    case UserActions.DELETE:
      return {
        ...draft,
        loading: null,
        item: null,
        deleted: !!action.payload
      };
  }
};

export const resetAction = (dispatch) => {
  return dispatch({ type: UserActions.RESET });
};

export const getListAction = async (dispatch) => {
  try {
    dispatch({ type: UserActions.LOADING });

    let payload = await fetch(`${apiUrl}/todo/`, {
      method: 'GET',
      headers: {}
    });
    payload = await payload.json();

    dispatch({ type: UserActions.LIST, payload });
  } catch (error) {
    dispatch({ type: UserActions.ERROR, payload: error.message });
  }
};

export const getItemAction = async (dispatch, id) => {
  dispatch({ type: UserActions.LOADING });

  let payload = await fetch(`${apiUrl}/todo/${id}`, {
    method: 'GET',
    headers: {}
  });
  payload = await payload.json();
  payload = payload.data;

  dispatch({ type: UserActions.ITEM, payload });
};

export const saveItemAction = async (dispatch, data) => {
  dispatch({ type: UserActions.LOADING });

  let payload;
  if (data.id) {
    payload = await fetch(`${apiUrl}/todo/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } else {
    payload = await fetch(`${apiUrl}/todo/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
  payload = await payload.json();
  payload = payload.id || payload.updated;

  dispatch({ type: UserActions.SAVE, payload });
};

export const deleteItemAction = async (dispatch, id) => {
  dispatch({ type: UserActions.LOADING });

  await fetch(`${apiUrl}/todo/${id}`, {
    method: 'DELETE',
    headers: {}
  });

  dispatch({ type: UserActions.DELETE, payload: true });
};

export const toDoMapDispatchToProps = (dispatch) => ({
  reset: () => resetAction(dispatch),
  getList: () => getListAction(dispatch),
  getItem: (id) => getItemAction(dispatch, id),
  saveItem: (data) => saveItemAction(dispatch, data),
  deleteItem: (id) => deleteItemAction(dispatch, id)
});

export const toDoMapStateToProps = ({ toDo }) => toDo;

export default reducer;
