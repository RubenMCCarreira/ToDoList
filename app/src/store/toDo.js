import generate from 'common/redux/client';
import { GET, PUT, POST, DELETE } from '../fetch';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const { reducer, actions: ToDoActions } = generate('todo');

export const resetAction = (dispatch) => {
  return ToDoActions.RESET(dispatch);
};

export const getListAction = async (dispatch, all, order) => {
  try {
    ToDoActions.LOADING(dispatch);

    let payload;
    if (all) {
      payload = await GET(`${apiUrl}/todo/${all ? 'all/' : ''}`);
    } else {
      payload = await POST(`${apiUrl}/todo/operations`, { order });
    }

    ToDoActions.LIST(dispatch, payload);
  } catch (error) {
    ToDoActions.ERROR(dispatch, error.message);
  }
};

export const getItemAction = async (dispatch, id) => {
  try {
    ToDoActions.LOADING(dispatch);

    const payload = await GET(`${apiUrl}/todo/${id}`);

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
      payload = await PUT(`${apiUrl}/todo/`, data);
    } else {
      payload = await POST(`${apiUrl}/todo/`, data);
    }

    ToDoActions.SAVE(dispatch, payload.id || payload.updated);
  } catch (error) {
    ToDoActions.ERROR(dispatch, error.message);
  }
};

export const deleteItemAction = async (dispatch, id) => {
  try {
    ToDoActions.LOADING(dispatch);

    const payload = await DELETE(`${apiUrl}/todo/${id}`);

    ToDoActions.DELETE(dispatch, payload);
  } catch (error) {
    ToDoActions.ERROR(dispatch, error.message);
  }
};

export const toDoMapDispatchToProps = (dispatch) => ({
  reset: () => resetAction(dispatch),
  getList: (all, order) => getListAction(dispatch, all, order),
  getItem: (id) => getItemAction(dispatch, id),
  saveItem: (data) => saveItemAction(dispatch, data),
  deleteItem: (id) => deleteItemAction(dispatch, id)
});

export const toDoMapStateToProps = ({ toDo }) => toDo;

export default reducer;
