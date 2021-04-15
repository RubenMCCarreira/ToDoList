import generate from 'tool/redux/client';
import { GET, PUT, POST, DELETE } from 'tool/fetch';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const stateRoomKey = 'room';

const { reducer, actions: RoomActions } = generate(stateRoomKey);

export const resetAction = (dispatch) => {
  return RoomActions.RESET(dispatch);
};

export const getListAction = async (dispatch) => {
  try {
    RoomActions.LOADING(dispatch);

    const payload = await GET(`${apiUrl}/room`);

    RoomActions.LIST(dispatch, payload);
  } catch (error) {
    RoomActions.ERROR(dispatch, error.message);
  }
};

export const getItemAction = async (dispatch, id) => {
  try {
    RoomActions.LOADING(dispatch);

    const payload = await GET(`${apiUrl}/room/${id}`);

    RoomActions.ITEM(dispatch, payload);
  } catch (error) {
    RoomActions.ERROR(dispatch, error.message);
  }
};

export const saveItemAction = async (dispatch, data) => {
  try {
    RoomActions.LOADING(dispatch);

    let payload;
    if (data.id) {
      payload = await PUT(`${apiUrl}/room/`, data);
    } else {
      payload = await POST(`${apiUrl}/room/`, data);
    }

    RoomActions.SAVE(dispatch, payload.id || payload.updated);
  } catch (error) {
    RoomActions.ERROR(dispatch, error.message);
  }
};

export const deleteItemAction = async (dispatch, id) => {
  try {
    RoomActions.LOADING(dispatch);

    const payload = await DELETE(`${apiUrl}/room/${id}`);

    RoomActions.DELETE(dispatch, payload);
  } catch (error) {
    RoomActions.ERROR(dispatch, error.message);
  }
};

export const roomMapDispatchToProps = (dispatch) => ({
  reset: () => resetAction(dispatch),
  getList: () => getListAction(dispatch),
  getItem: (id) => getItemAction(dispatch, id),
  saveItem: (data) => saveItemAction(dispatch, data),
  deleteItem: (id) => deleteItemAction(dispatch, id)
});

export const roomMapStateToProps = (state) => state[stateRoomKey];

export default reducer;
