import generate from 'tool/redux/client';
import { GET, POST } from 'tool/fetch';
import { removeLogin, setLogin } from '../tools/cookies';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const stateLoginKey = 'login';

const { reducer, actions: LoginActions } = generate(stateLoginKey);

export const resetAction = (dispatch) => {
  removeLogin();
  return LoginActions.RESET(dispatch);
};

export const getItemAction = async (dispatch, id) => {
  try {
    LoginActions.LOADING(dispatch);

    const payload = await GET(`${apiUrl}/login`);

    LoginActions.ITEM(dispatch, payload);
  } catch (error) {
    LoginActions.ERROR(dispatch, error.message);
  }
};

export const saveItemAction = async (dispatch, data) => {
  try {
    LoginActions.LOADING(dispatch);

    if (!Object.values(data).every((it) => !!it)) {
      throw new Error('Missing params');
    }

    const payload = await POST(`${apiUrl}/login/`, data);

    setLogin(payload);

    LoginActions.SAVE(dispatch, payload);
  } catch (error) {
    LoginActions.ERROR(dispatch, error.message);
  }
};

export const updateItemAction = async (dispatch, data) => {
  try {
    LoginActions.LOADING(dispatch);

    const payload = await POST(`${apiUrl}/login/revalidate`, data);

    if (payload) {
      setLogin(payload);
    } else {
      removeLogin();
    }

    LoginActions.SAVE(dispatch, payload);
  } catch (error) {
    LoginActions.ERROR(dispatch, error.message);
  }
};

export const loginMapDispatchToProps = (dispatch) => ({
  reset: () => resetAction(dispatch),
  getItem: (id) => getItemAction(dispatch, id),
  saveItem: (data) => saveItemAction(dispatch, data),
  updateItem: (data) => updateItemAction(dispatch, data)
});

export const loginMapStateToProps = (state) => state[stateLoginKey];

export default reducer;
