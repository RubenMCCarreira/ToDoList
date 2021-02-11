const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const Actions = ['LOADING', 'RESET', 'LIST', 'ITEM', 'SAVE', 'DELETE', 'ERROR'];

const ToDoActions = Actions.reduce((acc, current) => {
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

    case ToDoActions.RESET:
      return initialState;

    case ToDoActions.LOADING:
      return {
        ...draft,
        loading: true
      };

    case ToDoActions.ERROR:
      return {
        ...draft,
        loading: false,
        error: action.payload
      };

    case ToDoActions.LIST:
      return {
        ...draft,
        loading: null,
        list: action.payload
      };

    case ToDoActions.ITEM:
      return {
        ...draft,
        loading: null,
        item: action.payload
      };

    case ToDoActions.SAVE:
      return {
        ...draft,
        loading: null,
        item: null,
        list: null,
        saved: !!action.payload
      };

    case ToDoActions.DELETE:
      return {
        ...draft,
        loading: null,
        item: null,
        deleted: !!action.payload
      };
  }
};

export const resetAction = (dispatch) => {
  return dispatch({ type: ToDoActions.RESET });
};

export const getListAction = async (dispatch, all) => {
  try {
    dispatch({ type: ToDoActions.LOADING });

    let payload = await fetch(`${apiUrl}/todo/${all ? 'all/' : ''}`, {
      method: 'GET',
      headers: {}
    });
    payload = await payload.json();

    dispatch({ type: ToDoActions.LIST, payload });
  } catch (error) {
    dispatch({ type: ToDoActions.ERROR, payload: error.message });
  }
};

export const getItemAction = async (dispatch, id) => {
  dispatch({ type: ToDoActions.LOADING });

  let payload = await fetch(`${apiUrl}/todo/${id}`, {
    method: 'GET',
    headers: {}
  });
  payload = await payload.json();
  payload = payload.data;

  dispatch({ type: ToDoActions.ITEM, payload });
};

export const saveItemAction = async (dispatch, data) => {
  dispatch({ type: ToDoActions.LOADING });

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

  dispatch({ type: ToDoActions.SAVE, payload });
};

export const deleteItemAction = async (dispatch, id) => {
  dispatch({ type: ToDoActions.LOADING });

  await fetch(`${apiUrl}/todo/${id}`, {
    method: 'DELETE',
    headers: {}
  });

  dispatch({ type: ToDoActions.DELETE, payload: true });
};

export const toDoMapDispatchToProps = (dispatch) => ({
  reset: () => resetAction(dispatch),
  getList: (all) => getListAction(dispatch, all),
  getItem: (id) => getItemAction(dispatch, id),
  saveItem: (data) => saveItemAction(dispatch, data),
  deleteItem: (id) => deleteItemAction(dispatch, id)
});

export const toDoMapStateToProps = ({ toDo }) => toDo;

export default reducer;
