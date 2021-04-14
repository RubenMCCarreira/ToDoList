import generate from 'tool/redux/client';
import { GET, PUT } from 'tool/fetch';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const stateThemeKey = 'theme';

const { reducer, actions: ThemeActions } = generate(stateThemeKey);

export const resetAction = (dispatch) => {
  return ThemeActions.RESET(dispatch);
};

export const getItemAction = async (dispatch, id) => {
  try {
    ThemeActions.LOADING(dispatch);

    const payload = await GET(`${apiUrl}/theme`);

    ThemeActions.ITEM(dispatch, payload);
  } catch (error) {
    ThemeActions.ERROR(dispatch, error.message);
  }
};

export const saveItemAction = async (dispatch, data) => {
  try {
    ThemeActions.LOADING(dispatch);

    const payload = await PUT(`${apiUrl}/theme/`, data);

    ThemeActions.SAVE(dispatch, payload.id || payload.updated);
  } catch (error) {
    ThemeActions.ERROR(dispatch, error.message);
  }
};

export const themeMapDispatchToProps = (dispatch) => ({
  reset: () => resetAction(dispatch),
  getItem: (id) => getItemAction(dispatch, id),
  saveItem: (data) => saveItemAction(dispatch, data)
});

export const themeMapStateToProps = (state) => state[stateThemeKey];

export default reducer;
