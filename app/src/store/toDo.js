import generate from './tool';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const { reducer, actions: ToDoActions } = generate('todo');

export const resetAction = (dispatch) => {
  return ToDoActions.RESET(dispatch);
};

export const getListAction = async (dispatch, all) => {
  try {
    ToDoActions.LOADING(dispatch);

    let payload = await fetch(`${apiUrl}/todo/${all ? 'all/' : ''}`, {
      method: 'GET',
      headers: {}
    });
    payload = await payload.json();

    ToDoActions.LIST(dispatch, payload);
  } catch (error) {
    ToDoActions.ERROR(dispatch, error.message);
  }
};

export const getItemAction = async (dispatch, id) => {
  try {
    ToDoActions.LOADING(dispatch);

    let payload = await fetch(`${apiUrl}/todo/${id}`, {
      method: 'GET',
      headers: {}
    });
    payload = await payload.json();
    payload = payload.data;

    ToDoActions.ITEM(dispatch, payload);
  } catch (error) {
    ToDoActions.ERROR(dispatch, error.message);
  }
};

export const saveItemAction = async (dispatch, data) => {
  try {
    ToDoActions.LOADING(dispatch);

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

    ToDoActions.SAVE(dispatch, payload);
  } catch (error) {
    ToDoActions.ERROR(dispatch, error.message);
  }
};

export const deleteItemAction = async (dispatch, id) => {
  try {
    ToDoActions.LOADING(dispatch);

    await fetch(`${apiUrl}/todo/${id}`, {
      method: 'DELETE',
      headers: {}
    });

    ToDoActions.DELETE(dispatch, true);
  } catch (error) {
    ToDoActions.ERROR(dispatch, error.message);
  }
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
