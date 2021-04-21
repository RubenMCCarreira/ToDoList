import generate from 'tool/redux/client';
import { GET, PUT, POST, DELETE } from 'tool/fetch';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const stateMapRouteKey = 'map-route';

const { reducer, actions: MapRouteActions } = generate(stateMapRouteKey);

export const resetAction = (dispatch) => {
  return MapRouteActions.RESET(dispatch);
};

export const getListAction = async (dispatch) => {
  try {
    MapRouteActions.LOADING(dispatch);

    const payload = await GET(`${apiUrl}/map-routes/`);

    MapRouteActions.LIST(dispatch, payload);
  } catch (error) {
    MapRouteActions.ERROR(dispatch, error.message);
  }
};

export const getItemAction = async (dispatch, id) => {
  try {
    MapRouteActions.LOADING(dispatch);

    const payload = await GET(`${apiUrl}/map-routes/${id}`);

    MapRouteActions.ITEM(dispatch, payload);
  } catch (error) {
    MapRouteActions.ERROR(dispatch, error.message);
  }
};

export const saveItemAction = async (dispatch, data) => {
  try {
    MapRouteActions.LOADING(dispatch);

    let payload;
    if (data.id) {
      payload = await PUT(`${apiUrl}/map-routes/`, data);
    } else {
      payload = await POST(`${apiUrl}/map-routes/`, data);
    }

    MapRouteActions.SAVE(dispatch, payload.id || payload.updated);
  } catch (error) {
    MapRouteActions.ERROR(dispatch, error.message);
  }
};

export const deleteItemAction = async (dispatch, id) => {
  try {
    MapRouteActions.LOADING(dispatch);

    const payload = await DELETE(`${apiUrl}/map-routes/${id}`);

    MapRouteActions.DELETE(dispatch, payload);
  } catch (error) {
    MapRouteActions.ERROR(dispatch, error.message);
  }
};

export const getOthersAction = async (dispatch) => {
  try {
    MapRouteActions.LOADING(dispatch);

    const payload = await GET(`${apiUrl}/map-routes/data`);

    MapRouteActions.OTHER(dispatch, { other: payload });
  } catch (error) {
    MapRouteActions.ERROR(dispatch, error.message);
  }
};

export const mapRouteMapDispatchToProps = (dispatch) => ({
  reset: () => resetAction(dispatch),
  getList: () => getListAction(dispatch),
  getItem: (id) => getItemAction(dispatch, id),
  saveItem: (data) => saveItemAction(dispatch, data),
  deleteItem: (id) => deleteItemAction(dispatch, id),
  getOther: () => getOthersAction(dispatch)
});

export const mapRouteMapStateToProps = (state) => state[stateMapRouteKey];

export default reducer;
