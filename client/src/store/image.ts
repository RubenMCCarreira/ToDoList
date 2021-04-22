import generate from 'tool/redux/client';
import { GET, PUT, POST, DELETE } from 'tool/fetch';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const stateImageKey = 'image';

const { reducer, actions: imageActions } = generate(stateImageKey);

export const resetAction = (dispatch) => {
  return imageActions.RESET(dispatch);
};

export const getListAction = async (dispatch) => {
  try {
    imageActions.LOADING(dispatch);

    const payload = await GET(`${apiUrl}/images/`);

    imageActions.LIST(dispatch, payload);
  } catch (error) {
    imageActions.ERROR(dispatch, error.message);
  }
};

export const getItemAction = async (dispatch, id) => {
  try {
    imageActions.LOADING(dispatch);

    const payload = await GET(`${apiUrl}/images/${id}`);

    imageActions.ITEM(dispatch, payload);
  } catch (error) {
    imageActions.ERROR(dispatch, error.message);
  }
};

export const saveItemAction = async (dispatch, data) => {
  try {
    imageActions.LOADING(dispatch);

    let payload;
    if (data.id) {
      payload = await PUT(`${apiUrl}/images/`, data);
    } else {
      payload = await POST(`${apiUrl}/images/`, data);
    }

    imageActions.SAVE(dispatch, payload.id || payload.updated);
  } catch (error) {
    imageActions.ERROR(dispatch, error.message);
  }
};

export const deleteItemAction = async (dispatch, id) => {
  try {
    imageActions.LOADING(dispatch);

    const payload = await DELETE(`${apiUrl}/images/${id}`);

    imageActions.DELETE(dispatch, payload);
  } catch (error) {
    imageActions.ERROR(dispatch, error.message);
  }
};

export const getOthersAction = async (dispatch) => {
  try {
    imageActions.LOADING(dispatch);

    const payload = await GET(`${apiUrl}/images/data`);

    imageActions.OTHER(dispatch, { other: payload });
  } catch (error) {
    imageActions.ERROR(dispatch, error.message);
  }
};

export const imageMapDispatchToProps = (dispatch) => ({
  reset: () => resetAction(dispatch),
  getList: () => getListAction(dispatch),
  getItem: (id) => getItemAction(dispatch, id),
  saveItem: (data) => saveItemAction(dispatch, data),
  deleteItem: (id) => deleteItemAction(dispatch, id),
  getOther: () => getOthersAction(dispatch)
});

export const imageMapStateToProps = (state) => state[stateImageKey];

export default reducer;
